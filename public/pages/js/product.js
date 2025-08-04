// // const productContainer = document.getElementById("productContainer");
// // const searchInput = document.getElementById("searchInput");
// // let products = [];
// // let cart = [];
// // const apiUrl = "https://e-commerce-iti-wfr1.onrender.com/";

// // async function fetchProducts() {
// //   const res = await fetch(`${apiUrl}products`);
// //   products = await res.json();
// //   displayProducts(products);
// // }

// // function displayProducts(list) {
// //   productContainer.innerHTML = "";
// //   list.forEach((product) => {
// //     const col = document.createElement("div");
// //     col.className = "col-md-4";
// //     col.innerHTML = `
// //             <div class="card h-100">
// //               <img src="${product.image}" class="card-img-top" alt="..." />
// //               <div class="card-body">
// //                 <h5 class="card-title">${product.name}</h5>
// //                 <p class="card-text">${product.description}</p>
// //                 <p class="fw-bold">${product.price} EGP</p>
// //                 <button class="btn btn-success" onclick='addToCart(${JSON.stringify(
// //                   product
// //                 )})'>Add to Cart</button>
// //               </div>
// //             </div>
// //           `;
// //     productContainer.appendChild(col);
// //   });
// // }

// // function addToCart(product) {
// //   cart.push(product);
// //   alert("Added to cart ✅");
// // }

// // function viewCart() {
// //   const cartItems = document.getElementById("cartItems");
// //   if (cart.length === 0) {
// //     cartItems.innerHTML = `<p>No items in the cart.</p>`;
// //   } else {
// //     cartItems.innerHTML = cart
// //       .map(
// //         (item, i) => `
// //               <div class="d-flex justify-content-between border-bottom py-2">
// //                 <div>
// //                   <strong>${item.name}</strong><br />
// //                   ${item.price} EGP
// //                 </div>
// //                 <button class="btn btn-sm btn-danger" onclick="removeFromCart(${i})">Remove</button>
// //               </div>
// //             `
// //       )
// //       .join("");
// //   }
// //   new bootstrap.Modal(document.getElementById("cartModal")).show();
// // }

// // function removeFromCart(index) {
// //   cart.splice(index, 1);
// //   viewCart();
// // }

// // searchInput.addEventListener("input", () => {
// //   const filtered = products.filter((p) =>
// //     p.name.toLowerCase().includes(searchInput.value.toLowerCase())
// //   );
// //   displayProducts(filtered);
// // });

// // document.getElementById("logoutBtn").addEventListener("click", async () => {
// //   await fetch(`${apiUrl}logout`, {
// //     method: "GET",
// //     credentials: "include",
// //   });

// //   window.location.href = "../index.html";
// // });

// // function getCookie(name) {
// //   const value = `; ${document.cookie}`;
// //   const parts = value.split(`; ${name}=`);
// //   if (parts.length === 2) return parts.pop().split(";").shift();
// // }

// // const userLevel = getCookie("userLevel");
// // if (userLevel === "superuser") {
// //   document.getElementById("adminBtn").classList.remove("d-none");
// // }
// // fetchProducts();

// document.addEventListener("DOMContentLoaded", () => {
//   // Fetch products from API
//   fetch("https://e-commerce-iti-wfr1.onrender.com/products")
//     .then((response) => response.json())
//     .then((data) => {
//       const productsSection = document.getElementById("productList");
//       // Clear existing sample products
//       productsSection.innerHTML = "";

//       data.forEach((product) => {
//         const col = document.createElement("div");
//         col.className = "col-md-4 d-flex";

//         const card = document.createElement("div");
//         card.className = "card shadow border p-3 d-flex flex-column w-100";

//         card.innerHTML = `
//     <p class="productTitle"><strong>${product.name}</strong></p>
//     <img src="${
//       product.image
//     }" style="width: 100%; height: 200px; object-fit: contain;" alt="">
//     <p><strong>Price:</strong> $${product.price}</p>
//     <p>${product.description.slice(0, 100)}...</p>
//     <div class="mt-auto">
//       <button class="btn btn-sm btn-primary productBtn w-100">Add To Cart</button>
//     </div>
//   `;

//         col.appendChild(card);
//         productsSection.appendChild(col);
//       });
//     })
//     .catch((error) => console.error("Error fetching products:", error));
// });

// // async function handleAddToCart(button) {
// //   const productId = button.dataset.id;
// //   const userId = "688d9c5bf35ad4dee9fbeb04";
// //   const original = button.innerHTML;

// //   button.innerHTML = '<i class="fas fa-spinner fa-spin me-1"></i>Adding...';
// //   button.disabled = true;

// //   try {
// //     const res = await fetch(`http://localhost:3000/cart/${userId}`, {
// //       method: "POST",
// //       headers: { "Content-Type": "application/json" },
// //       body: JSON.stringify({ productId , userId })
// //     });

// //     if (!res.ok) throw new Error("Request failed");

