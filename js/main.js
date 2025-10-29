// Load reusable partials (navbar, footer)
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
});

// *
// *  INFINITE LOGO SLIDER ANIMATION
// *

const sliderElements = document.querySelectorAll('.animate-scroll');

sliderElements.forEach(el => {
    let copy = el.querySelector('.flex').cloneNode(true);
    el.appendChild(copy);
});


// *
// *  HORIZONTAL PARALLAX SCROLL ANIMATION
// *

// content duplication
const scrollParallaxElements = document.querySelectorAll("[data-scroll-parallax]");
scrollParallaxElements.forEach(el => {
    const children = Array.from(el.children);
    const repeatCount = Math.ceil(window.innerWidth / 350);

    for (let i = 0; i < repeatCount - 1; i++) {
        children.forEach(child => {
            const copy = child.cloneNode(true);
            el.appendChild(copy);
        });
    }
});

// functioning parallax
const sportlifeParallax = document.querySelector("#sportlife-parallax");
const gamereadyParallax = document.querySelector("#gameready-parallax");

const slPositionTop = sportlifeParallax.getBoundingClientRect().top + window.scrollY;
const slHeight = sportlifeParallax.offsetHeight;

const grPositionTop = gamereadyParallax.getBoundingClientRect().top + window.scrollY;
const grHeight = gamereadyParallax.offsetHeight;

window.addEventListener('scroll', () => {
    const scrollY = window.scrollY;
    const windowHeight = window.innerHeight;

    const isVisible_sl = scrollY + windowHeight > slPositionTop && scrollY < slPositionTop + slHeight;
    const isVisible_gr = scrollY + windowHeight > grPositionTop && scrollY < grPositionTop + grHeight;

    if (isVisible_sl) {
        const offset_sl = (scrollY - slPositionTop) * -0.3;
        sportlifeParallax.style.transform = `translateX(calc(${offset_sl}px - 20%))`;
    }

    if (isVisible_gr) {
        const offset_gr = (scrollY - grPositionTop) * 0.3;
        gamereadyParallax.style.transform = `translateX(${offset_gr}px)`;
    }
});


// *
// *  FAQ BUTTON FUNCTIONALITY
// *
const faqBtn = document.querySelectorAll('.faq-btn');

toggleFaq(faqBtn[0]);

function toggleFaq(button) {
    // when triggered by event, `button` will be the Event object
    if (button instanceof Event) {
        button = button.currentTarget;
    }

    // collapse other FAQs
    faqBtn.forEach(btn => {
        const content = btn.nextElementSibling;
        const icon = btn.querySelector('svg');

        if (btn !== button) {
            content.style.maxHeight = null;
            icon.classList.remove('rotate-180');
        }
    });

    const content = button.nextElementSibling;
    const icon = button.querySelector('svg');

    if (content.style.maxHeight) {
        content.style.maxHeight = null;
    } else {
        content.style.maxHeight = content.scrollHeight + 'px';
    }

    icon.classList.toggle('rotate-180');
}

faqBtn.forEach(btn => {
    btn.addEventListener('click', toggleFaq);
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

function updateSlider(item, track, index, indicator = null) {
    itemsPerView = calculateItemsPerView();
    const maxIndex = item.length - itemsPerView;

    // Ensure index is within bounds
    if (index > maxIndex) index = maxIndex;
    if (maxIndex < 0) index = 0;

    // Calculate translation
    const itemWidth = item[0].offsetWidth;
    const gap = 20;
    const translateAmount = index * (itemWidth + gap);

    track.style.transform = `translateX(-${translateAmount}px)`;

    testimonialPrevBtn.disabled = index === 0;
    testimonialNextBtn.disabled = index >= maxIndex;

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
        indicators.appendChild(dot);
    }
}


// *
// *  SLIDER FUNCTIONALITY
// *

//? For testimonial section
const testimonialTrack = document.getElementById('testimonialTrack');
const testimonialPrevBtn = document.getElementById('prevBtnTestimonial');
const testimonialNextBtn = document.getElementById('nextBtnTestimonial');
const testimonialItem = testimonialTrack.children;
let currentTestimonialIndex = 0;

testimonialPrevBtn.addEventListener('click', () => {
    if (currentTestimonialIndex > 0) {
        currentTestimonialIndex--;
        updateSlider(testimonialItem, testimonialTrack, currentTestimonialIndex);
    }
});

testimonialNextBtn.addEventListener('click', () => {
    const maxIndex = testimonialItem.length - itemsPerView;
    if (currentTestimonialIndex < maxIndex) {
        currentTestimonialIndex++;
        updateSlider(testimonialItem, testimonialTrack, currentTestimonialIndex);
    }
});

//? For venue booking section
// const track = document.getElementById('sliderTrack');
// const prevBtn = document.getElementById('prevBtn');
// const nextBtn = document.getElementById('nextBtn');
// const indicators = document.getElementById('indicators');
// const items = track.children;
// let currentFieldIndex = 0;

// prevBtn.addEventListener('click', () => {
//     if (currentIndex > 0) {
//         currentIndex--;
//         updateSlider();
//     }
// });

// nextBtn.addEventListener('click', () => {
//     const maxIndex = items.length - itemsPerView;
//     if (currentIndex < maxIndex) {
//         currentIndex++;
//         updateSlider();
//     }
// });


// Handle resize
let resizeTimer;
window.addEventListener('resize', () => {
    clearTimeout(resizeTimer);
    resizeTimer = setTimeout(() => {
        updateSlider(testimonialItem, testimonialTrack, currentTestimonialIndex);
        // updateSlider()
    }, 100);
});

updateSlider(testimonialItem, testimonialTrack, currentTestimonialIndex);







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
