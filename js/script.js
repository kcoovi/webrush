document.addEventListener("DOMContentLoaded", function () {
  // Mobile Menu Elements
  const hamburger = document.querySelector(".hamburger");
  const navMenu = document.querySelector(".nav-menu");
  const donateLink = document.querySelector(".donate-link");
  const overlay = document.querySelector(".overlay");
  const body = document.body;

  // Function to close the mobile menu
  function closeMenu() {
    navMenu.classList.remove("active");
    hamburger.classList.remove("active");
    overlay.classList.remove("active");
    body.classList.remove("menu-open");
    hamburger.setAttribute("aria-expanded", "false");
  }

  // Toggle mobile menu
  if (hamburger && navMenu) {
    hamburger.addEventListener("click", function () {
      const isExpanded = this.getAttribute("aria-expanded") === "true";
      this.setAttribute("aria-expanded", !isExpanded);
      navMenu.classList.toggle("active");
      hamburger.classList.toggle("active");
      overlay.classList.toggle("active");
      body.classList.toggle("menu-open");
    });
  }

  // Close menu when clicking overlay
  if (overlay) {
    overlay.addEventListener("click", closeMenu);
  }

  // Close mobile menu when clicking navigation links
  document.querySelectorAll(".nav-menu a").forEach((link) => {
    link.addEventListener("click", () => {
      if (window.innerWidth <= 1024) {
        closeMenu();
      }
    });
  });

  // Close menu when resizing above mobile breakpoint
  window.addEventListener("resize", function () {
    if (window.innerWidth > 1024) {
      closeMenu();
    }
  });

  // Accessibility - Close menu on ESC key press
  document.addEventListener("keydown", function (e) {
    if (e.key === "Escape" && navMenu.classList.contains("active")) {
      closeMenu();
    }
  });

  // Active Page Indicator
  const currentPage = window.location.pathname.split("/").pop() || "index.html";

  document.querySelectorAll(".nav-menu a").forEach((link) => {
    const linkPage = link.getAttribute("href").split("/").pop();

    // Check if the current page matches the link OR it's the home page
    if (
      linkPage === currentPage ||
      (currentPage === "index.html" && linkPage === "")
    ) {
      link.classList.add("active");
    } else {
      link.classList.remove("active");
    }
  });

  // Set active class for donate link separately
  if (donateLink && currentPage === "donate.html") {
    donateLink.classList.add("active");
  }

  // Smooth scroll for anchor links
  document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
    anchor.addEventListener("click", function (e) {
      e.preventDefault();
      const target = document.querySelector(this.getAttribute("href"));
      if (target) {
        target.scrollIntoView({ behavior: "smooth", block: "start" });
      }
    });
  });
});
