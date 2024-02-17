import express from 'express';
import axios from 'axios';
import { URL } from 'url';
import dotenv from 'dotenv';
import cors from 'cors';
import z from 'zod';
import path from 'path';

const __dirname = path.resolve()
const app = express();
app.use(cors({
    origin: 'http://localhost:5173',
    credentials: true
}));
dotenv.config();
const PORT = process.env.PORT;
app.use(express.json());
const URLSchema = z.string();


async function fetchCommitHistory(owner, repoName, branch) {
    try {
        const response = await axios.get(`https://api.github.com/repos/${owner}/${repoName}/commits?sha=${branch}`, {
            headers: {
                Authorization: `token ${process.env.ACCESS_TOKEN}`
            }
        });
        return response.data.map(commit => ({
            sha: commit.sha,
            message: commit.commit.message,
            author: commit.commit.author.name,
            date: commit.commit.author.date
        }));
    } catch (error) {
        console.error('Error fetching commit history:', error.message);
        throw new Error('Failed to fetch commit history');
    }
}

async function fetchFolderStructure(owner, repoName, branch, path = '') {
    try {
        const response = await axios.get(`https://api.github.com/repos/${owner}/${repoName}/contents/${path}?ref=${branch}`, {
            headers: {
                Authorization: `token ${process.env.ACCESS_TOKEN}`
            }
        });
        const contents = response.data.filter(item => item.type === 'dir' || item.type === 'file');

        const structure = await Promise.all(contents.map(async item => {
            if (item.type === 'dir') {
                const subStructure = await fetchFolderStructure(owner, repoName, branch, `${path}/${item.name}`);
                return {
                    name: item.name,
                    type: item.type,
                    path: item.path,
                    structure: subStructure
                };
            } else {
                return {
                    name: item.name,
                    type: item.type,
                    path: item.path,
                    downloadUrl: item.download_url
                };
            }
        }));

        return structure;
    } catch (error) {
        console.error('Error fetching folder structure:', error.message);
        throw new Error('Failed to fetch folder structure');
    }
}

async function fetchIssues(owner, repoName, state = 'open') {
    try {
        const response = await axios.get(`https://api.github.com/repos/${owner}/${repoName}/issues?state=${state}`, {
            headers: {
                Authorization: `token ${process.env.ACCESS_TOKEN}`
            }
        });
        return response.data.map(issue => ({
            id: issue.id,
            title: issue.title,
            state: issue.state,
            labels: issue.labels.map(label => label.name),
            milestone: issue.milestone ? issue.milestone.title : 'No milestone',
            assignees: issue.assignees.map(assignee => assignee.login)
        }));
    } catch (error) {
        console.error('Error fetching issues:', error.message);
        throw new Error('Failed to fetch issues');
    }
}

async function fetchPullRequests(owner, repoName, state = 'open') {
    try {
        const response = await axios.get(`https://api.github.com/repos/${owner}/${repoName}/pulls?state=${state}`, {
            headers: {
                Authorization: `token ${process.env.ACCESS_TOKEN}`
            }
        });
        return response.data.map(pr => ({
            id: pr.id,
            title: pr.title,
            state: pr.state,
            reviewers: pr.requested_reviewers.map(reviewer => reviewer.login),
            commentsCount: pr.comments,
            createdAt: pr.created_at,
            updatedAt: pr.updated_at,
            mergedAt: pr.merged_at
        }));
    } catch (error) {
        console.error('Error fetching pull requests:', error.message);
        throw new Error('Failed to fetch pull requests');
    }
}

async function fetchRepoMetrics(owner, repoName) {
    try {
        const response = await axios.get(`https://api.github.com/repos/${owner}/${repoName}`, {
            headers: {
                Authorization: `token ${process.env.ACCESS_TOKEN}`
            }
        });
        const { stargazers_count, forks_count, watchers_count } = response.data;
        return {
            stars: stargazers_count,
            forks: forks_count,
            watchers: watchers_count
        };
    } catch (error) {
        console.error('Error fetching repository metrics:', error.message);
        throw new Error('Failed to fetch repository metrics');
    }
}

async function fetchDependencies(owner, repoName, branch) {
    try {
        const packageJsonUrl = `https://raw.githubusercontent.com/${owner}/${repoName}/${branch}/package.json`;
        const response = await axios.get(packageJsonUrl);
        const packageJson = response.data;

        let dependencies = [];
        let devDependencies = [];

        if (packageJson) {
            if (packageJson.dependencies) {
                dependencies = Object.keys(packageJson.dependencies);
            }
            if (packageJson.devDependencies) {
                devDependencies = Object.keys(packageJson.devDependencies);
            }
        }

        return {
            dependencies,
            devDependencies
        };
    } catch (error) {
        console.error('Error fetching dependencies:', error.message);
        throw new Error('Failed to fetch dependencies');
    }
}

app.post('/fetch-repo-data', async (req, res) => {
    const { repoUrl } = req.body;
    const validUrl = URLSchema.safeParse(repoUrl);
    console.log(validUrl);
    if (validUrl.success) {
        try {
            const url = new URL(repoUrl);
            const pathParts = url.pathname.split('/').filter(part => part);
    
            const owner = pathParts[0];
            const repoName = pathParts[1];
            const branch = pathParts[3] || 'main';

            const results = {};

            // Define a helper function to handle fetching data from APIs
            const fetchData = async (key, func) => {
                try {
                    results[key] = await func(owner, repoName, branch);
                } catch (error) {
                    console.error(`Error fetching ${key}:`, error.message);
                    results[key] = null; // Mark the result as null if fetching fails
                }
            };

            // Define an array of async functions to be executed
            const asyncFunctions = [
                { key: 'structure', func: fetchFolderStructure },
                { key: 'commits', func: fetchCommitHistory },
                { key: 'openIssues', func: fetchIssues.bind(null, 'open') },
                { key: 'closedIssues', func: fetchIssues.bind(null, 'closed') },
                { key: 'openPullRequests', func: fetchPullRequests.bind(null, 'open') },
                { key: 'closedPullRequests', func: fetchPullRequests.bind(null, 'closed') },
                { key: 'repoMetrics', func: fetchRepoMetrics },
                { key: 'dependencies', func: fetchDependencies }
            ];

            // Execute all async functions concurrently
            await Promise.all(asyncFunctions.map(({ key, func }) => fetchData(key, func)));

            // Send the collected results to the frontend
            res.status(200).json({
                success: true,
                ...results,
                owner,
                repoName,
                branch
            });
        } catch (error) {
            console.error('Error fetching repository data:', error.message);
            res.status(500).json({ success: false, error: 'Failed to fetch repository data' });
        }
    } else {
        return res.status(403).json({
            message: 'Enter a valid repository URL'
        });
    }
});


app.use(express.static(path.join(__dirname, '/frontend/dist')));

app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, 'frontend', 'dist', 'index.html'))
});


app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
