// const userId = "688d9c5bf35ad4dee9fbeb04";

// const totalPriceSpan = document.querySelector(".total-price");
// const totalItemsSpan = document.querySelector(".total-items");

// let totalPrice = 0;
// let totalItems = 0;

// document.addEventListener("DOMContentLoaded", async () => {
//   try {
//     const userRes = await fetch(`http://localhost:3000/api/users/${userId}`);
//     const userData = await userRes.json();

//     const lastOrderId = userData.cart[userData.cart.length - 1];

//     const orderRes = await fetch(
//       `http://localhost:3000/api/orders/${lastOrderId}`
//     );
//     const order = await orderRes.json();

//     const container = document.getElementById("cart-items");
//     container.innerHTML = "";

//     order.products.forEach((product) => {
//       container.innerHTML += `
//         <div class="cart-item" data-price="${product.price}">
//           <p>${product.name}</p>
//           <p class="item-price">${product.price}</p>
//           <button class="decrease">-</button>
//           <span class="quantity">1</span>
//           <button class="increase">+</button>
//           <button class="remove-item">Remove</button>
//         </div>
//       `;
//     });

//     initCartEvents();
//     updateCart();
//   } catch (error) {
//     console.error("Error loading cart:", error);
//   }
// });

// function updateCart() {
//   totalPrice = 0;
//   totalItems = 0;
//   const cartItems = document.querySelectorAll(".cart-item");

//   cartItems.forEach((item) => {
//     const price = parseInt(item.getAttribute("data-price"));
//     const quantity = parseInt(item.querySelector(".quantity").textContent);
//     totalPrice += price * quantity;
//     totalItems += quantity;
//   });

//   totalPriceSpan.textContent = totalPrice;
//   totalItemsSpan.textContent = totalItems;
// }

// function initCartEvents() {
//   const increaseButtons = document.querySelectorAll(".increase");
//   const decreaseButtons = document.querySelectorAll(".decrease");
//   const removeButtons = document.querySelectorAll(".remove-item");
//   const quantitySpans = document.querySelectorAll(".quantity");

//   increaseButtons.forEach((button, index) => {
//     button.addEventListener("click", () => {
//       let quantity = parseInt(quantitySpans[index].textContent);
//       quantity++;
//       quantitySpans[index].textContent = quantity;
//       updateCart();
//     });
//   });

//   decreaseButtons.forEach((button, index) => {
//     button.addEventListener("click", () => {
//       let quantity = parseInt(quantitySpans[index].textContent);
//       if (quantity > 1) {
//         quantity--;
//         quantitySpans[index].textContent = quantity;
//         updateCart();
//       }
//     });
//   });

//   removeButtons.forEach((button, index) => {
//     button.addEventListener("click", () => {
//       const cartItem = button.closest(".cart-item");
//       cartItem.remove();
//       updateCart();
//     });
//   });
// }

// document.getElementById("checkout-btn").addEventListener("click", async () => {
//   try {
//     const res = await fetch(`http://localhost:3000/api/checkout/${userId}`, {
//       method: "POST",
//     });

//     const data = await res.json();
//     alert("✔️ Checkout completed!");
//     console.log(data);
//   } catch (err) {
//     console.error("❌ Checkout failed:", err);
//     alert("Checkout failed.");
//   }
// });
document.addEventListener("DOMContentLoaded", async () => {
  const cartList = document.getElementById("cartList");
  const checkoutBtn = document.getElementById("checkoutBtn");
  const orderBtn = document.getElementById("orders");
  const orderList = document.getElementById("orderList");
  const cart = JSON.parse(localStorage.getItem("cart") || "[]");

  // 📦 عرض محتويات الكارت
  if (cart.length === 0) {
    cartList.innerHTML = "<p>No items in cart.</p>";
    checkoutBtn.style.display = "none";
  } else {
    try {
      const res = await fetch("https://e-commerce-iti-wfr1.onrender.com/products");
      const products = await res.json();

      const selectedProducts = products.filter((product) => cart.includes(product._id));

      selectedProducts.forEach((product) => {
        const col = document.createElement("div");
        col.className = "col-md-4 mb-3";

        col.innerHTML = `
          <div class="card p-2 shadow">
            <img src="${product.image}" style="width:100%; height:180px; object-fit:contain;" />
            <h5 class="mt-2">${product.name}</h5>
            <p><strong>$${product.price}</strong></p>
          </div>
        `;

        cartList.appendChild(col);
      });
    } catch (error) {
      console.error("Error loading cart products:", error);
    }
  }

  // 🛒 إرسال الأوردر
  checkoutBtn.addEventListener("click", async () => {
    const userId = localStorage.getItem("userId");

    if (!userId) {
      alert("Please login first.");
      window.location.href = "index.html";
      return;
    }

    const order = {
      userId: userId,
      products: cart,
      status: "pending",
      createdAt: new Date().toISOString(),
    };

    try {
      const response = await fetch("https://e-commerce-iti-wfr1.onrender.com/orders", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(order),
      });

      if (response.ok) {
        alert("Order placed successfully!");
        localStorage.removeItem("cart");
        window.location.href = "index.html";
      } else {
        const errorData = await response.json();
        console.error("Checkout error:", errorData);
        alert("Failed to place order.");
      }
    } catch (error) {
      console.error("Error sending order:", error);
    }
  });

  // 📋 عرض الطلبات لما المستخدم يضغط على Orders
  orderBtn?.addEventListener("click", async () => {
    try {
      const userId = localStorage.getItem("userId");

      if (!userId) {
        alert("Please login first.");
        window.location.href = "index.html";
        return;
      }

      const response = await fetch("https://e-commerce-iti-wfr1.onrender.com/orders");
      const orders = await response.json();

      orderList.innerHTML = "";

      if (orders.length === 0) {
        orderList.innerHTML = "<p>No orders found.</p>";
        return;
      }

      // عرض الطلبات الخاصة فقط بالمستخدم الحالي
      const userOrders = orders.filter((order) => order.userId === userId);

      if (userOrders.length === 0) {
        orderList.innerHTML = "<p>You have no orders yet.</p>";
        return;
      }

      userOrders.forEach((order) => {
        const card = document.createElement("div");
        card.className = "card p-3 my-2 shadow";

        card.innerHTML = `
          <h5>Order ID: ${order._id}</h5>
          <p><strong>Status:</strong> ${order.status}</p>
          <p><strong>Date:</strong> ${new Date(order.createdAt).toLocaleString()}</p>
          <p><strong>Products:</strong></p>
          <ul>${order.products.map(p => `<li>${p}</li>`).join("")}</ul>
        `;

        orderList.appendChild(card);
      });
    } catch (error) {
      console.error("Error fetching orders:", error);
    }
  });
});
