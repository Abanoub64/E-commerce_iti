const { Router } = require("express");
const router = Router(); // Importing express router
const product = require("../models/product");
const productController = require("../controllers/productController");
// Importing the model

//Getting All
router.get("/products", async (req, res) => {
  try {
    const products = await product.find();
    res.json(products);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});
//Getting One
router.get("/products/:id", productController.getproduct, async (req, res) => {
  try {
    res.status(200).json(res.product);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

//Creating One
router.post("/products", async (req, res) => {
  const { name, price, seller,description,image,stock } = req.body;
  try {
    const newProduct = await product.create({
      name,
      price,
      seller,
      description,
      image,
      stock
    });
    res.send(newProduct);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});
//Updating One
router.put("/products/:id", productController.getproduct, async (req, res) => {
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
});

//Deleting One
router.delete("/products/:id", async (req, res) => {
  try {
    await Product.findByIdAndDelete(req.params.id);
    res.status(200).json({ message: "Product deleted" });
  } catch (err) {
    res.status(500).json({ error: "Error deleting product" });
  }
});

module.exports = router;
