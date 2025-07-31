const { Router } = require("express");
const router = Router(); // Importing express router
const product = require("../models/product");
// Importing the model

//Getting All
router.get("/products", async (req, res) => {
  try {
    const products = await product.find();
    res.json(products);
    res.send("Products sent");
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});
//Getting One
router.get("/:id", getproduct, async (req, res) => {
  res.json(res.product);
  try {
    res.status(200).json({ message: `Get product with ID ${req.params.id}` });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});
//Creating One
router.post("/", getproduct, async (req, res) => {
  try {
    res.status(201).json({ message: "product created" });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});
//Updating One
router.patch("/:id", getproduct, async (req, res) => {
  if (req.body.name != null) {
    res.product.name = req.body.name;
  }
  if (req.body.email != null) {
    res.product.email = req.body.email;
  }
  if (req.body.seller != null) {
    res.product.seller = req.body.seller;
  }
  try {
    const updatedproduct = await res.product.save();
    res.json(updatedproduct);
    res
      .status(200)
      .json({ message: `product with ID ${req.params.id} updated` });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});
//Deleting One
router.delete("/:id", getproduct, async (req, res) => {
  try {
    await res.product.remove();
    res
      .status(200)
      .json({ message: `product with ID ${req.params.id} deleted` });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

async function getproduct(req, res, next) {
  let product;
  try {
    const product = await product.findById(req.params.id);
    if (!product) {
      return res.status(404).json({ message: "product not found" });
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
  res.product = product;
}

module.exports = router;
