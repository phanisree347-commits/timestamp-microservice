const express = require("express");
const app = express();

// Root route
app.get("/", (req, res) => {
  res.send("Timestamp Microservice API. Use /api/:date");
});

// Route for empty parameter → current date
app.get("/api", (req, res) => {
  const now = new Date();
  res.json({
    unix: now.getTime(),
    utc: now.toUTCString(),
  });
});

// Route for date parameter
app.get("/api/:date", (req, res) => {
  let { date } = req.params;

  // If only digits → Unix timestamp
  if (/^\d+$/.test(date)) {
    date = parseInt(date);
  }

  const parsedDate = new Date(date);

  if (parsedDate.toString() === "Invalid Date") {
    return res.json({ error: "Invalid Date" });
  }

  res.json({
    unix: parsedDate.getTime(),
    utc: parsedDate.toUTCString(),
  });
});

// Start server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
