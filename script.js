// IFN Sensor Flow - Interactive JavaScript

document.addEventListener("DOMContentLoaded", function () {
  // Initialize all animations and effects
  initFloatingParticles();
  initScrollAnimations();
  initMobileMenu();
  initSmoothScrolling();
  initIntersectionObserver();
  initProductAnimations();
  initHeaderScroll();
});

// Floating Particles Animation
function initFloatingParticles() {
  const particlesContainer = document.getElementById("particles");
  if (!particlesContainer) return;

  const particleCount = 20;
  const colors = ["#2D8A8A", "#E8A87C", "#D4C5B0", "#DAA520"];

  for (let i = 0; i < particleCount; i++) {
    createParticle(particlesContainer, colors);
  }
}

function createParticle(container, colors) {
  const particle = document.createElement("div");
  particle.className = "particle";

  // Random properties
  const size = Math.random() * 8 + 4;
  const x = Math.random() * 100;
  const y = Math.random() * 100;
  const color = colors[Math.floor(Math.random() * colors.length)];
  const duration = Math.random() * 5 + 8;
  const delay = Math.random() * 5;

  particle.style.cssText = `
        width: ${size}px;
        height: ${size}px;
        left: ${x}%;
        top: ${y}%;
        background: ${color};
        animation-duration: ${duration}s;
        animation-delay: ${delay}s;
    `;

  container.appendChild(particle);
}

// Scroll Animations with Intersection Observer
function initIntersectionObserver() {
  const observerOptions = {
    threshold: 0.1,
    rootMargin: "0px 0px -50px 0px",
  };

  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add("animate");

        // Special handling for different elements
        if (entry.target.classList.contains("concept-card")) {
          animateConceptCard(entry.target);
        } else if (entry.target.classList.contains("benefit-item")) {
          animateBenefitItem(entry.target);
        } else if (entry.target.classList.contains("ingredient-card")) {
          animateIngredientCard(entry.target);
        }
      }
    });
  }, observerOptions);

  // Observe elements
  const elementsToObserve = [
    ".concept-card",
    ".benefit-item",
    ".ingredient-card",
    ".value-item",
    ".animate-on-scroll",
  ];

  elementsToObserve.forEach((selector) => {
    document.querySelectorAll(selector).forEach((el) => {
      observer.observe(el);
    });
  });
}

// Concept Card Animation
function animateConceptCard(card) {
  const delay = parseInt(card.dataset.delay) || 0;
  setTimeout(() => {
    card.style.transform = "translateY(0) rotate(0deg)";
    card.style.opacity = "1";

    // Add shimmer effect
    addShimmerEffect(card);
  }, delay);
}

// Benefit Item Animation
function animateBenefitItem(item) {
  const isEven = Array.from(item.parentNode.children).indexOf(item) % 2 === 1;
  const direction = isEven ? "translateX(0)" : "translateX(0)";

  item.style.transform = direction;
  item.style.opacity = "1";

  // Animate icon
  const icon = item.querySelector(".benefit-icon");
  if (icon) {
    setTimeout(() => {
      icon.style.transform = "scale(1.1) rotate(360deg)";
      setTimeout(() => {
        icon.style.transform = "scale(1) rotate(0deg)";
      }, 600);
    }, 300);
  }
}

// Ingredient Card Animation
function animateIngredientCard(card) {
  const delay = Math.random() * 500;
  setTimeout(() => {
    card.style.transform = "translateY(0) rotate(0deg)";
    card.style.opacity = "1";

    // Special animation for special ingredient
    if (card.classList.contains("special-ingredient")) {
      addGoldenGlow(card);
    }
  }, delay);
}

// Add shimmer effect to cards
function addShimmerEffect(element) {
  element.style.position = "relative";
  element.style.overflow = "hidden";

  const shimmer = document.createElement("div");
  shimmer.style.cssText = `
        position: absolute;
        top: 0;
        left: -100%;
        width: 100%;
        height: 100%;
        background: linear-gradient(90deg, transparent, rgba(255,255,255,0.4), transparent);
        animation: shimmer 2s ease-in-out;
        pointer-events: none;
    `;

  element.appendChild(shimmer);

  // Add shimmer animation CSS if not exists
  if (!document.querySelector("#shimmer-style")) {
    const style = document.createElement("style");
    style.id = "shimmer-style";
    style.textContent = `
            @keyframes shimmer {
                0% { left: -100%; }
                100% { left: 100%; }
            }
        `;
    document.head.appendChild(style);
  }

  setTimeout(() => {
    element.removeChild(shimmer);
  }, 2000);
}

