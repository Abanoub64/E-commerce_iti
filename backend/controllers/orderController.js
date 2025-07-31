const order = require("../models/order");
const product = require("../models/product");
const user = require("../models/user");

module.exports.getorder = async (req, res, next) => {
  try {
    const getOrder = await order.findById(req.params.id);
    
    if (!getOrder) {
      return res.status(404).json({ message: "Order not found" });
    }

    const getProduct = await product.findById(getOrder.productId);
    const getUser = await user.findById(getOrder.userId);

    res.order = getOrder;
    res.orderProduct = getProduct; 
    res.orderUser = getUser;

    next();
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
