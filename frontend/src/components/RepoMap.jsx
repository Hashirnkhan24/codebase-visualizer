import { useSelector } from "react-redux"

function RepoMap() {
    const { structure, commits, openIssues, closedIssues, openPullRequests, closedPullRequests, repoMetrics, dependencies } = useSelector((state) => ({
        structure: state.structure,
        commits: state.commits,
        openIssues: state.openIssues,
        closedIssues: state.closedIssues,
        openPullRequests: state.openPullRequests,
        closedPullRequests: state.closedPullRequests,
        repoMetrics: state.repoMetrics,
        dependencies: state.dependencies
    }))

    console.log(structure, commits, openIssues, closedIssues, openPullRequests, closedPullRequests, repoMetrics, dependencies)
    return (
        <div>RepoMap</div>
    )
}

export default RepoMap