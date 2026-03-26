/**
 * EatHealthy Main JavaScript
 * Professional Food Ordering Application
 * @author Antigravity
 */

// State Management
let cart = JSON.parse(localStorage.getItem('cart')) || [];
let orderHistory = JSON.parse(localStorage.getItem('orderHistory')) || [];
let currentView = 'home';
let activeCategory = 'All';
let chatHistory = [...initialChatHistory];
let isDarkMode = localStorage.getItem('theme') === 'dark';

// Constants
const DELIVERY_FEE = 50;
const DELIVERY_ETA_MINS = 45;

// DOM Elements
const menuContainer = document.getElementById('menu-container');
const foodModal = document.getElementById('food-modal');
const closeModalButton = document.getElementById('close-modal');
const addToCartButton = document.getElementById('add-to-cart-button');
const cartToggle = document.getElementById('cart-toggle');
const cartWidget = document.getElementById('cart-widget');
const closeCartButton = document.getElementById('close-cart');
const cartCountElement = document.getElementById('cart-count');
const cartItemsContainer = document.getElementById('cart-items-container');
const cartTotalAmount = document.getElementById('cart-total-amount');
const emptyCartMessage = document.getElementById('empty-cart-message');
const checkoutButton = document.getElementById('checkout-button');
const searchInput = document.getElementById('search-input');
const categoryFiltersContainer = document.getElementById('category-filters');
const noResultsMessage = document.getElementById('no-results-message');
const chatToggleBtn = document.getElementById('chat-toggle');
const chatWidget = document.getElementById('chat-widget');
const closeChatButton = document.getElementById('close-chat');
const chatBody = document.getElementById('chat-body');
const chatForm = document.getElementById('chat-form');
const chatInput = document.getElementById('chat-input');
const themeToggle = document.getElementById('theme-toggle');
const profileToggle = document.getElementById('profile-toggle');
const toastContainer = document.getElementById('toast-container');

/**
 * Toast Notifications
 */
function showToast(message, type = 'success') {
    const toast = document.createElement('div');
    toast.className = `toast ${type === 'success' ? 'border-emerald-500' : 'border-red-500'}`;
    toast.innerHTML = `
        <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-info"><circle cx="12" cy="12" r="10"/><path d="M12 16v-4"/><path d="M12 8h.01"/></svg>
        <span>${message}</span>
    `;
    toastContainer.appendChild(toast);
    setTimeout(() => toast.remove(), 3500);
}

/**
 * Navigation and View Management
 * @param {string} view - The view to navigate to ('home', 'payment', 'receipt')
 */
function navigateTo(view) {
    const views = ['homepage', 'payment-page', 'receipt-page'];
    views.forEach(v => document.getElementById(v).classList.add('hidden'));

    const target = view === 'home' ? 'homepage' : `${view}-page`;
    document.getElementById(target).classList.remove('hidden');

    if (view === 'payment') renderPaymentSummary();

    currentView = view;
    document.body.style.overflow = 'auto';
    window.scrollTo(0, 0);
}

/**
 * Theme Management
 */
function toggleTheme() {
    isDarkMode = !isDarkMode;
    document.documentElement.classList.toggle('dark', isDarkMode);
    localStorage.setItem('theme', isDarkMode ? 'dark' : 'light');
}

/**
 * Cart Logic
 */
function saveState() {
    localStorage.setItem('cart', JSON.stringify(cart));
    localStorage.setItem('orderHistory', JSON.stringify(orderHistory));
}

function calculateTotal(includeDelivery = true) {
    const subtotal = cart.reduce((s, i) => s + i.price, 0);
    return includeDelivery ? subtotal + (subtotal > 0 ? DELIVERY_FEE : 0) : subtotal;
}

function updateCartUI() {
    const count = cart.length;
    cartCountElement.textContent = count;
    cartCountElement.classList.toggle('opacity-0', count === 0);
    cartCountElement.classList.toggle('scale-0', count === 0);

    checkoutButton.disabled = count === 0;
    checkoutButton.textContent = count === 0 ? 'Cart Empty' : 'Proceed to Checkout';
    cartTotalAmount.textContent = `₹${calculateTotal(false)}`;

    renderCartList();
    saveState();
}

