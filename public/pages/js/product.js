document.addEventListener("DOMContentLoaded", () => {
  // ----------- User Auth -----------
  const userId = localStorage.getItem("userId");
  const userName = localStorage.getItem("userName");
  const userLevel = localStorage.getItem("userLevel");

  const userGreeting = document.getElementById("userGreeting");
  const adminBtn = document.getElementById("adminBtn");
  const logoutBtn = document.getElementById("logoutBtn");
  const cartBtn = document.getElementById("cart");

  if (userId && userName) {
    userGreeting.textContent = `Hello, ${userName}!`;
    userGreeting.classList.remove("d-none");

    if (userLevel === "superuser") {
      adminBtn.classList.remove("d-none");
    }
  }

  logoutBtn.addEventListener("click", () => {
    fetch("https://api.escuelajs.co/api/v1/logout", {
      method: "GET",
      credentials: "include",
    })
      .then(() => {
        localStorage.removeItem("userId");
        localStorage.removeItem("userName");
        localStorage.removeItem("userLevel");
        window.location.href = "index.html";
      })
      .catch((err) => console.error("Logout error:", err));
  });

  cartBtn.addEventListener("click", () => {
    window.location.href = "../cart.html";
  });

  adminBtn?.addEventListener("click", () => {
    window.location.href = "../admin/admin.html";
  });

  // ----------- Add To Cart -----------
  async function handleAddToCart(productId, button) {
    const userId = localStorage.getItem("userId");
    if (!userId) {
      alert("Please login first!");
      window.location.href = "index.html";
      return;
    }

    function showAlert(message, type) {
      const alertDiv = document.createElement("div");
      alertDiv.className = `alert alert-${type} position-fixed top-0 end-0 m-3`;
      alertDiv.textContent = message;
      alertDiv.style.zIndex = "9999";
      document.body.appendChild(alertDiv);
      setTimeout(() => alertDiv.remove(), 3000);
    }

    const originalHTML = button.innerHTML;
    button.innerHTML =
      '<span class="spinner-border spinner-border-sm me-1"></span> Adding...';
    button.disabled = true;

    try {
      let cart = JSON.parse(localStorage.getItem("cart") || "[]");

      if (!cart.includes(productId)) {
        cart.push(productId);
        localStorage.setItem("cart", JSON.stringify(cart));
      }

      button.innerHTML = '<i class="bi bi-check-circle me-1"></i> Added!';
      button.classList.remove("btn-primary");
      button.classList.add("btn-success");

      showAlert("Product added to cart!", "success");

      setTimeout(() => {
        button.innerHTML = originalHTML;
        button.classList.remove("btn-success");
        button.classList.add("btn-primary");
        button.disabled = false;
      }, 2000);
    } catch (error) {
      button.innerHTML = originalHTML;
      button.disabled = false;
      showAlert("Failed to add product to cart.", "danger");
      console.error("Error in handleAddToCart:", error);
    }
  }

  // ----------- Fetch & Render Products -----------
  const API_URL = "https://api.escuelajs.co/api/v1/products";
  
  fetch(API_URL)
    .then((response) => response.json())
    .then((data) => {
      const productsSection = document.getElementById("productList");
      productsSection.innerHTML = "";

      // Filter out products with broken or generic image URLs
      const validProducts = data.filter(product => {
        const imageUrl = product.images?.[0] || "";
        // Check for common broken placeholder URLs and general URL validity
        return imageUrl && !imageUrl.includes("placeimg.com") && !imageUrl.includes("lorempixel.com") && (imageUrl.startsWith("http") || imageUrl.startsWith("https"));
      });

      if (!Array.isArray(validProducts) || validProducts.length === 0) {
        productsSection.innerHTML =
          '<div class="col-12 text-center"><p class="text-info">No products with valid images found.</p></div>';
        return;
      }

      validProducts.forEach((product) => {
        const col = document.createElement("div");
        col.className = "col-md-4 d-flex mb-4";

        const card = document.createElement("div");
        card.className = "card shadow border p-3 d-flex flex-column w-100";
        card.dataset.id = product.id;

        // Title
        const title = document.createElement("p");
        title.className = "productTitle";
        title.innerHTML = `<strong>${product.title}</strong>`;
        card.appendChild(title);

        // Image
        const img = document.createElement("img");
        img.src = product.images[0];
        img.alt = product.title;
        img.loading = "lazy";
        img.style.cssText =
          "width: 100%; height: 200px; object-fit: contain; border-radius: 8px;";

        // Fallback placeholder
        img.onerror = function () {
          console.log("Image failed:", this.src);
          this.src =
            "data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMjAwIiBoZWlnaHQ9IjIwMCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48cmVjdCB3aWR0aD0iMTAwJSIgaGVpZ2h0PSIxMDAlIiBmaWxsPSIjRjBGMEYwIi8+PHRleHQgeD0iNTAlIiB5PSI1MCUiIGZvbnQtZmFtaWx5PSJBcmlhbCIgZm9udC1zaXplPSIxMiIgZmlsbD0iIzY2NiIgdGV4dC1hbmNob3I9Im1pZGRsZSIgZHk9Ii4zZW0iPk5vIEltYWdlPC90ZXh0Pjwvc3ZnPg==";
        };
        card.appendChild(img);

        // Price
        const price = document.createElement("p");
        price.className = "mt-2";
        price.innerHTML = `<strong>Price:</strong> $${product.price}`;
        card.appendChild(price);

        // Description
        const desc = document.createElement("p");
        desc.className = "text-muted";
        desc.textContent = product.description
          ? product.description.slice(0, 100) + "..."
          : "No description available";
        card.appendChild(desc);

        // Stock (the new API doesn't have a stock field)
        const stock = document.createElement("p");
        stock.className = "text-info";
        stock.innerHTML = `<strong>Stock:</strong> Available`;
        card.appendChild(stock);

        // Button
        const btnWrapper = document.createElement("div");
        btnWrapper.className = "mt-auto";
        const button = document.createElement("button");
        button.className = "btn btn-sm btn-primary productBtn w-100";
        button.textContent = "Add To Cart";
        btnWrapper.appendChild(button);
        card.appendChild(btnWrapper);

        col.appendChild(card);
        productsSection.appendChild(col);
      });

      // Event delegation for Add to Cart
      document.getElementById("productList").addEventListener("click", (e) => {
        const button = e.target.closest(".productBtn");
        if (button && !button.disabled) {
          const productId = button.closest(".card").dataset.id;
          handleAddToCart(productId, button);
        }
      });
    })
    .catch((error) => {
      console.error("Error fetching products:", error);
      document.getElementById("productList").innerHTML =
        '<div class="col-12 text-center"><p class="text-danger">Error loading products. The server is not responding. Please try again later.</p></div>';
    });
});