const express = require("express");
const app = express();

// Root route
app.get("/", (req, res) => {
  res.send("Timestamp Microservice API. Use /api/:date?");
});

// Single route with optional date parameter
app.get("/api/:date?", (req, res) => {
  let { date } = req.params;
  let parsedDate;

  if (!date) {
    // No date provided → use current date
    parsedDate = new Date();
  } else if (/^\d+$/.test(date)) {
    // Unix timestamp in milliseconds
    parsedDate = new Date(parseInt(date));
  } else {
    // ISO date string
    parsedDate = new Date(date);
  }

  // Check for invalid date
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
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
