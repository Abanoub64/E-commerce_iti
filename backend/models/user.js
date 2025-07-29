import mongoose from "mongoose";
const { Schema } = mongoose;

const userSchema = new Schema({
  userName: String,
  userLevel: ["user" || "superuser"],
  cart: [{ String }],
  password: String,
});

const products = new Schema({
  productName: String,
  title: String,
  price: Number,
  seller: String,
  imgUrl: String,
});

module.exports = mongoose.Schema("User", userSchema);
