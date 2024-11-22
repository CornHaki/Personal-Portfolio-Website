const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const path = require('path'); // Import path module to work with file paths

const app = express();
const port = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(bodyParser.json());

// Serve static files from the 'public' directory
app.use(express.static(path.join(__dirname, 'public')));

// Sample endpoint for handling contact form submissions
app.post('/api/contact', (req, res) => {
    const { name, email, message } = req.body;

    // Simulate saving to a database
    const newContact = new Contact({ name, email, message });
    
    newContact.save()
        .then(() => {
            res.status(200).json({ success: true, message: 'Form submitted successfully!' });
        })
        .catch(err => {
            console.error('Error saving contact:', err);
            res.status(500).json({ success: false, message: 'Failed to save contact.' });
        });
});

// Sample endpoint for fetching projects
app.get('/api/projects', (req, res) => {
    const projects = [
        { id: 1, title: 'Project 1', description: 'Description of Project 1' },
        { id: 2, title: 'Project 2', description: 'Description of Project 2' }
    ];
    res.json(projects);
});

// For any unknown route, serve the portfolio's index.html
app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

// Start server
app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});
