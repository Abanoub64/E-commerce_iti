require("dotenv").config(); //to use environment variables from .env file

const express = require("express"); // Importing express library
const app = express(); //to configure our server
const mongoose = require("mongoose"); // Importing library mongoose

mongoose.connect(process.env.MONGO_URI, { useNewUrlParser: true });
const db = mongoose.connection; //to connect to the database
db.on("error", (error) => console.error(error)); //to handle error
db.once("open", () => console.log("connected to database")); //to confirm connection

app.use(express.json()); //to parse incoming JSON requests

const subscriberRouter = require("./routes/subscribers"); // Importing the subscriber routes
app.use("/subscribers", subscriberRouter); 
app.listen(3000, () => console.log("Server started"));

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
