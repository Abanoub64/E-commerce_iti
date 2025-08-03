document.addEventListener("DOMContentLoaded", () => {
      // Fetch products from API
      fetch("https://fakestoreapi.com/products")
        .then((response) => response.json())
        .then((data) => {
          const productsSection = document.getElementById("productList");
          // Clear existing sample products
          productsSection.innerHTML = '';
          
          data.forEach((product) => {
            const col = document.createElement("div");
            col.className = "col-md-6 col-lg-4 mb-4";
            
            // Get category icon
            const getIcon = (category) => {
              switch(category) {
                case 'electronics': return 'fas fa-laptop';
                case 'jewelery': return 'fas fa-gem';
                case "men's clothing": return 'fas fa-tshirt';
                case "women's clothing": return 'fas fa-female';
                default: return 'fas fa-shopping-bag';
              }
            };
            
            col.innerHTML = `
              <div class="card product-card h-100">
                <div class="product-image position-relative" style="background: var(--success-gradient);">
                  <img src="${product.image}" alt="${product.title}" 
                       style="width: 100%; height: 250px; object-fit: contain; position: absolute; top: 50%; left: 50%; transform: translate(-50%, -50%); background: white; border-radius: 10px; padding: 1rem;">
                  <div class="position-absolute top-0 end-0 m-3">
                    <i class="${getIcon(product.category)} text-white fs-4"></i>
                  </div>
                </div>
                <div class="product-info">
                  <h5 class="product-title">${product.title.length > 50 ? product.title.substring(0, 50) + '...' : product.title}</h5>
                  <p class="text-muted mb-2" style="font-size: 0.9rem;">${product.description.length > 80 ? product.description.substring(0, 80) + '...' : product.description}</p>
                  <div class="d-flex justify-content-between align-items-center">
                    <span class="product-price">${product.price}</span>
                    <button class="btn btn-sm add-to-cart" data-id="${product.id}" 
                            style="background: var(--primary-gradient); color: white; border: none; border-radius: 20px; padding: 0.5rem 1rem; transition: all 0.3s ease;">
                      <i class="fas fa-cart-plus me-1"></i>Add to Cart
                    </button>
                  </div>
                  <div class="mt-2">
                    <span class="badge" style="background: var(--secondary-gradient); color: white; font-size: 0.7rem;">
                      ${product.category}
                    </span>
                    <span class="badge bg-warning text-dark ms-1">
                      <i class="fas fa-star"></i> ${product.rating.rate}
                    </span>
                  </div>
                </div>
              </div>
            `;
            productsSection.appendChild(col);
          });
          
          // Apply animations to new cards
          setTimeout(() => {
            document.querySelectorAll('.product-card').forEach((card, index) => {
              card.style.opacity = '0';
              card.style.transform = 'translateY(30px)';
              card.style.transition = 'all 0.6s ease';
              
              setTimeout(() => {
                card.style.opacity = '1';
                card.style.transform = 'translateY(0)';
              }, index * 100);
            });
          }, 100);
        })
        .catch((err) => {
          console.error("Error fetching products:", err);
          document.getElementById("productList").innerHTML = 
            '<div class="col-12 text-center"><p class="text-danger">Error loading products. Please try again later.</p></div>';
        });

      // Add to cart logic
     document.addEventListener("click", async (e) => {
  const button = e.target.closest(".add-to-cart");
  if (!button) return;

  const productId = button.dataset.id;
  const userId = "688d9c5bf35ad4dee9fbeb04";

  const originalText = button.innerHTML;
  button.innerHTML = '<i class="fas fa-spinner fa-spin me-1"></i>Adding...';
  button.disabled = true;

  try {
    const res = await fetch(`http://localhost:3000/api/cart/${userId}`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ productId }),
    });

    if (!res.ok) throw new Error("Request failed");

    button.innerHTML = '<i class="fas fa-check me-1"></i>Added!';
    button.style.background = 'linear-gradient(135deg, #4facfe 0%, #00f2fe 100%)';
  } catch (err) {
    console.error("Error:", err);
    button.innerHTML = '<i class="fas fa-times me-1"></i>Error';
    button.style.background = 'linear-gradient(135deg, #f093fb 0%, #f5576c 100%)';
  }

  setTimeout(() => {
    button.innerHTML = originalText;
    button.style.background = 'var(--primary-gradient)';
    button.disabled = false;
  }, 2000);
});

            
            console.log("✔️ Product added to cart:", data);
          } catch (err) {
            console.error("❌ Error adding to cart:", err);
            
            // Error feedback
            button.innerHTML = '<i class="fas fa-times me-1"></i>Error';
            button.style.background = 'linear-gradient(135deg, #f093fb 0%, #f5576c 100%)';
            
            setTimeout(() => {
              button.innerHTML = originalContent;
              button.style.background = 'var(--primary-gradient)';
              button.disabled = false;
            }, 2000);
          }
        }
      });

      // Email sharing functionality
      document.getElementById('shareAppLink').addEventListener('click', function() {
        const email = document.getElementById('appEmail').value;
        if (email) {
          // Simulate sending email
          this.innerHTML = '<i class="fas fa-check me-1"></i>Sent!';
          this.style.background = 'linear-gradient(135deg, #4facfe 0%, #00f2fe 100%)';
          
          setTimeout(() => {
            this.innerHTML = '<i class="fas fa-share me-1"></i>Share App Link';
            this.style.background = 'var(--secondary-gradient)';
          }, 2000);
        } else {
          alert('Please enter your email address');
        }
      });
    });