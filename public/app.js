let normalbtn= document.getElementById("normal-btn");


normalbtn.addEventListener("click", function () {
  window.location.href = "normal.html"; // Change to your target URL or file
});



const menuToggle = document.querySelector(".menu-toggle");
const navMenu = document.querySelector(".header-nav");

menuToggle.addEventListener("click", () => {
  navMenu.classList.toggle("show");
});
