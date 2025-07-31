const express = require("express");
const router = express.Router(); // Importing express router
const user = require("../models/userRoutes"); // Importing the model

//Getting All
router.get("/", async (req, res) => {
  try {
    const users = await user.find(); 
    res.json(users); 
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});
//Getting One
router.get("/:id", getuser,async (req, res) => {
    res.json(res.user); 
  try {
    res.status(200).json({ message: `Get user with ID ${req.params.id}` });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});
//Creating One
router.post("/", getuser, async (req, res) => {
  try {
    res.status(201).json({ message: "user created" });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});
//Updating One
router.patch("/:id", getuser, async (req, res) => {
    if (req.body.name != null) {
      res.user.name = req.body.name; 
    }
    if(req.body.email != null) {
      res.user.email = req.body.email; 
    }
    if(req.body.seller != null) {
      res.user.seller = req.body.seller; 
    }
  try {
    const updateduser =await res.user.save();  
    res.json(updateduser);
    res.status(200).json({ message: `user with ID ${req.params.id} updated` });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});
//Deleting One
router.delete("/:id", getuser, async (req, res) => {
  try {
    await res.user.remove(); 
    res.status(200).json({ message: `user with ID ${req.params.id} deleted` });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

async function getuser(req, res, next) {
  let user;
  try {
    const user = await user.findById(req.params.id);
    if (!user) {
      return res.status(404).json({ message: "user not found" });
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
  res.user = user; 
}

module.exports = router;
