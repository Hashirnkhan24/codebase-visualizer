import { createSelector } from 'reselect';

// Selectors
export const selectRepoState = state => state; 

export const selectRepoData = createSelector(
    selectRepoState,
    state => ({
        structure: state.structure,
        commits: state.commits,
        openIssues: state.openIssues,
        closedIssues: state.closedIssues,
        openPullRequests: state.openPullRequests,
        closedPullRequests: state.closedPullRequests,
        repoMetrics: state.repoMetrics,
        dependencies: state.dependencies
    })
);
