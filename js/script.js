document.addEventListener("DOMContentLoaded", () => {
  const menuToggle = document.getElementById("extra");
  const navUl = document.querySelector("nav ul");

  if (menuToggle && navUl) {
    menuToggle.addEventListener("click", () => {
      navUl.classList.toggle("nav-active");
    });
  }
});

var typed = new Typed("#element", {
  strings: ["Web Developer", "Web Designer", "Content Creator"],
  typeSpeed: 50,
  backSpeed: 50,
  loop: true,
});
