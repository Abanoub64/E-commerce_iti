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
  const { products, userId,orderStatus, totalAmount  } = req.body;
  
 // check for user
    const foundUser = await user.findById(userId);
    if (!foundUser) {
      return res.status(404).json({ message: "User not found" });
    }

  try {
    const newOrder = await order.create({
      products,
      userId,
      orderStatus,
      totalAmount
      
    });
   
    //add this order to the cart of the user
    foundUser.cart.push(newOrder._id);
    await foundUser.save();

    res.status(201).json({
      message: "Order created and added to user cart",
      order: newOrder,
      userCart: foundUser.cart,
    });
  } catch (error) {
  console.error("Error while creating order:", error);
  res.status(400).json({ message: error.message });
}
});

// Confirming the order
router.patch("/orders/:id", async (req, res) => {
  try {
    const updated = await order.findByIdAndUpdate(req.params.id, {
      orderStatus: req.body.orderStatus,
    });
    res.status(200).json(updated);
  } catch (err) {
    console.error("Error while updating order:", err);
    res
      .status(500)
      .json({ error: "Error updating order", details: err.message });
  }
});
//Updating One
router.put("/orders/:id", orderController.getorder, async (req, res) => {
  if (req.body.orderDate != null) res.order.orderDate = req.body.orderDate;
  if (req.body.orderStatus != null)
    res.order.orderStatus = req.body.orderStatus;
  if (req.body.totalAmount != null)
    res.order.totalAmount = req.body.totalAmount;
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

// {
//     "products": ["688c013ef3db1aac6f8c61f4" , "688c013ef3db1aac6f8c61f4"],
//     "userId": "688afa0ce5ca1a2b0b02d077",
//         "orderStatus": "Confirmed",
//         "totalAmount": 5,
//         "image": "test image",
//         "orderDate": "2025-07-31T23:50:22.900Z"
// }