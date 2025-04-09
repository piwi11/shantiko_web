function toggleMenu() {
    const menu = document.getElementById("menu");
    menu.classList.toggle("active");
    toggleMenuButton();
}

function closeMenu() {
    const menu = document.getElementById("menu");
    menu.classList.remove("active");
}

function toggleMenuButton() {
    const menu_button = document.getElementById("menu_button");
    menu_button.classList.toggle("active");
}

const flips = document.querySelectorAll(".flip-container");
Array.from(flips).forEach(function (element) {
    element.addEventListener("click", () => element.classList.toggle("active"));
});
