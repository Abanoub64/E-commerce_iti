

// async function handleAddToCart(button) {
//   const productId = button.dataset.id;
//   const userId = "688d9c5bf35ad4dee9fbeb04";
//   const original = button.innerHTML;

//   button.innerHTML = '<i class="fas fa-spinner fa-spin me-1"></i>Adding...';
//   button.disabled = true;

//   try {
//     const res = await fetch(`http://localhost:3000/cart/${userId}`, {
//       method: "POST",
//       headers: { "Content-Type": "application/json" },
//       body: JSON.stringify({ productId , userId })
//     });

//     if (!res.ok) throw new Error("Request failed");

//     button.innerHTML = '<i class="fas fa-check me-1"></i>Added!';
//     button.style.background = 'linear-gradient(135deg, #4facfe 0%, #00f2fe 100%)';
//   } catch (err) {
//     console.error("❌ Error adding to cart:", err);
//     button.innerHTML = '<i class="fas fa-times me-1"></i>Error';
//     button.style.background = 'linear-gradient(135deg, #f093fb 0%, #f5576c 100%)';
//   }

//   setTimeout(() => {
//     button.innerHTML = original;
//     button.style.background = 'var(--primary-gradient)';
//     button.disabled = false;
//   }, 2000);
// }

