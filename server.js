const express = require("express");
const axios = require("axios");
const path = require("path");
const app = express();
const PORT = 3002;

// Set the view engine to ejs
app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));

// Middleware to serve static files
app.use(express.static("public"));
app.use(express.json());

// Route for server status
app.post("/status", async (req, res) => {
  const { urls } = req.body;

  if (!urls || !Array.isArray(urls)) {
    return res.status(400).json({ error: "Invalid input" });
  }

  const results = [];
  for (let url of urls) {
    try {
      const response = await axios.get(url);
      results.push({ url, status: response.status });
    } catch (error) {
      results.push({ url, status: "Error: Unable to fetch server status" });
    }
  }

  res.json({ results });
});

// Start the server
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
