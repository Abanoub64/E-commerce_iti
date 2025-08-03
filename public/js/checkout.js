document.addEventListener("DOMContentLoaded", function() {
  const paymentButton = document.getElementById("paymentButton");
  const onlinePaymentCheckbox = document.getElementById("onlinePayment");

  
  paymentButton.addEventListener("click", function() {
    if (onlinePaymentCheckbox.checked) {
      paymentButton.textContent = "Cash on Delivery";
      onlinePaymentCheckbox.checked = false;
      paymentButton.classList.remove("active");
    } else {
      paymentButton.textContent = "Online Payment";
      onlinePaymentCheckbox.checked = true;
      paymentButton.classList.add("active");
    }
  });

 
  document.getElementById("checkoutForm").addEventListener("submit", function(event) {
    event.preventDefault();
    alert("Your order has been placed!");

  });
});
