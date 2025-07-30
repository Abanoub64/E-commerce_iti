import mongoose from "mongoose";
const { Schema } = mongoose;

const userSchema = new Schema({
  userName: String,
  userLevel: ["user" || "superuser"],
  cart: [{ String }],
  password: String,
});



module.exports = mongoose.Schema("User", userSchema);
