const express = require("express");
const fs = require("fs");
const path = require("path");
const cors = require("cors");

const app = express();
const PORT = 5000;

// Enable CORS for all routes
app.use(cors());

// Define the base directory where users are allowed to explore
const baseDirectory = path.resolve("~/"); // Set to '/home'

// Endpoint to explore directories (restricted to /home)
app.get("/explore", (req, res) => {
    const dirPath = req.query.path || baseDirectory; // Default to current directory if no path provided

    // Resolve the full path to prevent accessing unauthorized directories
    const fullPath = path.resolve(dirPath);

    // Ensure the path is within the base directory
    if (!fullPath.startsWith(baseDirectory)) {
        return res.status(403).send("Access denied");
    }

    // Ensure the directory exists and is a directory
    if (!fs.existsSync(fullPath) || !fs.lstatSync(fullPath).isDirectory()) {
        return res.status(404).send("Directory not found");
    }

    // Read the directory contents
    const items = fs.readdirSync(fullPath).map(item => {
        const itemPath = path.join(fullPath, item);
        const isDirectory = fs.lstatSync(itemPath).isDirectory();
        return { name: item, isDirectory, path: itemPath };
    });

    res.json(items);
});

// Start the server
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
    console.log("You can play videos by providing their path as a query parameter to /video, e.g.: http://localhost:5000/video?path=/path/to/video.mp4");
    console.log("You can explore directories using /explore, e.g.: http://localhost:5000/explore?path=/path/to/directory");
});
