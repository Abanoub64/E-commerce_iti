// Switch sections
function showSection(id) {
  document.querySelectorAll(".section").forEach((section) => {
    section.classList.remove("active");
  });
  document.getElementById(id).classList.add("active");
}

const apiUrl = "https://e-commerce-iti-wfr1.onrender.com/";

// === Products ===
const productForm = document.getElementById("addProductForm");
const productTable = document.getElementById("productsTable");

productForm.onsubmit = async (e) => {
  e.preventDefault();
  const newProduct = {
    name: document.getElementById("title").value,
    description: document.getElementById("description").value,
    image: document.getElementById("image").value,
    price: document.getElementById("price").value,
    seller: document.getElementById("seller").value,
  };
  await fetch(`${apiUrl}products`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(newProduct),
  });
  productForm.reset();
  loadProducts();
};

async function loadProducts() {
  const res = await fetch(`${apiUrl}products`);
  const data = await res.json();
  productTable.innerHTML = "";
  data.forEach((prod) => {
    productTable.innerHTML += `
      <tr>
        <td>${prod.name}</td>
        <td>${prod.price}</td>
        <td>${prod.seller}</td>
        <td><button class="btn btn-danger btn-sm" onclick="deleteProduct('${prod._id}')">Delete</button></td>
      </tr>
    `;
  });
}

async function deleteProduct(id) {
  await fetch(`${apiUrl}products/${id}`, { method: "DELETE" });
  loadProducts();
}

// === Users ===
const usersTable = document.getElementById("usersTable");

async function loadUsers() {
  const res = await fetch(`${apiUrl}admin/users`);
  const data = await res.json();
  usersTable.innerHTML = "";
  data.forEach((user) => {
    usersTable.innerHTML += `
      <tr>
        <td>${user.userName}</td>
        <td>${user.totalSpend}</td>
        <td><button class="btn btn-danger btn-sm" onclick="deleteUser('${user._id}')">Delete</button></td>
      </tr>
    `;
  });
}

async function deleteUser(id) {
  await fetch(`${apiUrl}users/${id}`, { method: "DELETE" });
  loadUsers();
}

// === Orders ===
const ordersTable = document.getElementById("ordersTable");

async function loadOrders() {
  const res = await fetch(`${apiUrl}orders`);
  const data = await res.json();
  ordersTable.innerHTML = "";
  data.forEach((order) => {
    ordersTable.innerHTML += `
      <tr>
        <td>${order.userId.userName || "User"}</td>
        <td>${order.productId.name || "Product"}</td>
        <td>${order.orderStatus}</td>
        <td><button class="btn btn-success btn-sm" onclick="confirmOrder('${
          order._id
        }')">Confirm</button></td>
      </tr>
    `;
  });
}

async function confirmOrder(id) {
  await fetch(`${apiUrl}orders/${id}`, {
    method: "PATCH",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ orderStatus: "Confirmed" }),
  });
  loadOrders();
}

// Auto load
loadProducts();
loadUsers();
loadOrders();
