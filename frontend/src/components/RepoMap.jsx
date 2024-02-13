import { useSelector } from "react-redux";
import { selectRepoData } from "../store/selectors";
import TreeNode from "./TreeNode"; 
import { Line } from "react-chartjs-2"; // Importing Line from react-chartjs-2


function RepoMap() {
    const { structure, repoMetrics, commits } = useSelector(selectRepoData);
    console.log(commits);

    return (
        <div className="font-mono bg-gray-700  ">
            <div className="p-2 shadow-md w-full max-w-full flex items-center justify-center bg-gray-800 mb-2">
                <h1 className="font-semibold text-3xl text-white self-center">Repo Map</h1>
            </div>
            <section className="flex gap-3 w-full max-w-full flex-col md:flex-row ">
                <div className="font-md h-screen flex flex-col justify-start items-start overflow-y-auto p-4 bg-slate-800 text-lg md:max-w-72 w-full">
                <h1 className="font-semibold text-xl text-white mb-2">Folder Structure</h1>
                    {structure.map((node, index) => (
                        <TreeNode key={index} node={node} />
                    ))}
                </div>
                <div className="max-w-full w-full  bg-gray-800">
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-2 mx-2">
                        <div className="bg-slate-700 text-white border border-slate-200 shadow-md p-4 flex gap-2">
                            <h2 className="text-lg">Stars:</h2>
                            {repoMetrics.stars}
                        </div>
                        <div className="bg-slate-700 text-white border border-slate-200 shadow-md p-4 flex gap-2">
                            <h2 className="text-lg">Forks:</h2>
                            {repoMetrics.forks}
                        </div>
                        <div className="bg-slate-700 text-white border border-slate-200 shadow-md p-4 flex gap-2">
                            <h2 className="text-lg">Watchers:</h2>
                            {repoMetrics.watchers}
                        </div>
                    </div>
                    <div className="mt-4">
                        <h2 className="text-lg text-white mb-2">Commit History</h2>
                    </div>
                </div>
            </section>
        </div>
    );
}

export default RepoMap;
