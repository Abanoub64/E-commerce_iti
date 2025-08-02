// const { Router } = require("express");
// const router = Router(); // Importing express router
// const user = require("../models/user");
// const userController = require("../controllers/authController");
// // Importing the model

// //Getting All
// router.get("/users", async (req, res) => {
//   try {
//     const users = await user.find();
//     res.json(users);
//   } catch (error) {
//     res.status(500).json({ message: error.message });
//   }
// });
// //Getting One
// router.get("/users/:id", userController.getuser, async (req, res) => {
//   try {
//     res.status(200).json(res.user);
//   } catch (error) {
//     res.status(500).json({ message: error.message });
//   }
// });

// //Creating One
// router.post("/users", async (req, res) => {
//   const { userName, password } = req.body;
//   try {
//     const newuser = await user.create({
//        userName,
//       password,
//       userLevel: "user",
//       cart: [],
//     });
//     res.send(newuser);
//   } catch (error) {
//     res.status(400).json({ message: error.message });
//   }
// });
// //Updating One
// router.put("/users/:id", userController.getuser, async (req, res) => {
//   if (req.body.userName != null) res.user.userName = req.body.userName;
//   if (req.body.password != null) res.user.password = req.body.password;
//   if (req.body.userLevel != null) res.user.userLevel = req.body.userLevel;
//   try {
//     const updateduser = await res.user.save();
//     res.status(200).json({
//       message: "user updated successfully",
//       data: updateduser,
//     });
//   } catch (error) {
//     res.status(400).json({ message: error.message });
//   }
// });

// //Deleting One
// router.delete("/users/:id", userController.getuser, async (req, res) => {
//   try {
//     await res.user.deleteOne(); 
//     res.status(200).json({ message: `user with ID ${req.params.id} deleted` });
//   } catch (error) {
//     res.status(500).json({ message: error.message });
//   }
// });

// module.exports = router;