function renderCartList() {
    cartItemsContainer.innerHTML = '';
    if (cart.length === 0) {
        cartItemsContainer.appendChild(emptyCartMessage);
        emptyCartMessage.classList.remove('hidden');
    } else {
        emptyCartMessage.classList.add('hidden');
        cart.forEach((item, index) => {
            const div = document.createElement('div');
            div.className = 'flex items-center justify-between border-b border-gray-100 dark:border-slate-700 pb-3';
            div.innerHTML = `
                <div class="flex flex-col flex-grow mr-4">
                    <span class="font-semibold text-gray-800 dark:text-gray-200">${item.name}</span>
                    <span class="text-sm text-gray-500 dark:text-gray-400">₹${item.price}</span>
                </div>
                <button onclick="removeFromCart(${index})" class="text-red-500 hover:text-red-700 p-1 rounded-full transition">
                    <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-trash-2"><path d="M3 6h18"/><path d="M19 6v14c0 1-1 2-2 2H7c-1 0-2-1-2-2V6"/><path d="M8 6V4c0-1 1-2 2-2h4c1 0 2 1 2 2v2"/><line x1="10" x2="10" y1="11" y2="17"/><line x1="14" x2="14" y1="11" y2="17"/></svg>
                </button>
            `;
            cartItemsContainer.appendChild(div);
        });
    }
}

function addToCart(itemId) {
    const item = menuItems.find(i => i.id === parseInt(itemId));
    if (item) {
        cart.push(item);
        updateCartUI();
        showToast(`${item.name} added to cart!`);
        closeFoodDetails();
        if (cartWidget.classList.contains('hidden')) toggleCart();
    }
}

function removeFromCart(index) {
    const item = cart[index];
    cart.splice(index, 1);
    updateCartUI();
    showToast(`${item.name} removed from cart.`, 'error');
}

function toggleCart() {
    if (currentView !== 'home') return;
    const isHidden = cartWidget.classList.contains('hidden');
    if (isHidden) {
        chatWidget.classList.add('hidden', 'scale-y-0', 'opacity-0');
        cartWidget.classList.remove('hidden');
        setTimeout(() => cartWidget.classList.add('scale-y-100', 'opacity-100'), 10);
    } else {
        cartWidget.classList.remove('scale-y-100', 'opacity-100');
        cartWidget.classList.add('scale-y-0', 'opacity-0');
        setTimeout(() => cartWidget.classList.add('hidden'), 300);
    }
}

/**
 * Menu Rendering Logic
 */
function renderMenu() {
    menuContainer.innerHTML = '';
    const query = searchInput.value.toLowerCase();

    const filtered = menuItems.filter(item => {
        const catMatch = activeCategory === 'All' || item.category === activeCategory;
        const searchMatch = item.name.toLowerCase().includes(query) ||
            item.shortDesc.toLowerCase().includes(query);
        return catMatch && searchMatch;
    });

    if (filtered.length === 0) {
        noResultsMessage.classList.remove('hidden');
        return;
    }

    noResultsMessage.classList.add('hidden');
    filtered.forEach(item => {
        const card = document.createElement('div');
        card.className = 'bg-white dark:bg-slate-800 rounded-xl shadow-xl overflow-hidden cursor-pointer flex flex-col card-hover';
        card.onclick = () => showFoodDetails(item.id);
        card.innerHTML = `
            <div class="h-48 overflow-hidden relative">
                <img src="${item.image}" alt="${item.name}" class="w-full h-full object-cover transition duration-500 group-hover:scale-110">
                <div class="absolute top-2 right-2 bg-white/90 dark:bg-slate-900/90 backdrop-blur-sm px-2 py-1 rounded-md text-xs font-bold text-green-600">
                    ₹${item.price}
                </div>
            </div>
            <div class="p-4 flex-grow">
                <p class="text-xs font-semibold text-orange-500 uppercase tracking-tighter">${item.category}</p>
                <h3 class="text-lg font-bold text-gray-900 dark:text-gray-100 mt-1 mb-2">${item.name}</h3>
                <p class="text-gray-500 dark:text-gray-400 text-sm line-clamp-2">${item.shortDesc}</p>
            </div>
            <div class="p-4 pt-0">
                <button class="w-full py-2 btn-primary text-white text-sm font-semibold rounded-lg">View Details</button>
            </div>
        `;
        menuContainer.appendChild(card);
    });
}

