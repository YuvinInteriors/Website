"use strict";

const body = document.body;
const menu = body.querySelector(".bottom-menu");
const menuItems = menu.querySelectorAll(".menu__item");
const menuBorder = menu.querySelector(".menu__border");
let activeItem = menu.querySelector(".active");

function clickItem(item) {

    menu.style.removeProperty("--timeOut");

    if (activeItem == item) return;

    if (activeItem) {
        activeItem.classList.remove("active");
    }
    item.classList.add("active");
    activeItem = item;
    offsetMenuBorder(activeItem, menuBorder);
}

function offsetMenuBorder(element, menuBorder) {
    const offsetActiveItem = element.getBoundingClientRect();
    const left = Math.floor(offsetActiveItem.left - menu.offsetLeft - (menuBorder.offsetWidth - offsetActiveItem.width) / 2) + "px";
    menuBorder.style.transform = `translate3d(${left}, 0 , 0)`;
}

offsetMenuBorder(activeItem, menuBorder);

menuItems.forEach((item) => {
    item.addEventListener("click", () => clickItem(item));
})

window.addEventListener("resize", () => {
    offsetMenuBorder(activeItem, menuBorder);
    menu.style.setProperty("--timeOut", "none");
});

const hero_carousel = new Swiper('.hero-carousel', {
    loop:true,
    slidesPerView:1,
    autoplay:{
        delay:5000,
        pauseOnMouseEnter:true
    }
})

let reviews_effect;
if(screen.width <= 768){
    reviews_effect = 'cards'
}else{
    reviews_effect = 'coverflow'
}

const reviews_carousel = new Swiper('.reviews-carousel', {
    loop:true,
    slidesPerView:'auto',
    loopAddtionalSlides:2,
    keyboard:{
        enabled:true
    },
    effect: reviews_effect,
    grabCursor: true,
    centeredSlides: true,
    loopFillGroupWithBlank: true,
    autoplay:{
        delay:3000,
        pauseOnMouseEnter:true
    },
    pagination: {
        el: ".reviews-carousel-pagination",
      },
})
