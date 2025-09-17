const express = require("express");
const app = express();

// Root route
app.get("/", (req, res) => {
  res.send("Timestamp Microservice API. Use /api/:date");
});

// Route for current timestamp (no date provided)
app.get("/api", (req, res) => {
  const now = new Date();
  res.json({
    unix: now.getTime(),
    utc: now.toUTCString(),
  });
});

// Route for provided date
app.get("/api/:date", (req, res) => {
  let dateParam = req.params.date;

  // If dateParam is only digits → treat as Unix timestamp
  if (/^\d+$/.test(dateParam)) {
    dateParam = parseInt(dateParam);
  }

  const date = new Date(dateParam);

  // Invalid date
  if (date.toString() === "Invalid Date") {
    return res.json({ error: "Invalid Date" });
  }

  // Valid date
  res.json({
    unix: date.getTime(),
    utc: date.toUTCString(),
  });
});

// Start server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