// Add golden glow effect
function addGoldenGlow(element) {
  element.style.boxShadow = "0 0 30px rgba(218, 165, 32, 0.5)";
  setTimeout(() => {
    element.style.boxShadow = "";
  }, 2000);
}

// Product Animations
function initProductAnimations() {
  // Floating product animation
  const productImages = document.querySelectorAll(
    ".product-image, .main-product-img"
  );
  productImages.forEach((img) => {
    img.addEventListener("mouseenter", () => {
      img.style.transform = "scale(1.05) rotate(5deg)";
    });

    img.addEventListener("mouseleave", () => {
      img.style.transform = "scale(1) rotate(0deg)";
    });
  });

  // Ingredient cards hover effect
  const ingredientCards = document.querySelectorAll(".ingredient-card");
  ingredientCards.forEach((card) => {
    card.addEventListener("mouseenter", () => {
      // Create floating particles around the card
      createFloatingParticles(card);
    });
  });
}

// Create floating particles for ingredient cards
function createFloatingParticles(element) {
  const rect = element.getBoundingClientRect();
  const particleCount = 5;

  for (let i = 0; i < particleCount; i++) {
    const particle = document.createElement("div");
    particle.style.cssText = `
            position: fixed;
            width: 6px;
            height: 6px;
            background: #2D8A8A;
            border-radius: 50%;
            pointer-events: none;
            z-index: 1000;
            left: ${rect.left + Math.random() * rect.width}px;
            top: ${rect.top + Math.random() * rect.height}px;
            animation: floatAway 2s ease-out forwards;
        `;

    document.body.appendChild(particle);

    setTimeout(() => {
      document.body.removeChild(particle);
    }, 2000);
  }

  // Add float away animation if not exists
  if (!document.querySelector("#float-away-style")) {
    const style = document.createElement("style");
    style.id = "float-away-style";
    style.textContent = `
            @keyframes floatAway {
                0% { 
                    opacity: 1; 
                    transform: translateY(0) scale(1); 
                }
                100% { 
                    opacity: 0; 
                    transform: translateY(-50px) scale(0); 
                }
            }
        `;
    document.head.appendChild(style);
  }
}

// Mobile Menu
function initMobileMenu() {
  const mobileMenuBtn = document.getElementById("mobileMenuBtn");
  const navMenu = document.getElementById("navMenu");

  if (mobileMenuBtn && navMenu) {
    mobileMenuBtn.addEventListener("click", () => {
      navMenu.classList.toggle("active");
      mobileMenuBtn.classList.toggle("active");
    });
  }
}

// Smooth Scrolling
function initSmoothScrolling() {
  // Smooth scroll for navigation links
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
}

// Global scroll function for buttons
window.scrollToSection = function (sectionId) {
  const section = document.getElementById(sectionId);
  if (section) {
    section.scrollIntoView({
      behavior: "smooth",
      block: "start",
    });
  }
};

// Header scroll effect
function initHeaderScroll() {
  const header = document.getElementById("header");
  let lastScrollTop = 0;

  window.addEventListener("scroll", () => {
    const scrollTop = window.pageYOffset || document.documentElement.scrollTop;

    if (scrollTop > 100) {
      header.classList.add("scrolled");
    } else {
      header.classList.remove("scrolled");
    }

    // Hide/show header on scroll
    if (scrollTop > lastScrollTop && scrollTop > 200) {
      header.style.transform = "translateY(-100%)";
    } else {
      header.style.transform = "translateY(0)";
    }

    lastScrollTop = scrollTop;
  });
}

// Scroll Animations for general elements
function initScrollAnimations() {
  const animateElements = document.querySelectorAll(".animate-on-scroll");

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("animated");
        }
      });
    },
    {
      threshold: 0.1,
      rootMargin: "0px 0px -50px 0px",
    }
  );

  animateElements.forEach((el) => observer.observe(el));
}

// CTA Button Effects
document.addEventListener("DOMContentLoaded", function () {
  const ctaButtons = document.querySelectorAll(".cta-button");

  ctaButtons.forEach((button) => {
    button.addEventListener("click", function (e) {
      // Create ripple effect
      const ripple = document.createElement("span");
      const rect = button.getBoundingClientRect();
      const size = Math.max(rect.width, rect.height);
      const x = e.clientX - rect.left - size / 2;
      const y = e.clientY - rect.top - size / 2;

      ripple.style.cssText = `
                position: absolute;
                width: ${size}px;
                height: ${size}px;
                left: ${x}px;
                top: ${y}px;
                background: rgba(255, 255, 255, 0.3);
                border-radius: 50%;
                transform: scale(0);
                animation: ripple 0.6s ease-out;
                pointer-events: none;
            `;

      button.appendChild(ripple);

      setTimeout(() => {
        button.removeChild(ripple);
      }, 600);
    });
  });

  // Add ripple animation CSS
  if (!document.querySelector("#ripple-style")) {
    const style = document.createElement("style");
    style.id = "ripple-style";
    style.textContent = `
            @keyframes ripple {
                to {
                    transform: scale(2);
                    opacity: 0;
                }
            }
        `;
    document.head.appendChild(style);
  }
});

