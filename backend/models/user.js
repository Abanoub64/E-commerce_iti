const mongoose = require("mongoose");
const bcrypt = require("bcrypt");

const userSchema = new mongoose.Schema({
  userName: { type: String, required: true },
  password: { type: String, required: true },
  userLevel: { type: String, default: "user" },
  cart: [{ type: mongoose.Schema.Types.ObjectId,
  ref: "Order" }]
});

userSchema.pre("save", async function (next) {
  console.log(`this user was created ${this}`);
  const salt = await bcrypt.genSalt();
  this.password = await bcrypt.hash(this.password, salt);
  next();
});

userSchema.statics.login = async function (userName, password) {
  const user = await this.findOne({ userName });
  if (user) {
    const auth = bcrypt.compare(password, user.password);
    if (auth) {
      return user;
    }
    throw Error("incorrect Password");
  }
  throw Error("incorrect Name");
};

module.exports = mongoose.model("User", userSchema);
