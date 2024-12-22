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

// Navigation highlighting logic
const sections = document.querySelectorAll('main > div[id], #home');
const topNavItems = document.querySelectorAll('.top-menu .nav-items .menu__item');
const navItemsContainer = document.querySelector('.top-menu .nav-items');

function updateHighlighter(activeItem) {
    if (!activeItem) return;
    
    const itemRect = activeItem.getBoundingClientRect();
    const containerRect = navItemsContainer.getBoundingClientRect();
    
    // Calculate the left position and width for the highlighter
    const left = itemRect.left - containerRect.left;
    const width = itemRect.width;
    
    // Update the highlighter position
    navItemsContainer.style.setProperty('--highlight-left', `${left}px`);
    navItemsContainer.style.setProperty('--highlight-width', `${width}px`);
}

function resetActiveState() {
    topNavItems.forEach(item => {
        item.classList.remove('active');
    });
}

const observerCallback = (entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            resetActiveState();
            const targetId = entry.target.id;
            const correspondingNavItem = document.querySelector(`.top-menu .nav-items .menu__item[href="#${targetId}"]`);
            if (correspondingNavItem) {
                correspondingNavItem.classList.add('active');
                updateHighlighter(correspondingNavItem);
            }
        }
    });
};

const observerOptions = {
    root: null,
    rootMargin: '-20% 0px',
    threshold: 0
};

const observer = new IntersectionObserver(observerCallback, observerOptions);

sections.forEach(section => {
    observer.observe(section);
});

// Handle click events on nav items
topNavItems.forEach(item => {
    item.addEventListener('click', (e) => {
        e.preventDefault();
        const targetId = item.getAttribute('href').substring(1);
        const targetSection = document.getElementById(targetId);
        
        resetActiveState();
        item.classList.add('active');
        //updateHighlighter(item);
        
        if (targetSection) {
            targetSection.scrollIntoView({ behavior: 'smooth' });
        }
    });
});

// Update highlighter on resize
window.addEventListener('resize', () => {
    const activeItem = document.querySelector('.top-menu .nav-items .menu__item.active');
    if (activeItem) {
        updateHighlighter(activeItem);
    }
});
