document.addEventListener("DOMContentLoaded", () => {
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

  logoutBtn?.addEventListener("click", () => {
    localStorage.removeItem("userId");
    localStorage.removeItem("userName");
    localStorage.removeItem("userLevel");
    window.location.href = "index.html";
  });

  cartBtn?.addEventListener("click", () => {
    window.location.href = "cart.html";
  });

  adminBtn?.addEventListener("click", () => {
    window.location.href = "admin.html";
  });

  // ----------- Add To Cart -----------
  function handleAddToCart(productId, button) {
    let cart = JSON.parse(localStorage.getItem("cart") || "[]");

    if (!cart.includes(productId)) {
      cart.push(productId); // نخزن id المنتج
      localStorage.setItem("cart", JSON.stringify(cart));
    }

    button.innerHTML = '<i class="bi bi-check-circle me-1"></i> Added!';
    button.classList.remove("btn-primary");
    button.classList.add("btn-success");
    button.disabled = true;

    setTimeout(() => {
      button.innerHTML = "Add To Cart";
      button.classList.remove("btn-success");
      button.classList.add("btn-primary");
      button.disabled = false;
    }, 2000);
  }

  // ----------- Fetch & Render Products -----------
  const API_URL = "https://api.escuelajs.co/api/v1/products";

  fetch(API_URL)
    .then((res) => res.json())
    .then((data) => {
      const productsSection = document.getElementById("productList");
      productsSection.innerHTML = "";

      data.forEach((product) => {
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
          "width:100%; height:200px; object-fit:contain; border-radius:8px;";
        img.onerror = function () {
          this.src =
            "https://via.placeholder.com/300x200/cccccc/666666?text=No+Image";
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
        if (button) {
          const productId = parseInt(
            button.closest(".card").dataset.id,
            10
          );
          handleAddToCart(productId, button);
        }
      });
    })
    .catch((error) => {
      console.error("Error fetching products:", error);
      document.getElementById("productList").innerHTML =
        '<div class="col-12 text-center"><p class="text-danger">Error loading products.</p></div>';
    });
});
