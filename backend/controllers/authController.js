const User = require("../models/user");

module.exports.signup_post = async (req, res) => {
  const { userName, password } = req.body;

  try {
    let user = await User.create({
      userName,
      password,
      userLevel: "user",
      cart: [],
    });
    res.status(201).json(user);
    console.log(user);
  } catch (error) {
    console.log(error);
    res.status(400).send("error user not created");
  }
};
module.exports.login_post = async (req, res) => {
  res.render("login post");
};
module.exports.logout_get = (req, res) => {
  console.log("logout");
};
