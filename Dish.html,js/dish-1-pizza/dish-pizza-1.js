let products = [
    { id: 1, name: "Corn Delite Pizza", price: 120, image: "./dish-1-category-1.jpg" },
    { id: 2, name: 'Veggie Special Pizza', price: 120, image: "./dish-1-category-1.jpg" },
    { id: 3, name: 'Veggie Special Pizza', price: 120, image: "./dish-1-category-1.jpg" },
    { id: 4, name: 'Veggie Special Pizza', price: 120, image: "./dish-1-category-1.jpg" },
    // category-2
    { id: 5, name: "Veg Spicy Fusion Pizza", price: 170, image: "./dish-1-category-1.jpg" },
    { id: 6, name: 'Spicy Treat Pizza', price: 170, image: "./dish-1-category-1.jpg" },
    { id: 7, name: 'Corn Crunch Pizza', price: 170, image: "./dish-1-category-1.jpg" },
    { id: 8, name: 'Schezwan Pizza', price: 170, image: "./dish-1-category-1.jpg" },
    { id: 9, name: 'Farm House Pizza', price: 170, image: "./dish-1-category-1.jpg" },
    { id: 10, name: 'Spicy Slingshot Pizza', price: 170, image: "./dish-1-category-1.jpg" },
    // category-3
    { id: 11, name: "Paneer Tikka Pizza", price: 190, image: "./dish-1-category-1.jpg" },
    { id: 12, name: 'Chilli Paneer Pizza', price: 190, image: "./dish-1-category-1.jpg" },
    { id: 13, name: 'Peppy Paneer Pizza', price: 190, image: "./dish-1-category-1.jpg" },
    { id: 14, name: 'Makhani Paneer Pizza', price: 190, image: "./dish-1-category-1.jpg" },
    { id: 15, name: 'Tandoori Paneer Pizza', price: 190, image: "./dish-1-category-1.jpg" },
    // category-4
    { id: 16, name: 'Pizza Pasta Pizza', price: 200, image: "./dish-1-category-1.jpg" },
    { id: 17, name: 'King-Kong Pizza', price: 200, image: "./dish-1-category-1.jpg" },
    { id: 18, name: 'Spicy Veg Island Pizza', price: 200, image: "./dish-1-category-1.jpg" },
    // category-5
    { id: 19, name: 'Super Extra Loaded Pizza', price: 220, image: "./dish-1-category-1.jpg" },
    { id: 20, name: 'Laziz Deluxe Veggie Pizza', price: 220, image: "./dish-1-category-1.jpg" },
    // pizza mania single-topping
    { id: 21, name: "Sweet Corn Pizza", price: 70, image: "./dish-1-category-1.jpg" },
    { id: 22, name: 'Onion Pizza', price: 70, image: "./dish-1-category-1.jpg" },
    { id: 23, name: 'Capsicum Pizza', price: 70, image: "./dish-1-category-1.jpg" },
    { id: 24, name: 'Soya Pizza', price: 60, image: "./dish-1-category-1.jpg" },
    { id: 25, name: 'Tomato Pizza', price: 60, image: "./dish-1-category-1.jpg" },
    { id: 26, name: 'Pineapple Pizza', price: 90, image: "./dish-1-category-1.jpg" },
    // double-topping
    { id: 27, name: "Onion + Soya Pizza", price: 90, image: "./dish-1-category-1.jpg" },
    { id: 28, name: 'Onion + Capsicum Pizza', price: 90, image: "./dish-1-category-1.jpg" },
    { id: 29, name: 'Onion + Corn Pizza', price: 90, image: "./dish-1-category-1.jpg" },
    { id: 30, name: 'Corn + Capsicum Pizza', price: 90, image: "./dish-1-category-1.jpg" },
    { id: 31, name: 'Red-Papreka + Pineapple Pizza', price: 110, image: "./dish-1-category-1.jpg" },
    { id: 32, name: 'Onion + Paneer Pizza', price: 110, image: "./dish-1-category-1.jpg" },
];

const cartContainer = document.querySelector(".cart-container");
const cartClick = document.querySelector(".nav-bar_cart");
const closebtn = document.querySelector(".cart-close_btn");
const cartItem = document.querySelector(".cart-list"); 
const homeRedirect = document.querySelector(".home");
const cartTotal = document.querySelector("#cart-total");
const cartCounter = document.querySelector(".nav-bar-cart_itemnumber span");

let cart = [];

homeRedirect.addEventListener("click", (event) => {
    event.preventDefault();
    window.location.href = '../../index.html';
});

cartClick.addEventListener("click", () => {
    cartContainer.classList.toggle('cart-container-toggle');
    cartContainer.classList.remove('cart-closing');
});

closebtn.addEventListener("click", () => {
    cartContainer.classList.add('cart-closing');
});

document.addEventListener("click", (event) => {
    if (event.target.classList.contains("add")) {
        addToCart(event.target);
    }
});

function addToCart(button) {
    let productId = button.getAttribute("data-id");
    let product = products.find(p => p.id == productId);

    let existingItem = cart.find(item => item.id === product.id);

    if (existingItem) {
        existingItem.quantity++;
    } else {
        cart.push({ ...product, quantity: 1 });
    }

    updateCartUI();
}

function updateCartUI() {
    cartItem.innerHTML = "";
    let total = 0;
    let totalItems = 0;

    cart.forEach(item => {
        cartItem.innerHTML += 
            `<div class="item">
                <div class="cart-item_image"><img src="${item.image}" alt="${item.name}"></div>
                <div class="cart-item_name">${item.name}</div>
                <div class="cart-item_rate">₹${item.price}</div>
                <div class="cart-item_quantity">
                    <button class="quantity_minus" data-id="${item.id}">-</button>
                    <span>${item.quantity}</span>
                    <button class="quantity_plus" data-id="${item.id}">+</button>
                </div>    
            </div>`;
        total += item.price * item.quantity;
        totalItems += item.quantity;
    });

    cartTotal.textContent = "Total : ₹" + total;
    cartCounter.textContent = totalItems;

    // Add event listeners for quantity buttons
    document.querySelectorAll(".quantity_minus").forEach(button => {
        button.addEventListener("click", (event) => updateQuantity(event, -1));
    });

    document.querySelectorAll(".quantity_plus").forEach(button => {
        button.addEventListener("click", (event) => updateQuantity(event, +1));
    });
}

function updateQuantity(event, change) {
    let id = parseInt(event.target.dataset.id);
    let item = cart.find(item => item.id === id);

    if (item) {
        item.quantity += change;
        if (item.quantity <= 0) {
            cart = cart.filter(cartItem => cartItem.id !== id);
        }
        updateCartUI();
    }
}

let wNumber = 9817166339;
let message = "hyy";
let messageEncode = encodeURIComponent(message);


function whatsApp () {
    if(/Android|iPhone|iPad/i.test(navigator.userAgent))
        window.location.href = "https://wa.me/" + wNumber + "?text=" + messageEncode;
    else {
        window.location.href = "https://web.whatsapp.com/send?phone=" + wNumber + "&text=" + messageEncode;
    }
}    


