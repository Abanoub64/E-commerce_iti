require("dotenv").config();
const express = require("express");
const authRoutes = require("./routes/authRoutes");
const productsRoutes = require("./routes/productRoutes");
const orderRoutes = require("./routes/orderRoutes");
const app = express();
const PORT = process.env.PORT || 3000;
const mongoose = require("mongoose");
const cors = require("cors");
const cookieParser = require("cookie-parser");
// Middleware
app.use(express.json());
app.use(cookieParser());
app.use(
  cors({
    origin: [
      "http://127.0.0.1:5500",
      "https://e-commerce-iti-theta.vercel.app",
    ],
    credentials: true,
  })
);
app.use(orderRoutes);
app.use(authRoutes);
app.use(productsRoutes);

// Basic Route
// app.get("/", (req, res) => {
//   res.send("E-commerce backend is running...");
// });

mongoose
  .connect(process.env.MONGO_URI, {})
  .then(() => {
    console.log("MongoDB connected ");
    app.listen(PORT, () => {
      console.log(`Server is running on http://localhost:${PORT}`);
    });
  })
  .catch((err) => console.error("MongoDB connection error ", err));

app.get("/set-cookie", (req, res) => {
  res.cookie("newUser", false, { maxAge: 1000 * 60 * 60 * 24 }, secure);
});
