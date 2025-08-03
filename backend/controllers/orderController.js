const order = require("../models/order");
const product = require("../models/product");
const user = require("../models/user");

module.exports.getorder = async (req, res, next) => {
  try {
    const getOrder = await order
      .findById(req.params.id)
      .populate("products")
      .populate("userId");

    if (!getOrder) {
      return res.status(404).json({ message: "Order not found" });
    }

    res.order = getOrder; 
    next(); 
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
//-----------------------------------------------------
const calculateTotalAmount = async (orderProducts) => {
  const products = await Product.find({ _id: { $in: orderProducts } });
  const total = products.reduce((sum, product) => sum + product.price, 0);
  return total;
};
//-----------------------------------------------------

module.exports.addToCart = async (req, res) => {
  const userId = req.params.userId;
  const productId = req.body.productId;

  try {
    const user = await User.findById(userId).populate("cart");
    const product = await Product.findById(productId);
    if (!product) return res.status(404).json({ message: "Product not found" });

    let lastOrder = user.cart[user.cart.length - 1];

    if (!lastOrder || lastOrder.orderStatus !== "Pending") {
      // create a new order if no pending order exists
      const newOrder = new Order({
        userId: user._id,
        products: [product._id],
        totalAmount: product.price,
        orderStatus: "Pending"
      });

      await newOrder.save();

      user.cart.push(newOrder._id);
      await user.save();

      return res.status(200).json({ message: "New order created and product added", order: newOrder });
    }

    // add product to existing order
    lastOrder.products.push(product._id);
    lastOrder.totalAmount = await calculateTotalAmount(lastOrder.products);
    await lastOrder.save();

    res.status(200).json({ message: "Product added to existing order", order: lastOrder });

  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports.checkout = async (req, res) => {
  const userId = req.params.userId;

  try {
    const user = await User.findById(userId).populate("cart");
    const lastOrder = user.cart[user.cart.length - 1];

    if (!lastOrder || lastOrder.orderStatus !== "Pending") {
      return res.status(400).json({ message: "No active order to checkout" });
    }

    lastOrder.orderStatus = "Confirmed";
    await lastOrder.save();

    res.status(200).json({ message: "Checkout complete", order: lastOrder });

  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};


//  <script>
//     fetch("http://localhost:3000/api/orders")
//       .then(res => res.json())
//       .then(data => {
//         const container = document.getElementById("orders-container");

//         data.forEach(order => {
//           const card = document.createElement("div");
//           card.className = "card";
//         card.innerHTML = `
//   <h3>Products:</h3>
//   <ul>
//     ${(order.productNames || []).map(name => `<li>${name}</li>`).join("")}
//   </ul>
//   <p>User: ${order.userName || "N/A"}</p>
//   <p>Amount: ${order.totalAmount}</p>
// `;

//           container.appendChild(card);
//         });
//       })
//       .catch(err => console.error("Error:", err));
//   </script>
