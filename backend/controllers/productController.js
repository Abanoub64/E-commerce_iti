const product = require("../models/product"); 

module.exports.getproduct = async (req, res, next) => {
  try {
    const getProduct = await product.findById(req.params.id);
    if (!getProduct) {
      return res.status(404).json({ message: "Product not found" });
    }
    res.product = getProduct;
    next();
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};


