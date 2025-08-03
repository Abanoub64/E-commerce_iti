
document.addEventListener('DOMContentLoaded', () => {
    fetch('https://fakestoreapi.com/products')  // حطو ال ا بي اييي يخواااااااااااااااتييييي
        .then(response => response.json())
        .then(data => {
            const productsSection = document.querySelector('.product-list');
            data.forEach(product => {
                const productItem = document.createElement('div');
                productItem.classList.add('product-item');
                productItem.innerHTML = `
                    <img src="${product.image}" alt="${product.name}">
                    <p>${product.name}</p>
                    <p>Price: ${product.price} EGP</p>
                    
                `;
                productsSection.appendChild(productItem);
            });
        })
        .catch(err => console.error('Error fetching products:', err));

 
    document.getElementById('shareAppLink').addEventListener('click', () => {
        const appEmail = document.getElementById('appEmail').value;
        if (appEmail) {
            alert(`App link sent to ${appEmail}`);
            
        } else {
            alert('Please enter your email address');
        }
    });
});
