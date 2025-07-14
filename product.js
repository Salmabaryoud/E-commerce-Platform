// Sample product data (should match app.js)
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

function getProductIdFromURL() {
    const params = new URLSearchParams(window.location.search);
    return parseInt(params.get('id'), 10);
}

function renderProductDetail() {
    const id = getProductIdFromURL();
    const product = products.find(p => p.id === id);
    const detailDiv = document.getElementById('product-detail');
    if (!product) {
        detailDiv.innerHTML = '<p>Product not found.</p>';
        return;
    }
    detailDiv.innerHTML = `
        <div class="product-card" style="max-width: 600px; margin: 2rem auto;">
            <img src="${product.image}" alt="${product.name}" class="product-image" style="height:320px;" />
            <div class="product-info">
                <div class="product-title" style="font-size:1.5rem;">${product.name}</div>
                <div class="product-price" style="font-size:1.2rem;">$${product.price.toFixed(2)}</div>
                <p style="margin:1rem 0;">${product.description}</p>
                <button class="add-to-cart-btn" style="width:100%;font-size:1.1rem;" data-id="${product.id}">Add to Cart</button>
            </div>
        </div>
    `;
    detailDiv.querySelector('.add-to-cart-btn').addEventListener('click', () => {
        addToCart(product.id);
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

function animateCartIcon() {
    const navLinks = document.querySelector('.nav-links');
    if (!navLinks) return;
    const cartLink = navLinks.querySelector('a[href="cart.html"]');
    if (!cartLink) return;
    cartLink.classList.add('cart-animate');
    setTimeout(() => cartLink.classList.remove('cart-animate'), 500);
}

document.addEventListener('DOMContentLoaded', () => {
    renderProductDetail();
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