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

// ?
// ?  INFIITE LOGO SLIDER ANIMATION
// ?

const sliderElements = document.querySelectorAll('.animate-scroll');

sliderElements.forEach(el => {
    let copy = el.querySelector('.flex').cloneNode(true);
    el.appendChild(copy);
});
