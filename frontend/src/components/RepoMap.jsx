import { useSelector } from "react-redux";
import { selectRepoData } from "../store/selectors";
import TreeNode from "./TreeNode";
import { Timeline } from "flowbite-react";
import { BsEyeFill, BsGit, BsStarFill, BsPinAngleFill, BsMapFill  } from "react-icons/bs";
import KanbanBoard from "./KanbanBoard";
import { useState } from "react";

function RepoMap() {
    const { structure, repoMetrics, commits, closedIssues, openIssues, openPullRequests, closedPullRequests, owner, repoName, dependencies } = useSelector(selectRepoData);
    const [render20, setRender20] = useState(true)
    const currentYear = new Date().getFullYear();

    console.log(openPullRequests, closedPullRequests)
    const formatDateTime = (dateTimeString) => {
        const dateTime = new Date(dateTimeString);
        const formattedDate = dateTime.toLocaleDateString();
        const formattedTime = dateTime.toLocaleTimeString();
        return { formattedDate, formattedTime };
    };

    const handleClick = () => {
        setRender20(!render20)
    }

    return (
        <div className="font-sans bg-gray-100">
            {/* Navbar */}
            <nav className="p-6 shadow-md w-full max-w-full text-center bg-white mb-2 flex flex-col gap-3 justify-center md:justify-between items-center sm:flex-row">
                <div className="flex gap-2 items-center justify-center">
                    <BsMapFill className="w-8 h-8 text-green-600" />
                    <h1 className="font-semibold text-3xl text-black self-center">Repo Map</h1>
                </div>
                <div className="flex gap-4 items-center justify-center">
                    <div className="text-lg sm:inline hidden font-medium">Owner: {owner}</div>
                    <div className="text-lg sm:inline hidden font-medium">Repository: {repoName}</div>
                    <button onClick={handleClick} className="p-3 bg-blue-500 hover:bg-blue-600 rounded-md font-medium text-white">{render20? "Full Repo" : "Hide Repo"}</button>
                </div>
            </nav>
            {/* Repo Metrics */}
            <section className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-2 mx-2 font-semibold">
                    <div className="bg-white text-slate-800 rounded-sm shadow-md p-4 flex items-center justify-center gap-2 ">
                    <BsStarFill className="text-2xl text-yellow-400" />
                            <h2 className="text-2xl">Stars:</h2>
                            <p className="text-2xl">{repoMetrics.stars}</p>
                        </div>
                        <div className="bg-white text-slate-800 rounded-sm shadow-md p-4 flex items-center justify-center gap-2">
                        <BsGit className="text-2xl text-slate-600" />
                            <h2 className="text-2xl">Forks:</h2>
                            <p className="text-2xl">{repoMetrics.forks}</p>
                        </div>
                        <div className="bg-white text-slate-800 rounded-sm shadow-md p-4 flex items-center justify-center gap-2">
                            <BsEyeFill className="text-3xl text-blue-600" />
                            <h2 className="text-2xl">Watchers:</h2>
                            <p className="text-2xl">{repoMetrics.watchers}</p>
                        </div>
            </section>
            
            <section className="flex gap-3 mt-3 md:mt-1 flex-col md:flex-row shadow-md rounded-md">
                {/* Folder Structure */}
                <div className="font-md max-h-full flex flex-col justify-start items-start p-4 bg-white text-lg md:mt-5 md:ml-2 shadow-md md:mx-0 w-full md:max-w-72 mb-2">
                <h1 className="font-semibold text-2xl text-slate-800 mb-3 self-center md:self-start text-center">Folder Structure</h1>
                    {structure.map((node, index) => (
                        <TreeNode key={index} node={node} />
                    ))}
                <section className="p-6 shadow-md w-full max-w-full m-2 text-center bg-white mb-2">
                    <h1 className="text-xl md:text-left font-medium p-2 my-2">Dependencies</h1>
                            <div className="flex flex-wrap justify-between gap-2 my-2">
                            {dependencies.dependencies.length > 0 ? (dependencies.dependencies.map((dependency) => <div key={dependency} className="p-2 bg-indigo-600 flex-grow text-white font-medium text-center text-sm rounded-sm">
                                {dependency}
                                </div> )) 
                                : <div className="text-center w-full font-medium text-lg bg-red-200 p-2 my-2">No Dependencies found</div>
                            }
                            </div>
                            <h1 className="text-xl md:text-left font-medium p-2 my-2">Dev Dependencies</h1>
                            <div className="flex flex-wrap justify-between  gap-2 my-2">
                            {dependencies.devDependencies.length > 0 ? (dependencies.devDependencies.map((dependency) => <div  key={dependency} className="p-2 flex-grow bg-slate-700 text-center text-sm font-medium text-white rounded-sm">
                                {dependency}
                                </div> )) 
                                : <div className="text-center w-full font-medium text-lg bg-red-200 p-2">No Dev Dependencies found</div>
                            }
                            </div>
                    </section>
                    </div>
                        
                <div id="overflow" className="flex flex-col gap-3 max-w-full w-full flex-grow">
                    {/* Open Pull Requests */}
                    {openPullRequests.length > 0 
                    ? <div className="mt-4 bg-white max-w-full text-black border border-slate-200 shadow-md p-4 m-2 overflow-auto">
                    <h2 className="text-2xl text-center self-center text-black font-semibold mb-2">Open Pull Requests</h2>
                    <Timeline horizontal className="mt-2 mx-2 grid grid-cols-2 md:grid-cols-5 gap-2 overflow-auto">
                        {render20 ? (openPullRequests.slice(0, 20).map((pullRequest) => {
                            const { formattedDate, formattedTime } = formatDateTime(pullRequest.createdAt);
                            const updatedDateTime = formatDateTime(pullRequest.updatedAt);
                            return (
                                <Timeline.Item key={pullRequest.id} className="p-2 border border-white bg-green-100 hover:bg-gradient-to-r from-green-50 via-white to-green-50 shadow-md">
                                    <Timeline.Content>
                                        <div className="flex flex-col">
                                            <div className="flex justify-between border-b border-gray-200">
                                                <div>
                                                    <span className="text-md font-medium">{formattedDate}</span>
                                                </div>
                                                <div>
                                                    <span className="text-md font-medium">{formattedTime}</span>
                                                </div>
                                            </div>
                                            <Timeline.Title className="self-center text-center pt-2">
                                                <div className="flex flex-col gap-2 items-center justify-center">
                                                    <h2 className="">{pullRequest.title}</h2>
                                                </div>
                                            </Timeline.Title>
                                            <Timeline.Body className="italic text-center">
                                                <span className="text-sm font-normal">Requested Reviewers: {pullRequest.reviewers.join(', ')}</span>
                                                <br />
                                                <span className="text-sm font-normal">Updated At: {updatedDateTime.formattedDate}
                                                </span>
                                                <br />
                                                <span className="text-sm font-normal">Time: {updatedDateTime.formattedTime} </span>
                                                <br />
                                                {pullRequest.mergedAt && <span className="text-sm font-normal">Merged At: {pullRequest.mergedAt}</span>}
                                            </Timeline.Body>
                                        </div>
                                    </Timeline.Content>
                                </Timeline.Item>
                            );
                        })) 
                        : (openPullRequests.map((pullRequest) => {
                            const { formattedDate, formattedTime } = formatDateTime(pullRequest.createdAt);
                            const updatedDateTime = formatDateTime(pullRequest.updatedAt);
                            return (
                                <Timeline.Item key={pullRequest.id} className="p-2 border border-white bg-green-100 hover:bg-gradient-to-r from-green-50 via-white to-green-50 shadow-md">
                                    <Timeline.Content>
                                        <div className="flex flex-col">
                                            <div className="flex justify-between border-b border-gray-200">
                                                <div>
                                                    <span className="text-md font-medium">{formattedDate}</span>
                                                </div>
                                                <div>
                                                    <span className="text-md font-medium">{formattedTime}</span>
                                                </div>
                                            </div>
                                            <Timeline.Title className="self-center text-center pt-2">
                                                <div className="flex flex-col gap-2 items-center justify-center">
                                                    <h2 className="">{pullRequest.title}</h2>
                                                </div>
                                            </Timeline.Title>
                                            <Timeline.Body className="italic text-center">
                                                <span className="text-sm font-normal">Requested Reviewers: {pullRequest.reviewers.join(', ')}</span>
                                                <br />
                                                <span className="text-sm font-normal">Updated At: {updatedDateTime.formattedDate}
                                                </span>
                                                <br />
                                                <span className="text-sm font-normal">Time: {updatedDateTime.formattedTime} </span>
                                                <br />
                                                {pullRequest.mergedAt && <span className="text-sm font-normal">Merged At: {pullRequest.mergedAt}</span>}
                                            </Timeline.Body>
                                        </div>
                                    </Timeline.Content>
                                </Timeline.Item>
                            );
                        }))}
</Timeline>

                    </div> : null }
                    
                    {/* Closed Pull Requests */}
                    {closedPullRequests.length > 0 
                    ? <div className="mt-4 bg-white max-w-full text-black border border-slate-200 shadow-md p-4 m-2 overflow-auto">
                    <h2 className="text-2xl text-center self-center text-black font-semibold mb-2">Closed Pull Requests</h2>
                    <Timeline horizontal className="mt-2 mx-2 grid grid-cols-2 md:grid-cols-5 gap-2 overflow-auto">
                        {render20? (closedPullRequests.slice(0, 20).map((pullRequest) => {
                            const { formattedDate, formattedTime } = formatDateTime(pullRequest.createdAt);
                            const updatedDateTime = formatDateTime(pullRequest.updatedAt);
                            const mergedDateTime = formatDateTime(pullRequest.mergedAt);
                            return (
                                <Timeline.Item key={pullRequest.id} className="p-2 bg-red-200 border border-white hover:bg-gradient-to-r from-red-50 via-white to-red-50 shadow-md">
                                    <Timeline.Content>
                                        <div className="flex flex-col">
                                            <div className="flex justify-between border-b border-gray-200">
                                                <div>
                                                    <span className="text-md font-medium">{formattedDate}</span>
                                                </div>
                                                <div>
                                                    <span className="text-md font-medium">{formattedTime}</span>
                                                </div>
                                            </div>
                                            <Timeline.Title className="self-center text-center pt-2">
                                                <div className="flex flex-col gap-2 items-center justify-center">
                                                    <h2 className="">{pullRequest.title}</h2>
                                                </div>
                                            </Timeline.Title>
                                            <Timeline.Body className="italic text-center">
                                                <span className="text-sm font-normal">Requested Reviewers: {pullRequest.reviewers.join(', ')}</span>
                                                <br />
                                                <span className="text-sm font-normal">Updated At: {updatedDateTime.formattedDate}
                                                </span>
                                                <br />
                                                <span className="text-sm font-normal">Time: {updatedDateTime.formattedTime} </span>
                                                <br />
                                                {pullRequest.mergedAt && <div>
                                                    <span className="text-sm font-normal">Merged At: {mergedDateTime.formattedDate}
                                                </span>
                                                <br />
                                                <span className="text-sm font-normal">Time: {mergedDateTime.formattedTime} </span>
                                                <br />
                                                </div>}
                                            </Timeline.Body>
                                        </div>
                                    </Timeline.Content>
                                </Timeline.Item>
                            );
                        })) 
                        : (closedPullRequests.map((pullRequest) => {
                            const { formattedDate, formattedTime } = formatDateTime(pullRequest.createdAt);
                            const updatedDateTime = formatDateTime(pullRequest.updatedAt);
                            const mergedDateTime = formatDateTime(pullRequest.mergedAt);
                            return (
                                <Timeline.Item key={pullRequest.id} className="p-2 bg-red-200 border border-white hover:bg-gradient-to-r from-red-50 via-white to-red-50 shadow-md">
                                    <Timeline.Content>
                                        <div className="flex flex-col">
                                            <div className="flex justify-between border-b border-gray-200">
                                                <div>
                                                    <span className="text-md font-medium">{formattedDate}</span>
                                                </div>
                                                <div>
                                                    <span className="text-md font-medium">{formattedTime}</span>
                                                </div>
                                            </div>
                                            <Timeline.Title className="self-center text-center pt-2">
                                                <div className="flex flex-col gap-2 items-center justify-center">
                                                    <h2 className="">{pullRequest.title}</h2>
                                                </div>
                                            </Timeline.Title>
                                            <Timeline.Body className="italic text-center">
                                                <span className="text-sm font-normal">Requested Reviewers: {pullRequest.reviewers.join(', ')}</span>
                                                <br />
                                                <span className="text-sm font-normal">Updated At: {updatedDateTime.formattedDate}
                                                </span>
                                                <br />
                                                <span className="text-sm font-normal">Time: {updatedDateTime.formattedTime} </span>
                                                <br />
                                                {pullRequest.mergedAt && <div>
                                                    <span className="text-sm font-normal">Merged At: {mergedDateTime.formattedDate}
                                                </span>
                                                <br />
                                                <span className="text-sm font-normal">Time: {mergedDateTime.formattedTime} </span>
                                                <br />
                                                </div>}
                                            </Timeline.Body>
                                        </div>
                                    </Timeline.Content>
                                </Timeline.Item>
                            );
                        }))}
</Timeline>

                    </div> : null}
                    
                    <div className="flex flex-col gap-3 md:flex-row flex-grow">
                        {/* Open Issues */}
                        {openIssues.length > 0 
                        ? <div className="max-w-4xl bg-white mt-4 mb-2 shadow-md flex-grow">
                        <h2 className="text-2xl pt-3 text-center self-center text-black font-semibold mb-2">Open Issues</h2>
                        {
                            openIssues ? (<KanbanBoard issues={openIssues} />) : <p className="text-center">No Open Issues yet.</p>
                        }
                        </div> : null}
                        
                        {/* Closed Issues */}
                        {closedIssues.length > 0 
                        ? <div className="max-w-4xl bg-white mt-4 mb-2 shadow-md flex-grow">
                        <h2 className="text-2xl pt-3 text-center self-center text-black font-semibold mb-2">Closed Issues</h2>
                        {
                            closedIssues ? (<KanbanBoard issues={closedIssues} />) : <p className="text-center">No Closed Issues yet</p>
                        }
                        </div> : null}
                        
                        {/* Commit History */}
                        {commits.length > 0 
                        ? <div className="mt-4 bg-white text-black border border-slate-200 shadow-md p-4 m-2 overflow-auto flex-grow">
                        <h2 className="text-2xl text-center self-center text-black font-semibold mb-2">Commit History</h2>
                        <Timeline horizontal className="mt-2 mx-2">
                            {render20 ? (commits.slice(0, 20).map((commit) => {
                                const { formattedDate, formattedTime } = formatDateTime(commit.date)
                                return(
                                <Timeline.Item key={commit.sha} className="p-2 border border-white hover:bg-gradient-to-tr from-green-50 via-white to-green-50 shadow-md">
                                    <Timeline.Content >
                                        <div className="flex flex-col ">
                                            <div className=" flex justify-between border-b border-gray-200">
                                                <div>
                                                    <span className="text-md font-medium">{formattedDate}</span> 
                                                </div>
                                                <div>
                                                    <span className="text-md font-medium">{formattedTime}</span> 
                                                </div>
                                            </div>
                                        <Timeline.Title className="self-center text-center pt-2">
                                            <div className="flex flex-col gap-2 items-center justify-center">
                                                <BsPinAngleFill className="text-red-500 w-6 h-6" />
                                                <h2 className="">Message</h2>
                                            </div>
                                            <span className="text-lg font-normal text-center text-indigo-700">{commit.message}</span>
                                        </Timeline.Title>
                                        <Timeline.Body className="italic text-center">
                                            <span className="text-sm font-normal">{commit.author}</span>
                                        </Timeline.Body>
                                        </div>
                                    </Timeline.Content>
                                </Timeline.Item>
                            )})) : (commits.map((commit) => {
                                const { formattedDate, formattedTime } = formatDateTime(commit.date)
                                return(
                                <Timeline.Item key={commit.sha} className="p-2 border border-white hover:bg-gradient-to-tr from-green-50 via-white to-green-50 shadow-md">
                                    <Timeline.Content >
                                        <div className="flex flex-col ">
                                            <div className=" flex justify-between border-b border-gray-200">
                                                <div>
                                                    <span className="text-md font-medium">{formattedDate}</span> 
                                                </div>
                                                <div>
                                                    <span className="text-md font-medium">{formattedTime}</span> 
                                                </div>
                                            </div>
                                        <Timeline.Title className="self-center text-center pt-2">
                                            <div className="flex flex-col gap-2 items-center justify-center">
                                                <BsPinAngleFill className="text-red-500 w-6 h-6" />
                                                <h2 className="">Message</h2>
                                            </div>
                                            <span className="text-lg font-normal text-center text-indigo-700 text-wrap">{commit.message}</span>
                                        </Timeline.Title>
                                        <Timeline.Body className="italic text-center">
                                            <span className="text-sm font-normal">{commit.author}</span>
                                        </Timeline.Body>
                                        </div>
                                    </Timeline.Content>
                                </Timeline.Item>
                            )}))}
                        </Timeline>
                    </div> : null}
                    </div>
                </div>
            </section>
            <footer className="w-full p-4 bg-white">
                <div className="text-md font-medium text-center w-full">Copyright @RepoMap {currentYear}</div>
            </footer>
        </div>
    );
}

export default RepoMap;
