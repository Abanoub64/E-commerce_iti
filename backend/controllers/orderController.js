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

    res.json({
      orderId: getOrder._id,
      productNames: getOrder.products.map((p) => p.name),
      userName: getOrder.userId.userName,
      totalAmount: getOrder.totalAmount,
    });
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
