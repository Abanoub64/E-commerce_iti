const productContainer = document.getElementById("productContainer");
const searchInput = document.getElementById("searchInput");
let products = [];
let cart = [];
const apiUrl = "https://e-commerce-iti-wfr1.onrender.com/";

async function fetchProducts() {
  const res = await fetch(`${apiUrl}products`);
  products = await res.json();
  displayProducts(products);
}

function displayProducts(list) {
  productContainer.innerHTML = "";
  list.forEach((product) => {
    const col = document.createElement("div");
    col.className = "col-md-4";
    col.innerHTML = `
            <div class="card h-100">
              <img src="${product.image}" class="card-img-top" alt="..." />
              <div class="card-body">
                <h5 class="card-title">${product.name}</h5>
                <p class="card-text">${product.description}</p>
                <p class="fw-bold">${product.price} EGP</p>
                <button class="btn btn-success" onclick='addToCart(${JSON.stringify(
                  product
                )})'>Add to Cart</button>
              </div>
            </div>
          `;
    productContainer.appendChild(col);
  });
}

function addToCart(product) {
  cart.push(product);
  alert("Added to cart ✅");
}

function viewCart() {
  const cartItems = document.getElementById("cartItems");
  if (cart.length === 0) {
    cartItems.innerHTML = `<p>No items in the cart.</p>`;
  } else {
    cartItems.innerHTML = cart
      .map(
        (item, i) => `
              <div class="d-flex justify-content-between border-bottom py-2">
                <div>
                  <strong>${item.name}</strong><br />
                  ${item.price} EGP
                </div>
                <button class="btn btn-sm btn-danger" onclick="removeFromCart(${i})">Remove</button>
              </div>
            `
      )
      .join("");
  }
  new bootstrap.Modal(document.getElementById("cartModal")).show();
}

function removeFromCart(index) {
  cart.splice(index, 1);
  viewCart();
}

searchInput.addEventListener("input", () => {
  const filtered = products.filter((p) =>
    p.name.toLowerCase().includes(searchInput.value.toLowerCase())
  );
  displayProducts(filtered);
});

document.getElementById("logoutBtn").addEventListener("click", async () => {
  await fetch(`${apiUrl}logout`, {
    method: "GET",
    credentials: "include",
  });

  window.location.href = "../index.html";
});

function getCookie(name) {
  const value = `; ${document.cookie}`;
  const parts = value.split(`; ${name}=`);
  if (parts.length === 2) return parts.pop().split(";").shift();
}

const userLevel = getCookie("userLevel");
if (userLevel === "superuser") {
  document.getElementById("adminBtn").classList.remove("d-none");
}
fetchProducts();
