// Load reusable partials (navbar, footer)
async function loadPartials() {
    const includeElements = document.querySelectorAll("[data-include]");
    for (const el of includeElements) {
        const file = el.getAttribute("data-include");
        const response = await fetch(file);
        el.outerHTML = await response.text();
    }
}

// Load the page inside #app
async function loadPage(page) {
    const app = document.getElementById("app");
    const response = await fetch(`pages/${page}.html`);
    app.innerHTML = await response.text();
}

// Initialize app
document.addEventListener("DOMContentLoaded", async () => {
    await loadPartials();
    await loadPage("home"); // default page
});
