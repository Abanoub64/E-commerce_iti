document.addEventListener("DOMContentLoaded", async () => {
  const cartList = document.getElementById("cartList");
  const checkoutBtn = document.getElementById("checkoutBtn");
  const clearCartBtn = document.getElementById("clearCartBtn"); // زرار جديد
  const orderBtn = document.getElementById("orders");
  const orderList = document.getElementById("orderList");
  const cart = JSON.parse(localStorage.getItem("cart") || "[]");

  // -------- Functions --------
  function getValidImageUrl(imageUrl) {
    if (imageUrl && (imageUrl.startsWith("http://") || imageUrl.startsWith("https://"))) {
      return imageUrl;
    }
    return "https://via.placeholder.com/300x200/cccccc/666666?text=No+Image";
  }

  function handleImageError(imgElement) {
    imgElement.onerror = function () {
      this.src = "https://via.placeholder.com/300x200/cccccc/666666?text=Image+Not+Found";
      this.onerror = null;
    };
  }

  // -------- Render Cart --------
  if (cart.length === 0) {
    cartList.innerHTML = `
      <div class="col-12 text-center">
        <p class="h4 text-muted">No items in cart.</p>
        <a href="product.html" class="btn btn-primary">Continue Shopping</a>
      </div>`;
    checkoutBtn.style.display = "none";
    clearCartBtn.style.display = "none";
  } else {
    try {
      const res = await fetch("https://e-commerce-iti-wfr1.onrender.com/products");
      const products = await res.json();
      const selectedProducts = products.filter((product) => cart.includes(product._id));
      let totalAmount = 0;

      if (selectedProducts.length === 0) {
        cartList.innerHTML = '<div class="col-12 text-center"><p class="h4 text-muted">Cart items not found.</p></div>';
        checkoutBtn.style.display = "none";
        clearCartBtn.style.display = "none";
        return;
      }

      selectedProducts.forEach((product) => {
        totalAmount += product.price;

        const col = document.createElement("div");
        col.className = "col-md-4 mb-3";

        const validImageUrl = getValidImageUrl(product.image);

        col.innerHTML = `
          <div class="card p-3 shadow h-100">
            <img src="${validImageUrl}" 
                 style="width:100%; height:180px; object-fit:contain; border-radius: 8px;" 
                 alt="${product.name}"
                 loading="lazy" />
            <div class="card-body p-0 mt-2">
              <h5 class="card-title">${product.name}</h5>
              <p class="card-text text-success"><strong>$${product.price}</strong></p>
              <p class="card-text text-muted small">${product.description ? product.description.slice(0, 80) + "..." : ""}</p>
            </div>
          </div>
        `;

        const img = col.querySelector("img");
        handleImageError(img);

        cartList.appendChild(col);
      });

      const totalCol = document.createElement("div");
      totalCol.className = "col-12 mt-3";
      totalCol.innerHTML = `
        <div class="card bg-light">
          <div class="card-body text-center">
            <h5>Total Items: ${selectedProducts.length}</h5>
            <h4 class="text-success">Total Amount: $${totalAmount.toFixed(2)}</h4>
          </div>
        </div>`;
      cartList.appendChild(totalCol);

    } catch (error) {
      console.error("Error loading cart products:", error);
      cartList.innerHTML = '<div class="col-12 text-center"><p class="text-danger">Error loading cart. Please try again.</p></div>';
    }
  }

  // -------- Checkout --------
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
      const originalText = checkoutBtn.textContent;
      checkoutBtn.innerHTML = '<span class="spinner-border spinner-border-sm me-2"></span>Processing...';
      checkoutBtn.disabled = true;

      const order = {
        userId: userId,
        products: cart,
        status: "pending",
        createdAt: new Date().toISOString(),
      };

      const response = await fetch("https://e-commerce-iti-wfr1.onrender.com/orders", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(order),
      });

      if (response.ok) {
        const orderData = await response.json();
        localStorage.removeItem("cart");
        alert(`✅ Order placed successfully!\nOrder ID: ${orderData.order._id}`);
        location.reload();
      } else {
        const errorData = await response.json();
        console.error("Checkout error:", errorData);
        alert("❌ Failed to place order.");
        checkoutBtn.textContent = originalText;
        checkoutBtn.disabled = false;
      }
    } catch (error) {
      console.error("Error placing order:", error);
      alert("❌ An error occurred while placing your order.");
      checkoutBtn.textContent = "Checkout";
      checkoutBtn.disabled = false;
    }
  });

  // -------- Clear Cart --------
  clearCartBtn?.addEventListener("click", () => {
    if (confirm("Are you sure you want to clear your cart?")) {
      localStorage.removeItem("cart");
      cartList.innerHTML = `
        <div class="col-12 text-center">
          <p class="h4 text-muted">No items in cart.</p>
          <a href="product.html" class="btn btn-primary">Continue Shopping</a>
        </div>`;
      checkoutBtn.style.display = "none";
      clearCartBtn.style.display = "none";
    }
  });

  // -------- Orders --------
  orderBtn?.addEventListener("click", async () => {
    try {
      const userId = localStorage.getItem("userId");
      orderList.innerHTML = '<div class="text-center"><div class="spinner-border" role="status"></div><p>Loading orders...</p></div>';

      const response = await fetch("https://e-commerce-iti-wfr1.onrender.com/orders");
      const orders = await response.json();
      orderList.innerHTML = "";

      if (orders.length === 0) {
        orderList.innerHTML = "<p class='text-center text-muted'>No orders found in the system.</p>";
        return;
      }

      const userOrders = orders.filter((order) => order.userId === userId);
      if (userOrders.length === 0) {
        orderList.innerHTML = "<p class='text-center text-muted'>You have no orders yet.</p>";
        return;
      }

      for (const order of userOrders) {
        const card = document.createElement("div");
        card.className = "card p-3 my-3 shadow";

        try {
          const productsRes = await fetch("https://e-commerce-iti-wfr1.onrender.com/products");
          const allProducts = await productsRes.json();
          const orderProducts = allProducts.filter((p) => order.products.includes(p._id));

          const productsList = orderProducts.map(
            (p) => `<li class="d-flex justify-content-between"><span>${p.name}</span><span class="text-success">$${p.price}</span></li>`
          ).join("");

          const totalAmount = orderProducts.reduce((sum, p) => sum + p.price, 0);

          card.innerHTML = `
            <div class="row">
              <div class="col-md-6">
                <h5>Order ID: <code>${order._id}</code></h5>
                <p><strong>Status:</strong> <span class="badge ${order.status === "pending" ? "bg-warning text-dark" : "bg-success"}">${order.status}</span></p>
                <p><strong>Date:</strong> ${new Date(order.createdAt).toLocaleString()}</p>
                <p><strong>Total Amount:</strong> <span class="text-success h5">$${totalAmount.toFixed(2)}</span></p>
              </div>
              <div class="col-md-6">
                <p><strong>Products (${orderProducts.length} items):</strong></p>
                <ul class="list-unstyled border p-2 rounded bg-light">${productsList}</ul>
              </div>
            </div>`;
        } catch (err) {
          card.innerHTML = `
            <h5>Order ID: <code>${order._id}</code></h5>
            <p><strong>Status:</strong> <span class="badge ${order.status === "pending" ? "bg-warning text-dark" : "bg-success"}">${order.status}</span></p>
            <p><strong>Date:</strong> ${new Date(order.createdAt).toLocaleString()}</p>
            <p><strong>Products:</strong> ${order.products.length} items</p>
            <p class="text-muted small">Product details loading failed</p>`;
        }

        orderList.appendChild(card);
      }
    } catch (error) {
      console.error("Error fetching orders:", error);
      orderList.innerHTML = "<p class='text-center text-danger'>❌ Error loading orders. Please try again later.</p>";
    }
  });
});
