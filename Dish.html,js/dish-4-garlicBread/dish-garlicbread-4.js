
let products = [
    {
        "id": 1,
        "name": "Cheese Garlic Bread",
        "price": 80,
        "image": "./dish-1-category-1.jpg"
    },
    {
        "id": 2,
        "name": "4 Flavour Garlic Bread",
        "price": 100,
        "image": "dish-2-category-1.jpg"
    },
    {
        "id": 3,
        "name": "Plain Garlic Bread Sticks",
        "price": 100,
        "image": "dish-3-category-1.jpg"
    },
    {
        "id": 4,
        "name": "Stuffed Garlic Bread",
        "price": 120,
        "image": "dish-4-category-1.jpg"
    }
];

const listProductHTML = document.querySelector(".main-dish-garlicbread_container");
const cartContainer = document.querySelector(".cart-container");
const cartClick = document.querySelector(".nav-bar_cart");
const closebtn = document.querySelector(".cart-close_btn");
const cartItem = document.querySelector(".cart-list"); 
const homeRedirect = document.querySelector(".home");
const cartTotal = document.querySelector("#cart-total");
const cartCounter = document.querySelector(".nav-bar-cart_itemnumber span");

let cart = [];


function addToCart(button) {
    let dishBox = button.closest(".main-dish-garlicbread_mainbox");
    let dishBoxes = document.querySelectorAll(".main-dish-garlicbread_mainbox"); 
    let productIndex = Array.from(dishBoxes).indexOf(dishBox);
    let product = products[productIndex];

    let existingItem = cart.find(item => item.id === product.id);

    if(existingItem){
        existingItem.quantity++;
    }else{
        cart.push({ ...product, quantity: 1});
    }

    updateCartUI();
}

function updateCartUI() {
    cartItem.innerHTML = "";
    let total = 0;

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
    });

    cartTotal.textContent = "Total : ₹" + total;
    cartCounter.textContent = cart.length;

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

homeRedirect.addEventListener("click",(event)=>{
    event.preventDefault();
    window.location.href = '../../index.html';
});

cartClick.addEventListener("click",()=>{
    cartContainer.classList.toggle('cart-container-toggle');
    cartContainer.classList.remove('cart-closing');
});
closebtn.addEventListener("click",() =>{
    cartContainer.classList.add('cart-closing');
});

listProductHTML.addEventListener("click", (event) => {
    if (event.target.classList.contains("add-to-cart-btn")) {
        addToCart(event.target);
    }
});