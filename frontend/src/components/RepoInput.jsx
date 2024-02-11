import { useState } from "react"

function RepoInput() {
    const [repoUrl, setRepoUrl] = useState('')
    const [commitHistory, setCommitHistory] = useState([])
    const [folderStructure, setFolderStructure] =useState([])

    const handleSubmit = (e) => {
        e.preventDefault()
        const fetchRepoData = async() => {
            const response = await fetch(`http://localhost:3000/fetch-repo-structure-and-commits`,{
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({repoUrl})
            })
            const data = await response.json()
            if(response.ok){
                setFolderStructure(data.structure)
                setCommitHistory(data.commits)
            }
        }
        fetchRepoData()
    }

    const renderFolderStructure = (structure) => {
        return structure.map((item, index) => (
            <div key={index}>
                <p>{item.name}</p>
                {item.type === 'dir' && renderFolderStructure(item.structure)}
                {item.type === 'file' && (
                    <a href={item.downloadUrl} target="_blank" rel="noopener noreferrer">
                        Download
                    </a>
                )}
            </div>
        ));
    };

    return (
        <div className="flex flex-col gap-4 h-screen">
            <form onSubmit={handleSubmit} className="flex flex-col gap-4 border border-gray-600 max-w-4xl w-full mx-auto items-center justify-center h-72">
                <div className="flex justify-center gap-4">
                    <label htmlFor="Repo Link" className="p-3">Repo Link:</label>
                    <input 
                        type="text" 
                        placeholder="GitHub repo link"
                        value={repoUrl}
                        onChange={(e) => setRepoUrl(e.target.value)}
                        className="border-gray-400 active:border-gray-700 p-3"
                    />
                </div>
                <button type="submit" className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
                    Visualize
                </button>
            </form>
            <div className="bg-gray-200">
                    {folderStructure.length > 0 ? renderFolderStructure(folderStructure) : <p>No folder structure available</p>}
            </div>
            <div className="bg-gray-200">
                { commitHistory.length > 0 
                    ? commitHistory.map((commit, index) => (
                        <div key={index}>
                            <div>{commit.message}</div>
                            <div>{commit.author}</div>
                            <div>{commit.date}</div>
                        </div>
                    ))
                    : <p>No commit History available</p>
                }
            </div>
</div>

    )
}

export default RepoInput