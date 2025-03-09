document.addEventListener("DOMContentLoaded", function () {
  // Mobile Menu Elements
  const hamburger = document.querySelector(".hamburger");
  const navMenu = document.querySelector(".nav-menu");
  const donateLink = document.querySelector(".donate-link");
  const overlay = document.querySelector(".overlay");
  const body = document.body;

  // Toggle mobile menu
  if (hamburger && navMenu) {
    hamburger.addEventListener("click", function () {
      navMenu.classList.toggle("active");
      hamburger.classList.toggle("active");
      overlay.classList.toggle("active");
      body.classList.toggle("menu-open");

      // Toggle aria-expanded attribute
      const isExpanded = this.getAttribute("aria-expanded") === "true";
      this.setAttribute("aria-expanded", !isExpanded);
    });
  }

  // Close menu when clicking overlay
  overlay.addEventListener("click", () => {
    navMenu.classList.remove("active");
    hamburger.classList.remove("active");
    overlay.classList.remove("active");
    body.classList.remove("menu-open");
    hamburger.setAttribute("aria-expanded", "false");
  });

  // Close menu on resize
  window.addEventListener("resize", function () {
    if (window.innerWidth > 1024) {
      navMenu.classList.remove("active");
      hamburger.classList.remove("active");
      overlay.classList.remove("active");
      body.classList.remove("menu-open");
      hamburger.setAttribute("aria-expanded", "false");
    }
  });

  // Close mobile menu when clicking links
  document.querySelectorAll(".nav-menu a").forEach((link) => {
    link.addEventListener("click", () => {
      if (window.innerWidth <= 1024) {
        navMenu.classList.remove("active");
        hamburger.classList.remove("active");
        overlay.classList.remove("active");
        body.classList.remove("menu-open");
        hamburger.setAttribute("aria-expanded", "false");
      }
    });
  });

  // Active Page Indicator
  const currentPage = window.location.pathname.split("/").pop();

  // Set active class for navigation links
  document.querySelectorAll(".nav-menu a").forEach((link) => {
    const linkPage = link.getAttribute("href").split("/").pop();
    if (linkPage === currentPage) {
      link.classList.add("active");
    }
  });

  // Set active class for donate link
  if (donateLink && currentPage === "donate.html") {
    donateLink.classList.add("active");
  }

  // Smooth scroll for anchor links
  document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
    anchor.addEventListener("click", function (e) {
      e.preventDefault();
      const target = document.querySelector(this.getAttribute("href"));
      if (target) {
        target.scrollIntoView({
          behavior: "smooth",
          block: "start",
        });
      }
    });
  });

  // Accessibility - Close menu on ESC press
  document.addEventListener("keydown", function (e) {
    if (e.key === "Escape" && navMenu.classList.contains("active")) {
      navMenu.classList.remove("active");
      hamburger.classList.remove("active");
      overlay.classList.remove("active");
      body.classList.remove("menu-open");
      hamburger.setAttribute("aria-expanded", "false");
    }
  });
});
