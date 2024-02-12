import { useSelector } from "react-redux";
import { selectRepoData } from "../store/selectors";
import TreeNode from "./TreeNode"; // Import the TreeNode component

function RepoMap() {
    const { structure } = useSelector(selectRepoData);

    return (
        <div className="font-mono">
            <div className="text-lg text-gray-900 mb-2">Repo Map</div>
            <div className="font-md h-screen flex flex-col justify-start items-start overflow-y-auto p-4 bg-gradient-to-b from-green-100 via-white to-teal-100 text-lg max-w-72 w-full">
                {structure.map((node, index) => (
                    <TreeNode key={index} node={node} />
                ))}
            </div>
        </div>
    );
}

export default RepoMap;