// Parallax effect for backgrounds
function initParallaxEffect() {
  const parallaxElements = document.querySelectorAll(
    ".ingredients-background, .cta-visual"
  );

  window.addEventListener("scroll", () => {
    const scrolled = window.pageYOffset;

    parallaxElements.forEach((element) => {
      const rate = scrolled * -0.5;
      element.style.transform = `translateY(${rate}px)`;
    });
  });
}

// Initialize parallax on load
document.addEventListener("DOMContentLoaded", initParallaxEffect);

// Loading animation
function initLoadingAnimation() {
  const body = document.body;
  body.style.opacity = "0";

  window.addEventListener("load", () => {
    body.style.transition = "opacity 0.5s ease-in-out";
    body.style.opacity = "1";
  });
}

// Initialize loading animation
initLoadingAnimation();

// Add cursor trail effect
document.addEventListener("mousemove", function (e) {
  // Only on desktop
  if (window.innerWidth > 768) {
    createCursorTrail(e.clientX, e.clientY);
  }
});

function createCursorTrail(x, y) {
  const trail = document.createElement("div");
  trail.style.cssText = `
        position: fixed;
        width: 8px;
        height: 8px;
        background: rgba(45, 138, 138, 0.3);
        border-radius: 50%;
        pointer-events: none;
        z-index: 10000;
        left: ${x - 4}px;
        top: ${y - 4}px;
        animation: cursorTrail 1s ease-out forwards;
    `;

  document.body.appendChild(trail);

  setTimeout(() => {
    document.body.removeChild(trail);
  }, 1000);
}

// Add cursor trail animation CSS
if (!document.querySelector("#cursor-trail-style")) {
  const style = document.createElement("style");
  style.id = "cursor-trail-style";
  style.textContent = `
        @keyframes cursorTrail {
            0% {
                opacity: 1;
                transform: scale(1);
            }
            100% {
                opacity: 0;
                transform: scale(0);
            }
        }
    `;
  document.head.appendChild(style);
}

// Add dynamic header styles
const headerStyle = document.createElement("style");
headerStyle.textContent = `
    .floating-header.scrolled {
        background: rgba(255, 255, 255, 0.98);
        box-shadow: 0 2px 20px rgba(45, 138, 138, 0.1);
    }
    
    .floating-header {
        transition: all 0.3s ease;
    }
    
    @media (max-width: 768px) {
        .nav-menu.active {
            display: flex;
            flex-direction: column;
            position: absolute;
            top: 100%;
            left: 0;
            right: 0;
            background: rgba(255, 255, 255, 0.98);
            backdrop-filter: blur(20px);
            padding: 20px;
            border-radius: 0 0 20px 20px;
            box-shadow: 0 8px 30px rgba(45, 138, 138, 0.15);
        }
        
        .mobile-menu-btn.active span:nth-child(1) {
            transform: rotate(45deg) translate(5px, 5px);
        }
        
        .mobile-menu-btn.active span:nth-child(2) {
            opacity: 0;
        }
        
        .mobile-menu-btn.active span:nth-child(3) {
            transform: rotate(-45deg) translate(7px, -6px);
        }
    }
`;
document.head.appendChild(headerStyle);

// Performance optimization: Throttle scroll events
function throttle(func, limit) {
  let inThrottle;
  return function () {
    const args = arguments;
    const context = this;
    if (!inThrottle) {
      func.apply(context, args);
      inThrottle = true;
      setTimeout(() => (inThrottle = false), limit);
    }
  };
}

// Apply throttling to scroll events
window.addEventListener(
  "scroll",
  throttle(function () {
    // Any scroll-based animations can be added here
  }, 16)
); // ~60fps

// Add page transition effects
document.addEventListener("DOMContentLoaded", function () {
  // Fade in page content
  document.body.style.animation = "fadeInPage 1s ease-out";

  // Add fade in animation
  const pageStyle = document.createElement("style");
  pageStyle.textContent = `
        @keyframes fadeInPage {
            from { opacity: 0; }
            to { opacity: 1; }
        }
    `;
  document.head.appendChild(pageStyle);
});

console.log("🌟 IFN Sensor Flow - Interactive features loaded successfully!");
