import { useSelector } from "react-redux";
import { selectRepoData } from "../store/selectors";

function RepoMap() {
    const { structure } = useSelector(selectRepoData);
    console.log(structure)
    return (
        <>
            <div className="font-bold">Repo Map</div>
        </>
    );
}

export default RepoMap;
