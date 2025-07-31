const { Router } = require("express");
const router = Router(); // Importing express router
const order = require("../models/order");
const product = require("../models/product");
const user = require("../models/user");
const orderController = require("../controllers/orderController");
// Importing the model

//Getting All
router.get("/orders", async (req, res) => {
  try {
    const orders = await order.find();
    res.json(orders);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});
//Getting One
router.get("/orders/:id", orderController.getorder, async (req, res) => {
  try {
    res.status(200).json(res.order);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

//Creating One
router.post("/orders", async (req, res) => {
  const { totalAmount } = req.body;
  const productId = req.body.productId;
  const userId = req.body.userId;
  try {
    const neworder = await order.create({
     totalAmount
    });
    res.send(neworder);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});
//Updating One
router.put("/orders/:id", orderController.getorder, async (req, res) => {
  if (req.body.orderDate != null) res.order.orderDate = req.body.orderDate;
  if (req.body.orderStatus != null) res.order.orderStatus = req.body.orderStatus;
  if (req.body.totalAmount != null) res.order.totalAmount = req.body.totalAmount;
  if (req.body.image != null) res.order.image = req.body.image;

  try {
    const updatedorder = await res.order.save();
    res.status(200).json({
      message: "order updated successfully",
      data: updatedorder,
    });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

//Deleting One
router.delete("/orders/:id", orderController.getorder, async (req, res) => {
  try {
    await res.order.deleteOne(); 
    res.status(200).json({ message: `order with ID ${req.params.id} deleted` });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

module.exports = router;
