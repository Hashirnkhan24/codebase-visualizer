import { useState } from "react"
import { useDispatch } from "react-redux"
import { setRepoData } from "../store/repoSlice"
import { useNavigate } from "react-router-dom"

function RepoInput() {
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const [repoUrl, setRepoUrl] = useState('')

    const handleSubmit = (e) => {
        e.preventDefault()
        const fetchRepoData = async() => {
            const response = await fetch(`http://localhost:3000/fetch-repo-data`,{
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({repoUrl})
            })
            const data = await response.json()
            if(response.ok){
                console.log(data)
                dispatch(setRepoData(data))
                navigate('/repo-map')
            }
        }
        fetchRepoData()
    }

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
</div>

    )
}

export default RepoInput