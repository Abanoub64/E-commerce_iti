const mongoose = require("mongoose"); // Importing mongoose library

const productSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  price: {
    type: Number,
    required: true,
  },
  description: {
    type: String,
  },
  seller: {
    type: String,
    required: true,
  },
  stock: {
    type: Number,
    required: true,
    default: 5,
  },
  image: {
    type: String,
  },
});
module.exports = mongoose.model("Product", productSchema); // Exporting the model
