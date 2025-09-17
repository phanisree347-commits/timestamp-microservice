const express = require("express");
const app = express();

// Root route
app.get("/", (req, res) => {
  res.send("Timestamp Microservice API. Use /api/:date?");
});

// Single route for /api/:date? functionality
app.get("/api/:date?", (req, res) => {
  let { date } = req.params;

  // Empty parameter → current date
  if (!date) date = new Date();
  else if (/^\d+$/.test(date)) date = parseInt(date); // digits → Unix timestamp
  else date = new Date(date); // else treat as ISO string

  const parsedDate = new Date(date);

  // Invalid date
  if (parsedDate.toString() === "Invalid Date") {
    return res.json({ error: "Invalid Date" });
  }

  // Valid date
  res.json({
    unix: parsedDate.getTime(),
    utc: parsedDate.toUTCString(),
  });
});

// Start server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
