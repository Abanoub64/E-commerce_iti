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
  const { name, price, seller } = req.body;
  try {
    const newProduct = await product.create({
      name,
      price,
      seller,
      description: "test1",
      image: "test3",
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
router.delete("/products/:id", productController.getproduct, async (req, res) => {
  try {
    await res.product.deleteOne(); 
    res.status(200).json({ message: `Product with ID ${req.params.id} deleted` });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

module.exports = router;
