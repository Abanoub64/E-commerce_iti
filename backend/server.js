const express = require("express");
const app = express();
const PORT = process.env.PORT || 3000;
const mongoose = require("mongoose");
// Middleware
app.use(express.json());

// Basic Route

app.get("/", (req, res) => {
  res.send("E-commerce backend is running...");
});

mongoose
  .connect(process.env.MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log("MongoDB connected "))
  .catch((err) => console.error("MongoDB connection error ", err));

// Start server
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
