// scripts/createJiraIssue.js

const fetch = require('node-fetch');

async function run() {
    try {
        // GitHub issue data from environment variable
        const githubIssue = JSON.parse(process.env.GITHUB_ISSUE);

        // Jira credentials from environment variables
        const jiraDomain = process.env.JIRA_DOMAIN;
        const projectKey = process.env.JIRA_PROJECT_KEY;
        const authString = Buffer.from(`${process.env.JIRA_USER_EMAIL}:${process.env.JIRA_API_TOKEN}`).toString('base64');

        // Map GitHub labels to Jira issue types
        const labelToIssueType = {
            bug: 'Bug',
            story: 'Story',
            task: 'Task',
        };

        // Determine Jira issue type based on first matching label
        // Determine Jira issue type based on GitHub labels
        const issueTypeName = githubIssue.labels.map((label) => label.name.toLowerCase()).find((name) => labelToIssueType[name]) || 'task';

        const jiraIssueType = labelToIssueType[issueTypeName]; // 'Bug', 'Story', or 'Task'

        // Jira payload
        const jiraPayload = {
            fields: {
                project: { key: projectKey },
                summary: githubIssue.title || 'No title',
                description: {
                    type: 'doc',
                    version: 1,
                    content: [
                        {
                            type: 'paragraph',
                            content: [{ type: 'text', text: githubIssue.body || 'No description' }],
                        },
                    ],
                },
                issuetype: { name: jiraIssueType },
            },
        };

        // Create Jira issue
        const res = await fetch(`https://${jiraDomain}/rest/api/3/issue`, {
            method: 'POST',
            headers: {
                Authorization: `Basic ${authString}`,
                Accept: 'application/json',
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(jiraPayload),
        });

        if (!res.ok) {
            console.error(`Failed to create Jira issue: ${res.status} ${await res.text()}`);
            process.exit(1);
        } else {
            const data = await res.json();
            console.log(`Created Jira issue: ${data.key}`);
        }
    } catch (err) {
        console.error('Error creating Jira issue:', err);
        process.exit(1);
    }
}

run();
