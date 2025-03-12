let products = [
    {
        'id': 1,
        'name': "Vanilla Shake",
        'price': 80,
        'image': "./dish-7-category-1"
    },
    {
        'id': 2,
        'name': "Cold Coffee",
        'price': 80,
        'image': "./dish-7-category-1"
    },
    {
        'id': 3,
        'name': "Turkish Hazelnut Cold Coffee",
        'price': 90,
        'image': "./dish-7-category-1"
    },
    {
        'id': 4,
        'name': "Butter Scotch Shake",
        'price': 90,
        'image': "./dish-7-category-1"
    },
    {
        'id': 5,
        'name': "Strawberry Shake",
        'price': 90,
        'image': "./dish-7-category-1"
    },
    {
        'id': 6,
        'name': "Chocolate Shake",
        'price': 90,
        'image': "./dish-7-category-1"
    },
    {
        'id': 7,
        'name': "Black Currant Shake",
        'price': 100,
        'image': "./dish-7-category-1"
    },
    {
        'id': 8,
        'name': "Oreo Shake",
        'price': 100,
        'image': "./dish-7-category-1"
    },
    // Cold Drinks
    {
        'id': 9,
        'name': "Maaza",
        'price': 10,
        'image': "./dish-7-category-1"
    },
    {
        'id': 10,
        'name': "Coke-250 Ml",
        'price': 20,
        'image': "./dish-7-category-1"
    },
    {
        'id': 11,
        'name': "Coke-500 Ml",
        'price': 35,
        'image': "./dish-7-category-1"
    },
    {
        'id': 12,
        'name': "Coke-1 LTR",
        'price': 55,
        'image': "./dish-7-category-1"
    },
    {
        'id': 13,
        'name': "Coke-2 Ltr",
        'price': 100,
        'image': "./dish-7-category-1"
    },
    {
        'id': 14,
        'name': "Fruit-Beer",
        'price': 40,
        'image': "./dish-7-category-1"
    },
];

const listProductHTML = document.querySelector(".main-dish-shake_container");
const listProductHTML2 = document.querySelector(".main-dish-colddrink_container")
const cartContainer = document.querySelector(".cart-container");
const cartClick = document.querySelector(".nav-bar_cart");
const closebtn = document.querySelector(".cart-close_btn");
const cartItem = document.querySelector(".cart-list"); 
const homeRedirect = document.querySelector(".home");
const cartTotal = document.querySelector("#cart-total");
const cartCounter = document.querySelector(".nav-bar-cart_itemnumber span");

let cart = [];

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

if (listProductHTML){
    listProductHTML.addEventListener("click",(event) => {
        if(event.target.classList.contains("add")) {
            addToCart(event.target);
        }
    });
}
if (listProductHTML2){
    listProductHTML2.addEventListener("click",(event) => {
        if(event.target.classList.contains("add")) {
            addToCart(event.target);
        }
    });
}

function addToCart(button) {
    let dishBox = button.closest(".main-dish-shake_mainbox");
    let dishBoxes = document.querySelectorAll(".main-dish-shake_mainbox"); 
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
                    <button class="quantity_minus" data-id="${item.id}"><i class="fa-solid fa-minus"></i></button>
                    <span>${item.quantity}</span>
                    <button class="quantity_plus" data-id="${item.id}"><i class="fa-solid fa-plus"></i></button>
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