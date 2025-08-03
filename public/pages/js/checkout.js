document.addEventListener("DOMContentLoaded", function() {
  const paymentButton = document.getElementById("paymentButton");
  const onlinePaymentCheckbox = document.getElementById("onlinePayment");

  // Toggle the payment method between Cash on Delivery and Online Payment
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

  // Handle form submission
  document.getElementById("checkoutForm").addEventListener("submit", function(event) {
    event.preventDefault();
    alert("Your order has been placed!");
    // Here you would typically send the form data to a server for processing.
  });
});
