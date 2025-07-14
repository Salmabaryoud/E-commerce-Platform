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

function getCart() {
    return JSON.parse(localStorage.getItem('cart') || '[]');
}

function renderCheckoutSummary() {
    const cart = getCart();
    const summaryDiv = document.getElementById('checkout-summary');
    if (cart.length === 0) {
        summaryDiv.innerHTML = '<p>Your cart is empty.</p>';
        document.getElementById('checkout-form').style.display = 'none';
        return;
    }
    let total = 0;
    summaryDiv.innerHTML = cart.map(item => {
        const product = products.find(p => p.id === item.id);
        if (!product) return '';
        const itemTotal = product.price * item.qty;
        total += itemTotal;
        return `
            <div class="product-card" style="flex-direction:row;align-items:center;gap:1.5rem;margin-bottom:1.5rem;">
                <img src="${product.image}" alt="${product.name}" class="product-image" style="width:80px;height:80px;object-fit:cover;" />
                <div class="product-info" style="flex:1;">
                    <div class="product-title">${product.name}</div>
                    <div class="product-price">$${product.price.toFixed(2)}</div>
                    <div>Qty: ${item.qty}</div>
                </div>
                <div style="font-weight:600;">$${itemTotal.toFixed(2)}</div>
            </div>
        `;
    }).join('') + `
        <div style="text-align:right;margin-top:1rem;font-size:1.1rem;font-weight:700;">Total: $${total.toFixed(2)}</div>
    `;
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

document.addEventListener('DOMContentLoaded', () => {
    renderCheckoutSummary();
    updateCartCount();
    document.getElementById('checkout-form').addEventListener('submit', function(e) {
        e.preventDefault();
        localStorage.removeItem('cart');
        document.getElementById('checkout-form').style.display = 'none';
        document.getElementById('checkout-summary').style.display = 'none';
        document.getElementById('order-confirmation').style.display = 'block';
        document.getElementById('order-confirmation').innerHTML = '<h3>Thank you for your order!</h3><p>Your order has been placed successfully.</p>';
        updateCartCount();
    });
}); 