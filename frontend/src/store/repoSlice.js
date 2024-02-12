import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    structure : [],
    commits : [],
    openIssues : [],
    closedIssues : [],
    openPullRequests : [],
    closedPullRequests : [],
    repoMetrics: {},
    dependencies: {},
}
export const repoSlice = createSlice({
    name: 'repo',
    initialState,
    reducers: {
        setRepoData: (state, action) => {
            return {
                ...state,
                structure: action.payload.structure,
                commits: action.payload.commits,
                openIssues: action.payload.openIssues,
                closedIssues: action.payload.closedIssues,
                openPullRequests: action.payload.openPullRequests,
                closedPullRequests: action.payload.closedPullRequests,
                repoMetrics: action.payload.repoMetrics,
                dependencies: action.payload.dependencies
            };
        }
    }
});


const repoReducer = repoSlice.reducer
export const { setRepoData } = repoSlice.actions;
export default repoReducer