/* =========================
   HEADER.JS - MOBILE NAV & DROPDOWN
   ========================= */

function initializeHeader() {
  // Mobile Navigation
  const hamburger = document.querySelector(".hamburger");
  const panel = document.querySelector(".mobile-panel");
  const navOverlay = document.querySelector(".panel-overlay");
  const closeBtn = document.querySelector(".close-panel");

  if (hamburger && panel && navOverlay && closeBtn) {
    const closePanel = () => {
      panel.classList.remove("open");
      navOverlay.classList.remove("show");
      document.body.style.overflow = "auto";
    };

    const openPanel = () => {
      panel.classList.add("open");
      navOverlay.classList.add("show");
      document.body.style.overflow = "hidden";
    };

    hamburger.addEventListener("click", openPanel);
    closeBtn.addEventListener("click", closePanel);
    navOverlay.addEventListener("click", closePanel);

    // Close panel when a link is clicked (but not dropdown triggers)
    const mobileLinks = panel.querySelectorAll('a');
    mobileLinks.forEach(link => {
      link.addEventListener('click', closePanel);
    });

    // Prevent submenu link clicks from closing dropdown
    const submenuLinks = panel.querySelectorAll('.m-submenu a');
    submenuLinks.forEach(link => {
      link.addEventListener('click', e => {
        e.stopPropagation();
        // Let it close after navigation
        setTimeout(closePanel, 300);
      });
    });
  }

  // Mobile Dropdowns
  document.querySelectorAll(".m-trigger").forEach(trigger => {
    trigger.addEventListener("click", e => {
      e.preventDefault();
      e.stopPropagation();

      const drop = trigger.closest(".m-dropdown");
      const toggle = trigger.querySelector(".toggle");

      // Close others
      document.querySelectorAll(".m-dropdown.open").forEach(d => {
        if (d !== drop) {
          d.classList.remove("open");
          const t = d.querySelector(".toggle");
          if (t) t.textContent = "+";
        }
      });

      drop.classList.toggle("open");
      toggle.textContent = drop.classList.contains("open") ? "−" : "+";
    });
  });

  // Desktop Dropdown Enhancements
  document.querySelectorAll(".dropdown").forEach(drop => {
    const submenu = drop.querySelector(".submenu");
    
    if (submenu) {
      drop.addEventListener("mouseenter", () => {
        submenu.style.opacity = "1";
        submenu.style.visibility = "visible";
      });
      
      drop.addEventListener("mouseleave", () => {
        submenu.style.opacity = "0";
        submenu.style.visibility = "hidden";
      });
    }
  });
}

// Run on DOMContentLoaded
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', initializeHeader);
} else {
  // DOM is already loaded
  initializeHeader();
}
