const order = require("../models/order");
const product = require("../models/product");
const user = require("../models/user");

module.exports.getorder = async (req, res, next) => {
  try {
    const getOrder = await order
      .findById(req.params.id)
      .populate("productId")
      .populate("userId");

    if (!getOrder) {
      return res.status(404).json({ message: "Order not found" });
    }

    res.order = getOrder;

    res.order.productId.name;
    res.order.userId.userName;

    next();
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
