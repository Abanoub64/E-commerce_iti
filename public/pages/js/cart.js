document.addEventListener("DOMContentLoaded", async () => {
  const cartList = document.getElementById("cartList");
  const checkoutBtn = document.getElementById("checkoutBtn");
  const clearBtn = document.getElementById("clearCartBtn");

  const cart = JSON.parse(localStorage.getItem("cart") || "[]");

  if (cart.length === 0) {
    cartList.innerHTML = '<p class="text-center">🛒 No items in cart.</p>';
    checkoutBtn.style.display = "none";
    clearBtn.style.display = "none";
    return;
  }

  try {
    const res = await fetch("https://api.escuelajs.co/api/v1/products");
    const products = await res.json();

    const selectedProducts = products.filter((p) => cart.includes(p.id));

    let total = 0;
    cartList.innerHTML = "";

    selectedProducts.forEach((product) => {
      total += product.price;

      const col = document.createElement("div");
      col.className = "col-md-4 mb-3";
      col.innerHTML = `
        <div class="card p-3 shadow h-100">
          <img src="${product.images[0]}" 
               style="width:100%;height:180px;object-fit:contain;border-radius:8px"
               alt="${product.title}" loading="lazy" />
          <div class="card-body p-0 mt-2">
            <h5 class="card-title">${product.title}</h5>
            <p class="card-text text-success"><strong>$${product.price}</strong></p>
            <p class="card-text text-muted small">${product.description
              .slice(0, 80)}...</p>
          </div>
        </div>
      `;
      cartList.appendChild(col);
    });

    const totalCol = document.createElement("div");
    totalCol.className = "col-12 mt-3";
    totalCol.innerHTML = `
      <div class="card bg-light">
        <div class="card-body text-center">
          <h5>Total Items: ${selectedProducts.length}</h5>
          <h4 class="text-success">Total Amount: $${total.toFixed(2)}</h4>
        </div>
      </div>
    `;
    cartList.appendChild(totalCol);

    // Clear Cart
    clearBtn.addEventListener("click", () => {
      localStorage.removeItem("cart");
      location.reload();
    });

    // Checkout
    checkoutBtn.addEventListener("click", () => {
      alert("✅ Checkout successful!");
      localStorage.removeItem("cart");
      location.reload();
    });

  } catch (error) {
    console.error("Error loading cart:", error);
    cartList.innerHTML =
      '<p class="text-danger text-center">❌ Error loading cart.</p>';
  }
});
