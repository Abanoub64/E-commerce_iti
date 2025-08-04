const userId = "688d9c5bf35ad4dee9fbeb04";

const totalPriceSpan = document.querySelector(".total-price");
const totalItemsSpan = document.querySelector(".total-items");

let totalPrice = 0;
let totalItems = 0;

document.addEventListener("DOMContentLoaded", async () => {
  try {
    const userRes = await fetch(`http://localhost:3000/api/users/${userId}`);
    const userData = await userRes.json();

    const lastOrderId = userData.cart[userData.cart.length - 1];

    const orderRes = await fetch(
      `http://localhost:3000/api/orders/${lastOrderId}`
    );
    const order = await orderRes.json();

    const container = document.getElementById("cart-items");
    container.innerHTML = "";

    order.products.forEach((product) => {
      container.innerHTML += `
        <div class="cart-item" data-price="${product.price}">
          <p>${product.name}</p>
          <p class="item-price">${product.price}</p>
          <button class="decrease">-</button>
          <span class="quantity">1</span>
          <button class="increase">+</button>
          <button class="remove-item">Remove</button>
        </div>
      `;
    });

    initCartEvents();
    updateCart();
  } catch (error) {
    console.error("Error loading cart:", error);
  }
});

function updateCart() {
  totalPrice = 0;
  totalItems = 0;
  const cartItems = document.querySelectorAll(".cart-item");

  cartItems.forEach((item) => {
    const price = parseInt(item.getAttribute("data-price"));
    const quantity = parseInt(item.querySelector(".quantity").textContent);
    totalPrice += price * quantity;
    totalItems += quantity;
  });


  totalPriceSpan.textContent = totalPrice;
  totalItemsSpan.textContent = totalItems;
}

function initCartEvents() {
  const increaseButtons = document.querySelectorAll(".increase");
  const decreaseButtons = document.querySelectorAll(".decrease");
  const removeButtons = document.querySelectorAll(".remove-item");
  const quantitySpans = document.querySelectorAll(".quantity");

  increaseButtons.forEach((button, index) => {
    button.addEventListener("click", () => {
      let quantity = parseInt(quantitySpans[index].textContent);
      quantity++;
      quantitySpans[index].textContent = quantity;
      updateCart();
    });
  });

  decreaseButtons.forEach((button, index) => {
    button.addEventListener("click", () => {
      let quantity = parseInt(quantitySpans[index].textContent);
      if (quantity > 1) {
        quantity--;
        quantitySpans[index].textContent = quantity;
        updateCart();
      }
    });
  });

  removeButtons.forEach((button, index) => {
    button.addEventListener("click", () => {
      const cartItem = button.closest(".cart-item");
      cartItem.remove();
      updateCart();
    });
  });
}

document.getElementById("checkout-btn").addEventListener("click", async () => {
  try {
    const res = await fetch(`http://localhost:3000/api/checkout/${userId}`, {
      method: "POST",
    });

    const data = await res.json();
    alert("✔️ Checkout completed!");
    console.log(data);
  } catch (err) {
    console.error("❌ Checkout failed:", err);
    alert("Checkout failed.");
  }
});
