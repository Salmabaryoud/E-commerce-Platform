// Sample product data
const products = [
    {
        id: 1,
        name: "Minimalist Chair",
        price: 89.99,
        image: "https://images.unsplash.com/photo-1519710164239-da123dc03ef4?auto=format&fit=crop&w=400&q=80",
        description: "A modern, minimalist chair perfect for any living space.",
        featured: true
    },
    {
        id: 2,
        name: "Elegant Lamp",
        price: 49.99,
        image: "https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=400&q=80",
        description: "Brighten up your room with this elegant lamp.",
        featured: true
    },
    {
        id: 3,
        name: "Cozy Sofa",
        price: 299.99,
        image: "https://images.unsplash.com/photo-1465101046530-73398c7f28ca?auto=format&fit=crop&w=400&q=80",
        description: "A cozy sofa for relaxing evenings.",
        featured: true
    },
    {
        id: 4,
        name: "Modern Table",
        price: 159.99,
        image: "https://images.unsplash.com/photo-1515378791036-0648a3ef77b2?auto=format&fit=crop&w=400&q=80",
        description: "A sleek table for your modern home.",
        featured: false
    },
    {
        id: 5,
        name: "Artisan Rug",
        price: 119.99,
        image: "https://images.unsplash.com/photo-1503389152951-9c3d8b6e9c94?auto=format&fit=crop&w=400&q=80",
        description: "Handwoven rug to add warmth and style to your room.",
        featured: true
    },
    {
        id: 6,
        name: "Nordic Bookshelf",
        price: 189.99,
        image: "https://images.unsplash.com/photo-1519125323398-675f0ddb6308?auto=format&fit=crop&w=400&q=80",
        description: "A minimalist bookshelf for your favorite reads.",
        featured: false
    },
    {
        id: 7,
        name: "Designer Clock",
        price: 39.99,
        image: "https://images.unsplash.com/photo-1512820790803-83ca734da794?auto=format&fit=crop&w=400&q=80",
        description: "A stylish wall clock to keep you on time.",
        featured: true
    },
    {
        id: 8,
        name: "Velvet Cushion",
        price: 24.99,
        image: "https://images.unsplash.com/photo-1500534314209-a25ddb2bd429?auto=format&fit=crop&w=400&q=80",
        description: "Soft velvet cushion for extra comfort.",
        featured: false
    },
    {
        id: 9,
        name: "Smart Floor Lamp",
        price: 89.99,
        image: "https://images.unsplash.com/photo-1465101178521-c1a9136a3b99?auto=format&fit=crop&w=400&q=80",
        description: "A smart lamp with adjustable brightness and color.",
        featured: true
    }
];

function renderFeaturedProducts() {
    const grid = document.getElementById('products-grid');
    if (!grid) return;
    grid.innerHTML = '';
    products.filter(p => p.featured).forEach(product => {
        const card = document.createElement('div');
        card.className = 'product-card';
        card.innerHTML = `
            <img src="${product.image}" alt="${product.name}" class="product-image" />
            <div class="product-info">
                <div>
                    <div class="product-title">${product.name}</div>
                    <div class="product-price">$${product.price.toFixed(2)}</div>
                </div>
                <button class="add-to-cart-btn" data-id="${product.id}">Add to Cart</button>
            </div>
        `;
        card.addEventListener('click', (e) => {
            if (!e.target.classList.contains('add-to-cart-btn')) {
                window.location.href = `product.html?id=${product.id}`;
            }
        });
        card.querySelector('.add-to-cart-btn').addEventListener('click', (e) => {
            e.stopPropagation();
            addToCart(product.id);
        });
        grid.appendChild(card);
    });
}

function updateCartCount() {
    const cart = JSON.parse(localStorage.getItem('cart') || '[]');
    const count = cart.reduce((sum, item) => sum + item.qty, 0);
    const badge = document.getElementById('cart-count');
    if (badge) {
        if (count > 0) {
            badge.textContent = count;
            badge.style.display = 'inline-block';
        } else {
            badge.textContent = '';
            badge.style.display = 'none';
        }
    }
}

function addToCart(productId) {
    let cart = JSON.parse(localStorage.getItem('cart') || '[]');
    const item = cart.find(i => i.id === productId);
    if (item) {
        item.qty += 1;
    } else {
        cart.push({ id: productId, qty: 1 });
    }
    localStorage.setItem('cart', JSON.stringify(cart));
    animateCartIcon();
    updateCartCount();
}

function animateCartIcon() {
    const navLinks = document.querySelector('.nav-links');
    if (!navLinks) return;
    const cartLink = navLinks.querySelector('a[href="cart.html"]');
    if (!cartLink) return;
    cartLink.classList.add('cart-animate');
    setTimeout(() => cartLink.classList.remove('cart-animate'), 500);
}

document.addEventListener('DOMContentLoaded', () => {
    renderFeaturedProducts();
    updateCartCount();
});

// Add cart icon animation style
document.head.insertAdjacentHTML('beforeend', `<style>
.cart-animate {
    animation: cartBounce 0.5s;
}
@keyframes cartBounce {
    0% { transform: scale(1); }
    30% { transform: scale(1.2); }
    60% { transform: scale(0.9); }
    100% { transform: scale(1); }
}
</style>`); 