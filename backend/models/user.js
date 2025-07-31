const mongoose = require("mongoose");
const bcrypt = require("bcrypt");

const userSchema = new mongoose.Schema({
  userName: { type: String, required: true },
  password: { type: String, required: true },
  userLevel: { type: String, default: "user" },
  cart: { type: [String], default: [] },
});

userSchema.pre("save", async function (next) {
  console.log(`this user was created ${this}`);
  const salt = await bcrypt.genSalt();
  this.password = await bcrypt.hash(this.password, salt);
  next();
});

module.exports = mongoose.model("User", userSchema);
