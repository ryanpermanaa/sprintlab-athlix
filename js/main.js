// Load reusable partials (navbar, footer)
async function loadPartials(navbar, footer) {
    const includeNavbar = document.querySelector("[data-include-navbar]");
    const includeFooter = document.querySelector("[data-include-footer]");

    const navbarResponse = await fetch("partials/" + navbar);
    const footerResponse = await fetch("partials/" + footer);

    includeNavbar.outerHTML = await navbarResponse.text();
    includeFooter.outerHTML = await footerResponse.text();
}

// Load the page inside #app
async function loadPage(page, navbar = 'navbar.html', footer = 'footer.html') {
    loadPartials(navbar, footer);

    const app = document.getElementById("app");
    const response = await fetch(`pages/${page}.html`);
    app.innerHTML = await response.text();
}

// Initialize app
document.addEventListener("DOMContentLoaded", async () => {
    await loadPage("home"); // default page
});
