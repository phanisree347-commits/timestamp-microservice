const express = require("express");
const app = express();

// Root route
app.get("/", (req, res) => {
  res.send("Timestamp Microservice API. Use /api/:date");
});

// Single API route handling optional date
app.get("/api/:date?", (req, res) => {
  let dateParam = req.params.date;

  let date;

  if (!dateParam) {
    // Empty → use current date
    date = new Date();
  } else if (/^\d+$/.test(dateParam)) {
    // Only digits → treat as Unix timestamp
    date = new Date(parseInt(dateParam));
  } else {
    // Else → parse as ISO date string
    date = new Date(dateParam);
  }

  if (date.toString() === "Invalid Date") {
    return res.json({ error: "Invalid Date" });
  }

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
