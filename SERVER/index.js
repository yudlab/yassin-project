const express = require("express");
const fs = require("fs");
const path = require("path");
const cors = require("cors");

const app = express();
const PORT = 5000;

// Enable CORS for all routes
app.use(cors());

// Define the base directory where users are allowed to explore
const baseDirectory = path.resolve("/home"); // Set to '/home'

// Endpoint to stream any video from disk
app.get("/video", (req, res) => {
    const range = req.headers.range;
    if (!range) {
        return res.status(400).send("Range must be provided");
    }

    // Get the video file path from query parameters
    const videoPath = req.query.path;
    if (!videoPath) {
        return res.status(400).send("Video path must be provided in the query");
    }

    // Resolve the full path to prevent accessing unauthorized files
    const fullPath = path.resolve(videoPath);

    // Ensure the file exists and is inside the allowed directory
    if (!fullPath.startsWith(baseDirectory)) {
        return res.status(403).send("Access denied");
    }

    if (!fs.existsSync(fullPath)) {
        return res.status(404).send("Video file not found");
    }

    // Get video file size
    const videoSize = fs.statSync(fullPath).size;
    const chunkSize = 10 ** 6; // 1MB chunks

    // Parse the range header to determine the start and end positions
    const start = Number(range.replace(/\D/g, ""));
    const end = Math.min(start + chunkSize, videoSize - 1);
    const contentLength = end - start + 1;

    // Set response headers for partial content
    const headers = {
        "Content-Range": `bytes ${start}-${end}/${videoSize}`,
        "Accept-Ranges": "bytes",
        "Content-Length": contentLength,
        "Content-Type": "video/mp4",
    };

    res.writeHead(206, headers);

    // Create a readable stream for the video file
    const videoStream = fs.createReadStream(fullPath, { start, end });

    // Pipe the stream to the response
    videoStream.pipe(res);
});

// Endpoint to explore directories (restricted to /home)
app.get("/explore", (req, res) => {
    const dirPath = req.query.path || "/home"; // Default to current directory if no path provided

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
