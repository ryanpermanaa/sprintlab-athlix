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

    if (navbarElement) {
        window.addEventListener('scroll', () => {
            if (window.scrollY > 100) {
                navbarElement.classList.add('scrolled');
            } else {
                navbarElement.classList.remove('scrolled');
            }
        });
    }
});
