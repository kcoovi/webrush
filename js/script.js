document.addEventListener("DOMContentLoaded", function () {
  // Navigation functionality
  const hamburger = document.querySelector(".hamburger");
  const navMenu = document.querySelector(".nav-menu");
  const navContainer = document.querySelector(".nav-container");
  const donateLink = document.querySelector(".donate-link");
  const overlay = document.querySelector(".overlay");
  const body = document.body;

  function closeMenu() {
    navMenu.classList.remove("active");
    hamburger.classList.remove("active");
    overlay?.classList.remove("active");
    body.classList.remove("menu-open");
    hamburger.setAttribute("aria-expanded", "false");
  }

  if (hamburger && navMenu) {
    hamburger.addEventListener("click", function () {
      const isExpanded = this.getAttribute("aria-expanded") === "true";
      this.setAttribute("aria-expanded", !isExpanded);
      navMenu.classList.toggle("active");
      hamburger.classList.toggle("active");
      overlay?.classList.toggle("active");
      body.classList.toggle("menu-open");
    });
  }

  overlay?.addEventListener("click", closeMenu);
  document.querySelectorAll(".nav-menu a").forEach((link) => {
    link.addEventListener("click", () => {
      if (window.innerWidth <= 1024) {
        closeMenu();
      }
    });
  });

  window.addEventListener("resize", () => {
    if (window.innerWidth > 1024) {
      closeMenu();
    }
  });

  document.addEventListener("keydown", (e) => {
    if (e.key === "Escape" && navMenu.classList.contains("active")) {
      closeMenu();
    }
  });

  // Navbar scroll effect
  let lastScroll = 0;
  window.addEventListener("scroll", () => {
    const currentScroll = window.pageYOffset;
    
    if (currentScroll > 50) {
      navContainer?.classList.add("scrolled");
    } else {
      navContainer?.classList.remove("scrolled");
    }
    
    lastScroll = currentScroll;
  }, { passive: true });

  // Active page detection
  let currentPage = window.location.pathname.split("/").pop();
  if (!currentPage || currentPage === "index.html") {
    currentPage = "index.html";
  }

  document.querySelectorAll(".nav-menu a").forEach((link) => {
    const linkPage = link.getAttribute("href").split("/").pop();
    if (linkPage === currentPage) {
      link.classList.add("active");
    } else {
      link.classList.remove("active");
    }
  });

  if (donateLink && currentPage === "donate.html") {
    donateLink.classList.add("active");
  }

  // Smooth scroll for anchor links
  document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
    anchor.addEventListener("click", function (e) {
      const targetId = this.getAttribute("href");
      const target = document.querySelector(targetId);
      if (target) {
        e.preventDefault();
        target.scrollIntoView({ behavior: "smooth", block: "start" });
      }
    });
  });

  // Intersection Observer for scroll animations
  const observerOptions = {
    root: null,
    rootMargin: '0px',
    threshold: 0.1
  };

  const animateOnScroll = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('animate-in');
        animateOnScroll.unobserve(entry.target);
      }
    });
  }, observerOptions);

  // Observe elements for scroll animation
  document.querySelectorAll('section, .gallery-img, .about-content').forEach(el => {
    el.classList.add('animate-ready');
    animateOnScroll.observe(el);
  });
});
