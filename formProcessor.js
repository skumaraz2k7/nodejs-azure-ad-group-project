// formProcessor.js
const fs = require('fs');
const yaml = require('js-yaml');
const { BlobServiceClient } = require('@azure/storage-blob');
const axios = require('axios');
require('dotenv').config(); // Load environment variables from .env file

// Function to upload file to Azure Storage Account container
async function uploadToAzureStorage(fileName, fileContent) {
    const connectionString = process.env.AZURE_STORAGE_CONNECTION_STRING; // Use the environment variable
    const containerName = 'blob-container'; // Updated container name

    const blobServiceClient = BlobServiceClient.fromConnectionString(connectionString);
    const containerClient = blobServiceClient.getContainerClient(containerName);
    const blockBlobClient = containerClient.getBlockBlobClient(fileName);

    await blockBlobClient.upload(fileContent, fileContent.length);
}

// Function to call the GitHub repository dispatch event to trigger a workflow
async function triggerGitHubWorkflow() {
    const githubApiUrl = `https://api.github.com/repos/${process.env.GITHUB_OWNER}/${process.env.GITHUB_REPO}/dispatches`;
    const githubToken = process.env.GITHUB_TOKEN; // Personal access token with repo scope
    const headers = {
        'Content-Type': 'application/json',
        'Accept': 'application/vnd.github.everest-preview+json',
        'Authorization': `Bearer ${githubToken}`,
    };

    const eventData = {
        event_type: 'manual-trigger', // This should match the event type in your workflow
    };

    const response = await axios.post(githubApiUrl, eventData, { headers });
    return response.data;
}

// Function to process form data
function processForm(adGroupName, groupType) {
    // Map form inputs to variables
    const variables = {
        adGroupName,
        groupType
    };

    // Convert the variables object to YAML format
    const yamlContent = yaml.dump(variables);

    // Write the YAML content to the test.tfvars file
    const fileName = 'test.tfvars';
    fs.writeFileSync(fileName, yamlContent, 'utf-8');

    // Upload the file to Azure Storage Account container
    uploadToAzureStorage(fileName, fs.readFileSync(fileName));

    // Call the GitHub repository dispatch event to trigger the workflow
    triggerGitHubWorkflow();

    // Return a success message
    return 'Group created successfully! Data saved to test.tfvars, uploaded to Azure Storage Account, and GitHub Action workflow triggered.';
}

module.exports = processForm;
