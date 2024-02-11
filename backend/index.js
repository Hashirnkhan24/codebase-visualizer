import express from 'express';
import axios from 'axios';
import { URL } from 'url';
import dotenv from 'dotenv';
import cors from 'cors';


const app = express();
app.use(cors({
    origin: 'http://localhost:5173', // Explicitly specify the allowed origin
    credentials: true
}));
dotenv.config()
const PORT = process.env.PORT;

app.use(express.json());

// Function to fetch commit history
async function fetchCommitHistory(owner, repoName, branch) {
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
}

// Function to recursively fetch folder structure
async function fetchFolderStructure(owner, repoName, branch, path = '') {
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
}

// Function to fetch both
async function fetchRepoStructureAndCommits(owner, repoName, branch, path = '') {
    const [structure, commits] = await Promise.all([
        fetchFolderStructure(owner, repoName, branch, path),
        fetchCommitHistory(owner, repoName, branch)
    ]);
    return { structure, commits };
}

app.post('/fetch-repo-structure-and-commits', async (req, res) => {
    const { repoUrl } = req.body;
    try {
        const url = new URL(repoUrl);
        const pathParts = url.pathname.split('/').filter(part => part); // Remove empty parts

        // Extract owner, repository name, and branch from the URL
        const owner = pathParts[0];
        const repoName = pathParts[1];
        const branch = pathParts[3] || 'main';

        const { structure, commits } = await fetchRepoStructureAndCommits(owner, repoName, branch);

        res.status(200).json({ success: true, structure, commits });
    } catch (error) {
        console.error('Error fetching repository structure and commits:', error.message);
        res.status(500).json({ success: false, error: 'Failed to fetch repository structure and commits' });
    }
});

app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
