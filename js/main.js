// * Loading reusable partials (navbar, footer)
async function loadPartials() {
    const includeElements = document.querySelectorAll("[data-include]");

    const promises = Array.from(includeElements).map(async el => {
        try {
            const response = await fetch("partials/" + el.dataset.include);
            const html = await response.text();
            el.outerHTML = html;
        } catch (error) {
            console.error(`Error loading ${el.dataset.include}:`, error);
        }
    });

    await Promise.all(promises);
}

// Initialize app
document.addEventListener("DOMContentLoaded", async () => {
    await loadPartials();

    // *
    // *  NAVBAR FUNCTIONALITY
    // *
    const navbarElement = document.getElementById('navbar');

    window.addEventListener('scroll', () => {
        if (window.scrollY > 100) {
            navbarElement.classList.add('scrolled');
        } else {
            navbarElement.classList.remove('scrolled');
        }
    });
});

// *
// *  INFIITE LOGO SLIDER ANIMATION
// *
const sliderElements = document.querySelectorAll('.animate-scroll');

sliderElements.forEach(el => {
    let copy = el.querySelector('.flex').cloneNode(true);
    el.appendChild(copy);
});


// *
// *  SPORT VENUE BOOKING IMAGE SLIDER
// *
const track = document.getElementById('sliderTrack');
const prevBtn = document.getElementById('prevBtn');
const nextBtn = document.getElementById('nextBtn');
const indicators = document.getElementById('indicators');
const items = track.children;

let currentIndex = 0;
let itemsPerView = 1;

function calculateItemsPerView() {
    const width = window.innerWidth;
    if (width >= 1280) return 4; // xl
    if (width >= 1024) return 3; // lg
    if (width >= 640) return 2;  // sm
    return 1;
}

function updateSlider() {
    itemsPerView = calculateItemsPerView();
    const maxIndex = items.length - itemsPerView;

    // Ensure currentIndex is within bounds
    if (currentIndex > maxIndex) {
        currentIndex = maxIndex;
    }

    // Calculate translation
    const itemWidth = track.children[0].offsetWidth;
    const gap = 20;
    const translateAmount = currentIndex * (itemWidth + gap);

    track.style.transform = `translateX(-${translateAmount}px)`;

    // Update button states
    prevBtn.disabled = currentIndex === 0;
    nextBtn.disabled = currentIndex >= maxIndex;

    updateIndicators();
}

function updateIndicators() {
    indicators.innerHTML = '';
    const maxIndex = items.length - itemsPerView;

    for (let i = 0; i <= maxIndex; i++) {
        const dot = document.createElement('button');
        dot.className = `w-2 h-2 rounded-full transition-all ${i === currentIndex ? 'bg-secondary w-6' : 'bg-gray-300'
            }`;
        dot.addEventListener('click', () => {
            currentIndex = i;
            updateSlider();
        });
        indicators.appendChild(dot);
    }
}

prevBtn.addEventListener('click', () => {
    if (currentIndex > 0) {
        currentIndex--;
        updateSlider();
    }
});

nextBtn.addEventListener('click', () => {
    const maxIndex = items.length - itemsPerView;
    if (currentIndex < maxIndex) {
        currentIndex++;
        updateSlider();
    }
});

// Handle resize
let resizeTimer;
window.addEventListener('resize', () => {
    clearTimeout(resizeTimer);
    resizeTimer = setTimeout(() => {
        updateSlider();
    }, 100);
});

// Initialize
updateSlider();


//? TEMPORARY CODE ==========================
if ('scrollRestoration' in history) {
    history.scrollRestoration = 'manual'; // or 'auto'
}

document.addEventListener("DOMContentLoaded", () => {
    const pos = sessionStorage.getItem("scrollPos");
    if (pos) {
        window.scrollTo(0, parseInt(pos) + 500);
        sessionStorage.removeItem("scrollPos");
    }
});

window.addEventListener("beforeunload", () => {
    sessionStorage.setItem("scrollPos", window.scrollY);
});
//? TERMPORARY CODE ==========================
