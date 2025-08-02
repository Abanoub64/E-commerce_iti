const mongoose = require("mongoose");

const orderSchema = new mongoose.Schema({
 products : [{
    type: mongoose.Schema.Types.ObjectId,
    ref: "Product",
    required: true,
  }],
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  orderDate: {
    type: Date,
    default: Date.now,
  },
  orderStatus: {
    type: String,
    required: true,
    default: "Pending",
  },
  totalAmount: {
    type: Number,
    required: true,
  },
  
});

module.exports = mongoose.model("Order", orderSchema);