// //     button.innerHTML = '<i class="fas fa-check me-1"></i>Added!';
// //     button.style.background = 'linear-gradient(135deg, #4facfe 0%, #00f2fe 100%)';
// //   } catch (err) {
// //     console.error("❌ Error adding to cart:", err);
// //     button.innerHTML = '<i class="fas fa-times me-1"></i>Error';
// //     button.style.background = 'linear-gradient(135deg, #f093fb 0%, #f5576c 100%)';
// //   }

// //   setTimeout(() => {
// //     button.innerHTML = original;
// //     button.style.background = 'var(--primary-gradient)';
// //     button.disabled = false;
// //   }, 2000);
// // }

document.addEventListener("DOMContentLoaded", () => {
  // Check user authentication and display user info
  const userId = localStorage.getItem("userId");
  const userName = localStorage.getItem("userName");
  const userLevel = localStorage.getItem("userLevel");

  const userGreeting = document.getElementById("userGreeting");
  const adminBtn = document.getElementById("adminBtn");
  const logoutBtn = document.getElementById("logoutBtn");

  // Display user info if logged in
  if (userId && userName) {
    userGreeting.textContent = `Hello, ${userName}!`;
    userGreeting.classList.remove("d-none");

    // Show admin button if superuser
    if (userLevel === "superuser") {
      adminBtn.classList.remove("d-none");
    }
  }

  // Logout functionality
  logoutBtn.addEventListener("click", () => {
    fetch("https://e-commerce-iti-wfr1.onrender.com/logout", {
      method: "GET",
      credentials: "include",
    })
      .then(() => {
        // Clear localStorage
        localStorage.removeItem("userId");
        localStorage.removeItem("userName");
        localStorage.removeItem("userLevel");

        // Redirect to login page
        window.location.href = "index.html";
      })
      .catch((err) => console.error("Logout error:", err));
  });

  // Admin button functionality
  adminBtn?.addEventListener("click", () => {
    window.location.href = "../admin/admin.html"; // Replace with your admin page
  });

  async function handleAddToCart(productId, button) {
  const userId = localStorage.getItem("userId");
  if (!userId) {
    alert("Please login first!");
    window.location.href = "index.html";
    return;
  }

  const originalText = button.innerHTML;
  
  // عرض حالة التحميل
  button.innerHTML = '<span class="spinner-border spinner-border-sm me-1"></span> Adding...';
  button.disabled = true;

  try {
    // 1. الحصول على السلة الحالية من localStorage أو إنشاء سلة جديدة
    let cart = JSON.parse(localStorage.getItem("cart") || [];
    
    // 2. إضافة productId إلى السلة (حتى لو متكرر)
    cart.push(productId);
    
    // 3. حفظ السلة المحدثة في localStorage
    localStorage.setItem("cart", JSON.stringify(cart));
    
    // 4. إرسال الطلب إلى الخادم (اختياري)
   
    // تحديث واجهة المستخدم
    button.innerHTML = '<i class="bi bi-check-circle me-1"></i> Added!';
    button.classList.remove("btn-primary");
    button.classList.add("btn-success");
    
    // عرض تنبيه
    showAlert("Product added to cart!", "success");
  } catch (error) {
    console.error("Error:", error);
    button.innerHTML = '<i class="bi bi-x-circle me-1"></i> Error';
    button.classList.remove("btn-primary");
    button.classList.add("btn-danger");
    showAlert("Failed to add product", "danger");
  } finally {
    setTimeout(() => {
      button.innerHTML = originalText;
      button.disabled = false;
      button.classList.remove("btn-success", "btn-danger");
      button.classList.add("btn-primary");
    }, 2000);
  }
}

  // Fetch and display products
  fetch("https://e-commerce-iti-wfr1.onrender.com/products")
    .then((response) => response.json())
    .then((data) => {
      const productsSection = document.getElementById("productList");
      productsSection.innerHTML = "";

      data.forEach((product) => {
        const col = document.createElement("div");
        col.className = "col-md-4 d-flex";

        const card = document.createElement("div");
        card.className = "card shadow border p-3 d-flex flex-column w-100";
        card.dataset.id = product._id; // إضافة dataset.id للبطاقة

        card.innerHTML = `
    <p class="productTitle"><strong>${product.name}</strong></p>
    <img src="${
      product.image
    }" style="width: 100%; height: 200px; object-fit: contain;" alt="">
    <p><strong>Price:</strong> $${product.price}</p>
    <p>${product.description.slice(0, 100)}...</p>
    <div class="mt-auto">
      <button class="btn btn-sm btn-primary productBtn w-100">
        Add To Cart
      </button>
    </div>
  `;

        col.appendChild(card);
        productsSection.appendChild(col);
      });

      document.getElementById("productList").addEventListener("click", (e) => {
        if (e.target.classList.contains("productBtn")) {
          const button = e.target;
          const productId = button.closest(".card").dataset.id;
          handleAddToCart(productId, button); // نمرر الزر كمعامل
        }
      });
    })
    .catch((error) => console.error("Error fetching products:", error));
});
