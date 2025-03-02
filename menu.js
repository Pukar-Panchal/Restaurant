const checkBox = document.getElementById("check");
const navLinks = document.querySelector(".nav-links");
const menuContainer = document.querySelector(".menu-container");

checkBox.addEventListener("change",function(){
    if(checkBox.checked){
        navLinks.style.left = "0";

        menuContainer.classList.add("toggle");
    } else {
        navLinks.style.left = "-100%";
        
        menuContainer.classList.remove("toggle");
    }
});

let currentSlide = 0;

const slides = [
    'url("https://images7.alphacoders.com/129/thumb-1920-1290221.jpg")',
    'url("https://images5.alphacoders.com/130/thumb-1920-1303187.jpg")',
    'url("https://images5.alphacoders.com/381/thumb-1920-381504.jpg")',
    'url("https://images.alphacoders.com/130/thumb-1920-1308389.jpeg")'
];
const slidesElement = document.querySelector(".myslide");
 function showSlide(){
    slidesElement.style.backgroundImage = slides[currentSlide];
    currentSlide = (currentSlide+1)%slides.length;
    setTimeout(showSlide,2000);
 }
 showSlide();