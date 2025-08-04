
const increaseButtons = document.querySelectorAll('.increase');
const decreaseButtons = document.querySelectorAll('.decrease');
const removeButtons = document.querySelectorAll('.remove-item');
const quantitySpans = document.querySelectorAll('.quantity');
const totalPriceSpan = document.querySelector('.total-price');
const totalItemsSpan = document.querySelector('.total-items');

let totalPrice = 1288;
let totalItems = 3;


function updateCart() {
  totalPrice = 0;
  totalItems = 0;
  const cartItems = document.querySelectorAll('.cart-item');
  
  cartItems.forEach(item => {
    const price = parseInt(item.getAttribute('data-price'));
    const quantity = parseInt(item.querySelector('.quantity').textContent);
    totalPrice += price * quantity;
    totalItems += quantity;
  });
  
  totalPriceSpan.textContent = totalPrice;
  totalItemsSpan.textContent = totalItems;
}


increaseButtons.forEach((button, index) => {
  button.addEventListener('click', () => {
    let quantity = parseInt(quantitySpans[index].textContent);
    quantity++;
    quantitySpans[index].textContent = quantity;
    updateCart();
  });
});


decreaseButtons.forEach((button, index) => {
  button.addEventListener('click', () => {
    let quantity = parseInt(quantitySpans[index].textContent);
    if (quantity > 1) {
      quantity--;
      quantitySpans[index].textContent = quantity;
      updateCart();
    }
  });
});


removeButtons.forEach((button, index) => {
  button.addEventListener('click', () => {
    const cartItem = button.closest('.cart-item');
    const itemPrice = parseInt(cartItem.querySelector('.item-price').textContent);
    const itemQuantity = parseInt(cartItem.querySelector('.quantity').textContent);
    totalPrice -= itemPrice * itemQuantity;
    totalItems -= itemQuantity;
    cartItem.remove();
    updateCart();
  });
});


updateCart();
