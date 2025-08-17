const menuToggle = document.querySelector(".menu-toggle");
const navMenu = document.querySelector(".header-nav");

menuToggle.addEventListener("click", () => {
  navMenu.classList.toggle("show");
});