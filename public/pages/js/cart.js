document.addEventListener("DOMContentLoaded", async () => {
  const cartList = document.getElementById("cartList");
  const checkoutBtn = document.getElementById("checkoutBtn");
  const orderBtn = document.getElementById("orders");
  const orderList = document.getElementById("orderList");
  const cart = JSON.parse(localStorage.getItem("cart") || "[]");

  
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

  // FIXED: Direct order placement since user data is already available
  checkoutBtn.addEventListener("click", async () => {
    const userId = localStorage.getItem("userId");

    if (!userId) {
      alert("Please login first.");
      window.location.href = "index.html";
      return;
    }

    if (cart.length === 0) {
      alert("Your cart is empty!");
      return;
    }

    try {
      // Show loading state
      const originalText = checkoutBtn.textContent;
      checkoutBtn.textContent = "Processing...";
      checkoutBtn.disabled = true;

      // Create order object with user's existing data
      const order = {
        userId: userId,
        products: cart,
        status: "pending",
        createdAt: new Date().toISOString(),
      };

      // Send order to server
      const response = await fetch("https://e-commerce-iti-wfr1.onrender.com/orders", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(order),
      });

      if (response.ok) {
        const orderData = await response.json();
        
        // Clear cart
        localStorage.removeItem("cart");
        
        // Show success message with order ID
        alert(`Order placed successfully! Order ID: ${orderData.order._id}\nYour order will be delivered to your registered address.`);
        
        // Refresh the page to show empty cart
        location.reload();
      } else {
        const errorData = await response.json();
        console.error("Checkout error:", errorData);
        alert("Failed to place order. Please try again.");
        
        // Reset button
        checkoutBtn.textContent = originalText;
        checkoutBtn.disabled = false;
      }
    } catch (error) {
      console.error("Error placing order:", error);
      alert("An error occurred while placing your order. Please try again.");
      
      // Reset button
      checkoutBtn.textContent = originalText;
      checkoutBtn.disabled = false;
    }
  });

  // Display orders functionality
  orderBtn?.addEventListener("click", async () => {
    try {
      const userId = localStorage.getItem("userId");

      const response = await fetch("https://e-commerce-iti-wfr1.onrender.com/orders");
      const orders = await response.json();

      orderList.innerHTML = "";

      if (orders.length === 0) {
        orderList.innerHTML = "<p>No orders found.</p>";
        return;
      }

      const userOrders = orders.filter((order) => order.userId === userId);

      if (userOrders.length === 0) {
        orderList.innerHTML = "<p>You have no orders yet.</p>";
        return;
      }

      // Show orders with better formatting
      userOrders.forEach(async (order) => {
        const card = document.createElement("div");
        card.className = "card p-3 my-2 shadow";

        // Get product details for the order
        try {
          const productsRes = await fetch("https://e-commerce-iti-wfr1.onrender.com/products");
          const allProducts = await productsRes.json();
          const orderProducts = allProducts.filter(p => order.products.includes(p._id));
          
          const productsList = orderProducts.map(p => `<li>${p.name} - $${p.price}</li>`).join("");
          const totalAmount = orderProducts.reduce((sum, p) => sum + p.price, 0);

          card.innerHTML = `
            <h5>Order ID: ${order._id}</h5>
            <p><strong>Status:</strong> <span class="badge ${order.status === 'pending' ? 'bg-warning' : 'bg-success'}">${order.status}</span></p>
            <p><strong>Date:</strong> ${new Date(order.createdAt).toLocaleString()}</p>
            <p><strong>Total Amount:</strong> $${totalAmount}</p>
            <p><strong>Products:</strong></p>
            <ul>${productsList}</ul>
          `;
        } catch (err) {
          card.innerHTML = `
            <h5>Order ID: ${order._id}</h5>
            <p><strong>Status:</strong> ${order.status}</p>
            <p><strong>Date:</strong> ${new Date(order.createdAt).toLocaleString()}</p>
            <p><strong>Products:</strong> ${order.products.length} items</p>
          `;
        }

        orderList.appendChild(card);
      });
    } catch (error) {
      console.error("Error fetching orders:", error);
      orderList.innerHTML = "<p>Error loading orders. Please try again later.</p>";
    }
  });
});