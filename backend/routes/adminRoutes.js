const express = require("express");
const router = express.Router(); // Importing express router
const admin = require("../models/adminRoutes"); // Importing the model

//Getting All
router.get("/", async (req, res) => {
  try {
    const admins = await admin.find(); 
    res.json(admins); 
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});
//Getting One
router.get("/:id", getadmin,async (req, res) => {
    res.json(res.admin); 
  try {
    res.status(200).json({ message: `Get admin with ID ${req.params.id}` });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});
//Creating One
router.post("/", getadmin, async (req, res) => {
  try {
    res.status(201).json({ message: "admin created" });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});
//Updating One
router.patch("/:id", getadmin, async (req, res) => {
    if (req.body.name != null) {
      res.admin.name = req.body.name; 
    }
    if(req.body.email != null) {
      res.admin.email = req.body.email; 
    }
    if(req.body.seller != null) {
      res.admin.seller = req.body.seller; 
    }
  try {
    const updatedadmin =await res.admin.save();  
    res.json(updatedadmin);
    res.status(200).json({ message: `admin with ID ${req.params.id} updated` });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});
//Deleting One
router.delete("/:id", getadmin, async (req, res) => {
  try {
    await res.admin.remove(); 
    res.status(200).json({ message: `admin with ID ${req.params.id} deleted` });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

async function getadmin(req, res, next) {
  let admin;
  try {
    const admin = await admin.findById(req.params.id);
    if (!admin) {
      return res.status(404).json({ message: "admin not found" });
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
  res.admin = admin; 
}

module.exports = router;