function renderFilterButtons() {
    const categories = ['All', ...new Set(menuItems.map(i => i.category))];
    categoryFiltersContainer.innerHTML = '';
    categories.forEach(cat => {
        const btn = document.createElement('button');
        btn.textContent = cat;
        btn.className = `px-4 py-2 text-sm font-bold rounded-full transition duration-150 ${activeCategory === cat
            ? 'bg-emerald-500 text-white'
            : 'bg-white dark:bg-slate-800 text-gray-700 dark:text-gray-300 border border-gray-200 dark:border-slate-700 hover:bg-emerald-50'
            }`;
        btn.onclick = () => {
            activeCategory = cat;
            renderFilterButtons();
            renderMenu();
        };
        categoryFiltersContainer.appendChild(btn);
    });
}

function showFoodDetails(id) {
    const item = menuItems.find(i => i.id === id);
    if (!item) return;

    document.getElementById('modal-title').textContent = item.name;
    document.getElementById('modal-category').textContent = item.category;
    document.getElementById('modal-description').textContent = item.description;
    document.getElementById('modal-price').textContent = `₹${item.price}`;
    document.getElementById('modal-image').src = item.image;
    addToCartButton.setAttribute('data-item-id', id);

    foodModal.classList.remove('hidden');
    foodModal.classList.add('flex');
    document.body.style.overflow = 'hidden';
}

function closeFoodDetails() {
    foodModal.classList.add('hidden');
    foodModal.classList.remove('flex');
    document.body.style.overflow = 'auto';
}

/**
 * Payment and Order Processing
 */
function renderPaymentSummary() {
    const subtotal = calculateTotal(false);
    const grandTotal = subtotal + DELIVERY_FEE;

    document.getElementById('payment-total').textContent = `₹${grandTotal}`;
    document.getElementById('summary-subtotal').textContent = `₹${subtotal}`;
    document.getElementById('summary-delivery').textContent = `₹${DELIVERY_FEE}`;
    document.getElementById('summary-total').textContent = `₹${grandTotal}`;

    const container = document.getElementById('payment-summary-items');
    container.innerHTML = '';

    const counts = {};
    cart.forEach(i => counts[i.name] = (counts[i.name] || 0) + 1);

    Object.keys(counts).forEach(name => {
        const item = menuItems.find(i => i.name === name);
        container.innerHTML += `
            <div class="flex justify-between text-sm py-1 border-b border-gray-50 dark:border-slate-800">
                <span class="text-gray-600 dark:text-gray-400">${name} x${counts[name]}</span>
                <span class="font-semibold dark:text-gray-200">₹${item.price * counts[name]}</span>
            </div>
        `;
    });
}

function processPayment(e) {
    if (e) e.preventDefault();
    const payBtn = document.getElementById('pay-now-btn');
    const loader = document.getElementById('payment-loader');

    payBtn.disabled = true;
    loader.classList.remove('hidden');

    const orderData = {
        id: 'EAT' + Math.random().toString(36).substr(2, 6).toUpperCase(),
        date: new Date().toLocaleDateString(),
        items: [...cart],
        total: calculateTotal(),
        method: document.querySelector('input[name="payment-method"]:checked').value,
        address: document.getElementById('address').value
    };

    setTimeout(() => {
        orderHistory.push(orderData);
        saveState();
        renderReceipt(orderData);
        cart = [];
        updateCartUI();
        navigateTo('receipt');
        payBtn.disabled = false;
        loader.classList.add('hidden');
        showToast("Order placed successfully!");
        simulateTracking();
    }, 2000);
}

function renderReceipt(order) {
    document.getElementById('receipt-order-id').textContent = order.id;
    document.getElementById('receipt-date').textContent = order.date;
    document.getElementById('receipt-final-total').textContent = `₹${order.total}`;
    document.getElementById('receipt-address').textContent = order.address;
}

function simulateTracking() {
    const bar = document.getElementById('order-progress-bar');
    const badge = document.getElementById('order-status-badge');

    setTimeout(() => {
        bar.style.width = '50%';
        badge.textContent = 'Preparing';
        badge.className = 'px-2 py-1 bg-orange-100 text-orange-800 text-xs font-bold rounded-full';
    }, 5000);

    setTimeout(() => {
        bar.style.width = '75%';
        badge.textContent = 'On the way';
        badge.className = 'px-2 py-1 bg-emerald-100 text-emerald-800 text-xs font-bold rounded-full';
    }, 12000);
}

/**
 * Chat System
 */
