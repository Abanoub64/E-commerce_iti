const { Router } = require("express");
const router = Router();
const productController = require("../controllers/productController");
const { validateProductCreation, validateProductUpdate } = require("../middleware/productValidation");

//Getting All
router.get("/products", productController.getAllProducts);

//Getting One
router.get("/products/:id", productController.getproduct, (req, res) => {
  res.status(200).json(res.product);
});

//Creating One
router.post("/products", validateProductCreation, productController.createProduct);

//Updating One
router.put("/products/:id", productController.getproduct, validateProductUpdate, productController.updateProduct);

//Deleting One
router.delete("/products/:id", productController.deleteProduct);

module.exports = router;
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

module.exports.getAllProducts = async (req, res) => {
  try {
    const products = await product.find();
    res.json(products);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports.createProduct = async (req, res) => {
  const { name, price, seller, description, image, stock } = req.body;
  try {
    const newProduct = await product.create({
      name,
      price,
      seller,
      description,
      image,
      stock
    });
    res.status(201).send(newProduct);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

module.exports.updateProduct = async (req, res) => {
  if (req.body.name != null) res.product.name = req.body.name;
  if (req.body.seller != null) res.product.seller = req.body.seller;
  if (req.body.price != null) res.product.price = req.body.price;
  if (req.body.description != null)
    res.product.description = req.body.description;
  if (req.body.image != null) res.product.image = req.body.image;
  if (req.body.stock != null) res.product.stock = req.body.stock;

  try {
    const updatedProduct = await res.product.save();
    res.status(200).json({
      message: "Product updated successfully",
      data: updatedProduct,
    });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

module.exports.deleteProduct = async (req, res) => {
  try {
    await product.findByIdAndDelete(req.params.id);
    res.status(200).json({ message: "Product deleted" });
  } catch (err) {
    res.status(500).json({ error: "Error deleting product" });
  }
};

