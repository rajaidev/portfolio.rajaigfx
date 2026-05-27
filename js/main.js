/* ============================================================
   PORTFOLIO — main.js
   All interactions, animations, scroll effects, dark/light mode
   ============================================================ */

(function () {
  "use strict";

  /* ── 1. THEME SYSTEM (system default + toggle) ── */
  const THEME_KEY = "portfolio-theme";

  function getInitialTheme() {
    const saved = localStorage.getItem(THEME_KEY);
    if (saved) return saved;
    return window.matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light";
  }

  function applyTheme(theme) {
    document.documentElement.setAttribute("data-theme", theme);
    localStorage.setItem(THEME_KEY, theme);
  }

  // Apply immediately (before DOM renders) to prevent flash
  applyTheme(getInitialTheme());

  document.addEventListener("DOMContentLoaded", function () {

    /* ── 2. THEME TOGGLE BUTTON ── */
    const themeBtn = document.getElementById("theme-toggle");
    if (themeBtn) {
      themeBtn.addEventListener("click", function () {
        const current = document.documentElement.getAttribute("data-theme");
        applyTheme(current === "dark" ? "light" : "dark");
      });
    }

    // Listen to OS preference changes (if user hasn't manually set a preference)
    window.matchMedia("(prefers-color-scheme: dark)").addEventListener("change", function (e) {
      if (!localStorage.getItem(THEME_KEY)) {
        applyTheme(e.matches ? "dark" : "light");
      }
    });


    /* ── 3. NAVBAR SCROLL EFFECT ── */
    const navbar = document.getElementById("navbar");

    function handleNavScroll() {
      if (window.scrollY > 50) {
        navbar.classList.add("scrolled");
      } else {
        navbar.classList.remove("scrolled");
      }
    }

    window.addEventListener("scroll", handleNavScroll, { passive: true });


    /* ── 4. ACTIVE NAV LINK (highlight current section) ── */
    const sections = document.querySelectorAll("section[id]");
    const navLinks = document.querySelectorAll(".nav-links a[href^='#']");

    function updateActiveLink() {
      let currentId = "";
      sections.forEach(function (sec) {
        const top = sec.getBoundingClientRect().top;
        if (top <= 120) currentId = sec.id;
      });

      navLinks.forEach(function (link) {
        link.classList.toggle(
          "active",
          link.getAttribute("href") === "#" + currentId
        );
      });
    }

    window.addEventListener("scroll", updateActiveLink, { passive: true });


    /* ── 5. MOBILE MENU ── */
    const hamburger = document.getElementById("hamburger");
    const mobileNav = document.getElementById("mobile-nav");
    const mobileLinks = mobileNav ? mobileNav.querySelectorAll("a") : [];

    if (hamburger && mobileNav) {
      hamburger.addEventListener("click", function () {
        const isOpen = hamburger.classList.toggle("open");
        mobileNav.classList.toggle("open", isOpen);
        document.body.style.overflow = isOpen ? "hidden" : "";
      });

      mobileLinks.forEach(function (link) {
        link.addEventListener("click", function () {
          hamburger.classList.remove("open");
          mobileNav.classList.remove("open");
          document.body.style.overflow = "";
        });
      });
    }


    /* ── 6. SCROLL REVEAL ANIMATION ── */
    const revealEls = document.querySelectorAll(".reveal");

    const revealObserver = new IntersectionObserver(
      function (entries) {
        entries.forEach(function (entry) {
          if (entry.isIntersecting) {
            entry.target.classList.add("visible");
            revealObserver.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.1, rootMargin: "0px 0px -40px 0px" }
    );

    revealEls.forEach(function (el) {
      revealObserver.observe(el);
    });


    /* ── 7. STAGGERED REVEAL FOR GROUPS ── */
    const revealGroups = document.querySelectorAll(".reveal-group");

    const groupObserver = new IntersectionObserver(
      function (entries) {
        entries.forEach(function (entry) {
          if (entry.isIntersecting) {
            const children = entry.target.querySelectorAll(".reveal");
            children.forEach(function (child, i) {
              setTimeout(function () {
                child.classList.add("visible");
              }, i * 90);
            });
            groupObserver.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.08 }
    );

    revealGroups.forEach(function (group) {
      groupObserver.observe(group);
    });


    /* ── 8. CUSTOM CURSOR ── */
    const ring = document.getElementById("cursor-ring");
    const dot  = document.getElementById("cursor-dot");
    let mouseX = 0, mouseY = 0;
    let ringX = 0, ringY = 0;

    const isMobile = window.matchMedia("(pointer: coarse)").matches;
    if (isMobile && ring && dot) {
      ring.style.display = "none";
      dot.style.display  = "none";
    }

    if (!isMobile) {
      document.addEventListener("mousemove", function (e) {
        mouseX = e.clientX;
        mouseY = e.clientY;
        if (dot) {
          dot.style.left = mouseX + "px";
          dot.style.top  = mouseY + "px";
        }
      });

      // Smooth lag for ring
      function animateRing() {
        ringX += (mouseX - ringX) * 0.14;
        ringY += (mouseY - ringY) * 0.14;
        if (ring) {
          ring.style.left = ringX + "px";
          ring.style.top  = ringY + "px";
        }
        requestAnimationFrame(animateRing);
      }
      animateRing();

      // Hover expand
      const hoverables = document.querySelectorAll("a, button, .project-card, .skill-tag");
      hoverables.forEach(function (el) {
        el.addEventListener("mouseenter", function () {
          if (ring) ring.classList.add("hovering");
        });
        el.addEventListener("mouseleave", function () {
          if (ring) ring.classList.remove("hovering");
        });
      });
    }


    /* ── 9. SMOOTH SCROLL FOR ANCHOR LINKS ── */
    document.querySelectorAll('a[href^="#"]').forEach(function (anchor) {
      anchor.addEventListener("click", function (e) {
        const target = document.querySelector(this.getAttribute("href"));
        if (target) {
          e.preventDefault();
          const navHeight = navbar ? navbar.offsetHeight : 72;
          const top = target.getBoundingClientRect().top + window.scrollY - navHeight;
          window.scrollTo({ top, behavior: "smooth" });
        }
      });
    });


    /* ── 10. PROJECT CARD TILT EFFECT ── */
    const cards = document.querySelectorAll(".project-card");

    cards.forEach(function (card) {
      card.addEventListener("mousemove", function (e) {
        const rect = card.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;
        const cx = rect.width / 2;
        const cy = rect.height / 2;
        const rotX = ((y - cy) / cy) * -3;
        const rotY = ((x - cx) / cx) * 3;
        card.style.transform = "translateY(-5px) rotateX(" + rotX + "deg) rotateY(" + rotY + "deg)";
        card.style.transition = "transform 0.1s ease";
      });

      card.addEventListener("mouseleave", function () {
        card.style.transform = "";
        card.style.transition = "transform 0.5s cubic-bezier(0.25, 0.46, 0.45, 0.94), box-shadow 0.3s, border-color 0.3s";
      });
    });


    /* ── 11. TYPING EFFECT FOR HERO ROLE ── */
    const typingEl = document.getElementById("hero-role-typed");
    if (typingEl) {
      const roles = [
        "Brand Identity Designer",
        "Visual Storyteller",
        "Typography Enthusiast",
        "Creative Problem Solver",
      ];
      let roleIndex = 0;
      let charIndex = 0;
      let isDeleting = false;
      let typingPause = false;

      function typeLoop() {
        if (typingPause) return;
        const current = roles[roleIndex];

        if (isDeleting) {
          charIndex--;
        } else {
          charIndex++;
        }

        typingEl.textContent = current.substring(0, charIndex);

        let delay = isDeleting ? 45 : 80;

        if (!isDeleting && charIndex === current.length) {
          delay = 2000; // pause at end
          isDeleting = true;
        } else if (isDeleting && charIndex === 0) {
          isDeleting = false;
          roleIndex = (roleIndex + 1) % roles.length;
          delay = 400;
        }

        setTimeout(typeLoop, delay);
      }

      // Start after hero animation
      setTimeout(typeLoop, 1500);
    }


    /* ── 12. COUNTER ANIMATION FOR STATS ── */
    function animateCounter(el) {
      const target = parseInt(el.getAttribute("data-target"), 10);
      const suffix = el.getAttribute("data-suffix") || "";
      const duration = 1200;
      const step = duration / target;
      let current = 0;

      const interval = setInterval(function () {
        current++;
        el.textContent = current + suffix;
        if (current >= target) {
          el.textContent = target + suffix;
          clearInterval(interval);
        }
      }, step < 10 ? 10 : step);
    }

    const statEls = document.querySelectorAll(".stat-number[data-target]");
    let statsAnimated = false;

    const statsObserver = new IntersectionObserver(
      function (entries) {
        if (entries[0].isIntersecting && !statsAnimated) {
          statsAnimated = true;
          statEls.forEach(animateCounter);
        }
      },
      { threshold: 0.5 }
    );

    const statsSection = document.querySelector(".hero-stats");
    if (statsSection) statsObserver.observe(statsSection);


    /* ── 13. YEAR IN FOOTER ── */
    const yearEl = document.getElementById("footer-year");
    if (yearEl) yearEl.textContent = new Date().getFullYear();

  }); // end DOMContentLoaded

})();
