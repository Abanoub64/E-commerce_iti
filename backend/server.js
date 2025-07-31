require("dotenv").config();
const express = require("express");
const authRoutes = require("./routes/authRoutes");
const app = express();
const PORT = process.env.PORT || 3000;
const mongoose = require("mongoose");
// Middleware
app.use(express.json());

// Basic Route
app.get("/", (req, res) => {
  res.send("E-commerce backend is running...");
});

app.use(authRoutes);

mongoose
  .connect(process.env.MONGO_URI, {})
  .then(() => {
    console.log("MongoDB connected ");
    app.listen(PORT, () => {
      console.log(`Server is running on http://localhost:${PORT}`);
    });
  })
  .catch((err) => console.error("MongoDB connection error ", err));

// Start server
