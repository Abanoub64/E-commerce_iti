const express = require("express");
const router = express.Router(); // Importing express router
const Subscriber = require("../models/subscriberRoutes"); // Importing the Subscriber model

//Getting All
router.get("/prodcuts", async (req, res) => {
  try {
    const subscribers = await Subscriber.find(); // Fetching all subscribers
    res.json(subscribers); // Sending the list of subscribers as a response
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});


//Getting One
router.get("/:id", getSubscriber,async (req, res) => {
    res.json(res.subscriber); // Sending the found subscriber as a response
  try {
    res.status(200).json({ message: `Get subscriber with ID ${req.params.id}` });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});
//Creating One
router.post("/", getSubscriber, async (req, res) => {
  try {
    res.status(201).json({ message: "Subscriber created" });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});
//Updating One
router.patch("/:id", getSubscriber, async (req, res) => {
    if (req.body.name != null) {
      res.subscriber.name = req.body.name; // Update the name if provided
    }
    if(req.body.email != null) {
      res.subscriber.email = req.body.email; // Update the email if provided
    }
    if(req.body.seller != null) {
      res.subscriber.seller = req.body.seller; // Update the seller if provided
    }
  try {
    const updatedSubscriber =await res.subscriber.save();  // Save the updated subscriber to the database
    res.json(updatedSubscriber);
    res.status(200).json({ message: `Subscriber with ID ${req.params.id} updated` });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});
//Deleting One
router.delete("/:id", getSubscriber, async (req, res) => {
  try {
    await res.subscriber.remove(); // Remove the subscriber from the database
    res.status(200).json({ message: `Subscriber with ID ${req.params.id} deleted` });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

async function getSubscriber(req, res, next) {
  let subscriber;
  try {
    const subscriber = await Subscriber.findById(req.params.id);
    if (!subscriber) {
      return res.status(404).json({ message: "Subscriber not found" });
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
  res.subscriber = subscriber; // Attach the found subscriber to the response object
}

module.exports = router;
