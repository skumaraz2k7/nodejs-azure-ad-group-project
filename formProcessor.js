// formProcessor.js
const fs = require('fs');
const yaml = require('js-yaml');
const { BlobServiceClient } = require('@azure/storage-blob');
require('dotenv').config(); // Load environment variables from .env file

// Function to upload file to Azure Storage Account container
async function uploadToAzureStorage(fileName, fileContent) {
    const connectionString = process.env.AZURE_STORAGE_CONNECTION_STRING; // Use the environment variable
    const containerName = 'blob-container'; // Replace with your container name

    const blobServiceClient = BlobServiceClient.fromConnectionString(connectionString);
    const containerClient = blobServiceClient.getContainerClient(containerName);
    const blockBlobClient = containerClient.getBlockBlobClient(fileName);

    await blockBlobClient.upload(fileContent, fileContent.length);
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

    // Return a success message
    return 'Group created successfully! Data saved to test.tfvars and uploaded to Azure Storage Account.';
}

module.exports = processForm;