function toggleChat() {
    if (currentView !== 'home') return;
    const isHidden = chatWidget.classList.contains('hidden');
    if (isHidden) {
        cartWidget.classList.add('hidden');
        chatWidget.classList.remove('hidden');
        setTimeout(() => chatWidget.classList.add('scale-y-100', 'opacity-100'), 10);
    } else {
        chatWidget.classList.remove('scale-y-100', 'opacity-100');
        chatWidget.classList.add('scale-y-0', 'opacity-0');
        setTimeout(() => chatWidget.classList.add('hidden'), 300);
    }
}

function addChatMessage(text, isUser) {
    const div = document.createElement('div');
    div.className = `p-3 rounded-2xl max-w-[85%] mb-2 ${isUser ? 'bg-emerald-500 text-white ml-auto rounded-tr-none' : 'bg-gray-100 dark:bg-slate-800 text-gray-800 dark:text-gray-200 rounded-tl-none'
        }`;
    div.textContent = text;
    chatBody.appendChild(div);
    chatBody.scrollTop = chatBody.scrollHeight;
}

function handleChatSubmit(e) {
    if (e) e.preventDefault();
    const msg = chatInput.value.trim();
    if (!msg) return;

    addChatMessage(msg, true);
    chatInput.value = '';

    // Simple local response simulation
    setTimeout(() => {
        const response = localResponder(msg);
        addChatMessage(response, false);
    }, 800);
}

function localResponder(query) {
    const q = query.toLowerCase();
    if (q.includes('menu')) return "Check our Salads, Bowls, and Vegan specials! I recommend the Salmon Poke Bowl.";
    if (q.includes('deliver')) return "We deliver across the city in under 45 mins. Delivery fee is just ₹50.";
    if (q.includes('pay')) return "We accept Cards, UPI, and Cash on Delivery.";
    if (q.includes('help')) return "I can help you browse the menu, track your order, or answer nutrition questions!";
    return "I'm your EatHealthy assistant! Ask me about our healthy menu items, delivery times, or how to pay.";
}

// Initializers
document.addEventListener('DOMContentLoaded', () => {
    // Theme setup
    if (isDarkMode) document.documentElement.classList.add('dark');

    renderMenu();
    renderFilterButtons();
    updateCartUI();

    // Chat init
    chatHistory.forEach(msg => addChatMessage(msg.parts[0].text, msg.role === 'user'));

    // Event Listeners
    if (themeToggle) themeToggle.addEventListener('click', toggleTheme);
    if (searchInput) searchInput.addEventListener('input', renderMenu);
    if (cartToggle) cartToggle.addEventListener('click', toggleCart);
    if (closeCartButton) closeCartButton.addEventListener('click', toggleCart);
    if (chatToggleBtn) chatToggleBtn.addEventListener('click', toggleChat);
    if (closeChatButton) closeChatButton.addEventListener('click', toggleChat);
    if (chatForm) chatForm.addEventListener('submit', handleChatSubmit);

    document.getElementById('payment-form').addEventListener('submit', processPayment);
    document.getElementById('back-to-menu-btn').addEventListener('click', () => navigateTo('home'));
    document.getElementById('start-new-order-btn').addEventListener('click', () => navigateTo('home'));

    checkoutButton.addEventListener('click', () => {
        toggleCart();
        navigateTo('payment');
    });

    closeModalButton.addEventListener('click', closeFoodDetails);
    addToCartButton.addEventListener('click', () => {
        const id = addToCartButton.getAttribute('data-item-id');
        addToCart(id);
    });

    // Profile modal placeholder
    if (profileToggle) {
        profileToggle.addEventListener('click', () => {
            alert("Profile features are coming soon. Your order history is already being saved locally!");
        });
    }

    // Final Polish Logic Integrated
    document.body.classList.add('loaded');

    const backToTopBtn = document.createElement('div');
    backToTopBtn.className = 'back-to-top';
    backToTopBtn.innerHTML = '<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="3" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-arrow-up"><path d="m5 12 7-7 7 7"/><path d="M12 19V5"/></svg>';
    document.body.appendChild(backToTopBtn);

    window.addEventListener('scroll', () => {
        if (window.scrollY > 400) backToTopBtn.classList.add('visible');
        else backToTopBtn.classList.remove('visible');
    });

    backToTopBtn.addEventListener('click', () => {
        window.scrollTo({ top: 0, behavior: 'smooth' });
    });
});