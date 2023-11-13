// app.js
const express = require('express');
const bodyParser = require('body-parser');
const processForm = require('./formProcessor');
require('dotenv').config(); // Load environment variables from .env file

const app = express();
const port = 3000;

// Use EJS as the view engine
app.set('view engine', 'ejs');

// Middleware to parse form data
app.use(bodyParser.urlencoded({ extended: true }));

// Serve static files (CSS, JS, images, etc.) from the 'public' directory
app.use(express.static('public'));

// Route for the home page
app.get('/', (req, res) => {
    res.render('index');
});

// Route to handle form submission
app.post('/submit', (req, res) => {
    const { adGroupName, groupType } = req.body;
    // Call the processForm function from the external file
    const resultMessage = processForm(adGroupName, groupType);
    res.send(resultMessage);
});

// Start the server
app.listen(port, () => {
    console.log(`Server is running at http://localhost:${port}`);
});
