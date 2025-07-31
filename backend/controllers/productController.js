const product = require("../models/product");

module.exports.getproduct = async (req, res, next) => {
  try {
    var newProduct = await product.findById(req.params._id);
    if (!newProduct) {
      return res.status(404).json({ message: "product not found" });
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
  res.product = product;
};
