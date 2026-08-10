const toggle = document.querySelector(".mobile-toggle");

if (toggle) {
  toggle.addEventListener("click", () => {
    document.body.classList.toggle("menu-open");
  });
}

document.querySelectorAll(".nav-links a").forEach((link) => {
  link.addEventListener("click", () => document.body.classList.remove("menu-open"));
});
