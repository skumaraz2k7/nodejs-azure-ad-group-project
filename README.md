# File upload to Azure Storage Blob using Node JS Application

This is a simple Node.js project that allows you to fill a basic form and submit. On Submit action input variables are processed and stored as a Yaml file in an Azure Blob Storage.

## Getting Started

### Prerequisites

- Node.js installed on your machine. You can download it from [https://nodejs.org/](https://nodejs.org/).
- An Azure Storage Account. If you don't have one, you can create it in the [Azure Portal](https://portal.azure.com/).
- Update file `.env` and replace `AZURE_STORAGE_CONNECTION_STRING` with your Azure Storage Account connection string.

### Installation

1. Clone the repository:

    ```bash
    git clone https://github.com/skumaraz2k7/nodejs-azure-ad-group-project.git
    cd nodejs-azure-ad-group-project
    ```

2. Install dependencies:

    ```bash
    npm install
    ```

3. Run the application:

    ```bash
    node app.js
    ```

4. Visit [http://localhost:3000](http://localhost:3000) in your web browser to access the form.

## Usage

1. Open your web browser and navigate to [http://localhost:3000](http://localhost:3000).
2. Fill in the form with the required information (AD Group Name and Group Type).
3. Click the "Create Group" button to submit the form.
4. The form data will be saved to a `test.tfvars` file and uploaded to the specified Azure Storage Account container.

## Contributing

If you'd like to contribute to this project, please follow these guidelines:

1. Fork the repository.
2. Create a new branch for your feature or bug fix.
3. Commit your changes and push them to your fork.
4. Create a pull request.

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.
