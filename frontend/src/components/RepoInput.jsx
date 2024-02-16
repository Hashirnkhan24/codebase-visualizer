import { useState } from "react"
import { useDispatch } from "react-redux"
import { setRepoData } from "../store/repoSlice"
import { useNavigate } from "react-router-dom"
import { BsMapFill } from "react-icons/bs"

function RepoInput() {
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const [repoUrl, setRepoUrl] = useState('')
    const currentYear = new Date().getFullYear();

    const handleSubmit = (e) => {
        e.preventDefault();
        const fetchRepoData = async () => {
            try {
                const response = await fetch(`http://localhost:3000/fetch-repo-data`, {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify({ repoUrl })
                });
                const data = await response.json();
                if (response.ok) {
                    dispatch(setRepoData(data));
                    navigate('/repo-map');
                } else {
                    if (response.status === 500) {
                        navigate('/error')
                    } else {
                        navigate('/error')
                    }
                }
            } catch (error) {
                navigate('/error')
            }
        };
        fetchRepoData();
    };
    

    return (
            <div className="flex flex-col h-screen">
            <nav className="p-6 shadow-md w-full max-w-full text-center bg-white  flex flex-col gap-3 justify-center items-center sm:flex-row">
                    <BsMapFill className="w-8 h-8 text-green-600" />
                    <h1 className="font-semibold text-3xl text-black self-center">Repo Map</h1>
            </nav>
            <div className="grid grid-cols-1 md:grid-cols-2 h-screen items-center">
            <form onSubmit={handleSubmit} className="flex flex-col items-center justify-center items gap-4 bg-gradient-to-tr from-green-100 via-white to-green-100 h-screen" >
                    <h2 className="text-3xl font-bold text-center text-gray-800">
                        Explore Your Codebase Like Never Before
                    </h2>
                    <p className="text-lg text-center text-gray-600 md:text-xl">
                        Paste your repo link to instantly explore its code structures and relationships.
                    </p>
                    <div className="flex items-center justify-center gap-2">
                        <label htmlFor="Repo Link" className="p-3 text-lg font-medium">Repo Link:</label>
                        <input 
                            type="text" 
                            placeholder="GitHub repo link"
                            value={repoUrl}
                            onChange={(e) => setRepoUrl(e.target.value)}
                            className="border-gray-400 active:border-gray-700 p-3 border rounded-sm"
                        />
                        <button type="submit" className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-3 px-4 rounded-sm">
                        Visualize
                    </button>
                    </div>
                </form>
                <div className="flex flex-col gap-4 items-center justify-center h-screen bg-gradient-to-tr from-slate-800 via-slate-700 to-slate-800">
                    <div className="flex flex-col gap-4 max-w-2xl mx-auto p-8 md:p-12  lg:p-16">
                        <ul className=" text-lg text-gray-100 gap-2 list-none">
                            <li className="max-w-full border border-slate-200 shadow-md p-3 my-2"><span className="font-medium">Visualize Structure:</span> See your code's organization at a glance. Understand how files and folders are interconnected.</li>
                            <li className="max-w-full border border-slate-200 shadow-md p-3 my-2"><span className="font-medium">Chart Your Commit History:</span> Dive into the evolution of your codebase through commit graphs and statistics.</li>
                            <li className="max-w-full border border-slate-200 shadow-md p-3 my-2"><span className="font-medium">Measure Repo Health:</span> Understand your repo's popularity and engagement by visualizing watchers, forks, and stars.</li>
                            <li className="max-w-full border border-slate-200 shadow-md p-3 my-2"><span className="font-medium">Stay on Top of Issues and Pull Requests:</span> Get visual breakdowns of open and closed issues and pull requests.</li>
                            <li className="max-w-full border border-slate-200 shadow-md p-3 my-2"><span className="font-medium">Uncover Dependencies:</span> Gain insights into your project's external dependencies and development dependencies.</li>
                            <li className="max-w-full border text-black border-slate-200 bg-red-100 shadow-md p-3 my-2"><span className="font-medium">Note:</span> Some repositories cannot be visualized due to access restrictions and rate limiting.</li>
                        </ul>
                    </div>
                </div>
                
            </div>
            <footer className="w-full hidden md:inline p-4 bg-white border border-t border-slate-300">
                <div className="text-md font-medium text-center w-full">Copyright @RepoMap {currentYear}</div>
            </footer>
        </div>
    )
}

export default RepoInput