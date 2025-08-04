const { json } = require("express");
const User = require("../models/user");
const jwt = require("jsonwebtoken");

const maxAge = 3 * 24 * 60 * 60;

const createToken = (id) => {
  return jwt.sign({ id }, process.env.SECRET, {
    expiresIn: maxAge,
  });
};

module.exports.signup_post = async (req, res) => {
  const { userName, password } = req.body;

  try {
    const existingUser = await User.findOne({ userName });
    if (existingUser) {
      return res.status(409).json({ error: "Username already exists" });
    }

    let user = await User.create({
      userName,
      password,
      userLevel: "user",
      cart: [],
    });
    const token = createToken(user._id);
    res.cookie("jwt", token, {
      httpOnly: true,
      maxAge: maxAge * 1000,
      secure: false,
      sameSite: "None",
      domain: "",
      path: "/",
    });
    res.cookie("userId", user._id.toString(), {
      httpOnly: false,
      maxAge: maxAge * 1000,
      secure: false,
      sameSite: "None",
      domain: "",
      path: "/",
    });

    res.cookie("userLevel", "user", {
      httpOnly: false,
      maxAge: maxAge * 1000,
      secure: false,
      sameSite: "None",
      domain: "",
      path: "/",
    });
    res.status(201).json(user._id);
    console.log(user);
  } catch (error) {
    console.log(error);
    res.status(400).send("error user not created");
  }
};
module.exports.login_post = async (req, res) => {
  const { userName, password } = req.body;
  try {
    const user = await User.login(userName, password);

    const token = createToken(user._id);
    res.cookie("jwt", token, {
      httpOnly: true,
      maxAge: maxAge * 1000,
      secure: false,
      sameSite: "None",
      domain: "",
      path: "/",
    });
    res.cookie("userId", user._id.toString(), {
      httpOnly: false,
      maxAge: maxAge * 1000,
      secure: false,
      sameSite: "None",
      domain: "",
      path: "/",
    });

    res.cookie("userLevel", user.userLevel, {
      httpOnly: false,
      maxAge: maxAge * 1000,
      secure: false,
      sameSite: "None",
      domain: "",
      path: "/",
    });
    res.status(200).json({ user: user._id });
  } catch (error) {
    console.log(error.message);
    res.status(400).json({ error: error.message });
  }
};

module.exports.getAllUsers = async (req, res) => {
  try {
    const user = await User.find();
    res.json(user);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
module.exports.logout_get = (req, res) => {
  res.cookie("jwt", "", { maxAge: 1 });
  res.cookie("userId", "", { maxAge: 1 });
  res.cookie("userLevel", "", { maxAge: 1 });

  res.status(200).json({ message: "Logged out successfully" });
};

module.exports.deleteUser = async (req, res) => {
  try {
    await User.findByIdAndDelete(req.params.id);
    res.status(200).json({ message: "User deleted" });
  } catch (err) {
    res.status(500).json({ error: "Error deleting user" });
  }
};
