// *
// *  LOADING PARTIALS (NAVBAR, FOOTER)
// *
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
// *  INFIITE SLIDER ANIMATION
// *
const sliderElements = document.querySelectorAll('.animate-scroll');

sliderElements.forEach(el => {
    let copy = el.querySelector('.flex').cloneNode(true);
    el.appendChild(copy);
});


// *
// *  SLIDER FUNCTIONALITY FUNCTIONS
// *

let itemsPerView = 1;

function calculateItemsPerView() {
    const width = window.innerWidth;
    if (width >= 1280) return 4; // xl
    if (width >= 1024) return 3; // lg
    if (width >= 640) return 2;  // sm
    return 1;
}

function updateSlider(item, track, index, indicator = null, buttons = []) {
    itemsPerView = calculateItemsPerView();
    const maxIndex = item.length - itemsPerView;

    // Ensure index is within bounds
    if (index > maxIndex) index = maxIndex;
    if (maxIndex < 0) index = 0;

    // Calculate translation
    const itemWidth = item[0].offsetWidth;
    const gap = 16;
    const translateAmount = index * (itemWidth + gap);

    track.style.transform = `translateX(-${translateAmount}px)`;

    buttons[0].disabled = index === 0;
    buttons[1].disabled = index >= maxIndex;

    updateIndicators(item, track, index, indicator);
}

function updateIndicators(item, track, index, indicator) {
    if (!indicator) return;

    indicator.innerHTML = '';
    const maxIndex = item.length - itemsPerView;

    for (let i = 0; i <= maxIndex; i++) {
        const dot = document.createElement('button');
        dot.className = `w-2 h-2 rounded-full transition-all ${i === index ? 'bg-secondary w-6' : 'bg-gray-300'
            }`;
        dot.addEventListener('click', () => {
            currentIndex = i;
            updateSlider(item, track, index);
        });
        indicator.appendChild(dot);
    }
}







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
