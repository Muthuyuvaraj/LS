/* =========================
   MAIN.JS - GENERAL FUNCTIONALITY
   ========================= */

document.addEventListener('DOMContentLoaded', function() {
  
  // Initialize Swiper for Services
  if (typeof Swiper !== 'undefined') {
    const myServicesSwiper = new Swiper(".myServicesSwiper", {
      slidesPerView: 1.1,
      spaceBetween: 20,
      pagination: {
        el: ".swiper-pagination",
        clickable: true,
      },
      breakpoints: {
        640: {
          slidesPerView: 2.2,
          spaceBetween: 25,
        },
        1024: {
          slidesPerView: 3,
          spaceBetween: 30,
        }
      }
    });

    // Testimonials Swiper
    const mySwiper = new Swiper(".mySwiper", {
      slidesPerView: 1,
      spaceBetween: 20,
      pagination: {
        el: ".swiper-pagination",
        clickable: true,
      },
      autoplay: {
        delay: 5000,
        disableOnInteraction: false,
      },
      breakpoints: {
        640: {
          slidesPerView: 2,
          spaceBetween: 25,
        },
        1024: {
          slidesPerView: 3,
          spaceBetween: 30,
        }
      }
    });
  }

  // Smooth Scroll for Anchor Links
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
      const href = this.getAttribute('href');
      
      // Skip if href is just "#"
      if (href === '#') return;
      
      e.preventDefault();
      const target = document.querySelector(href);
      
      if (target) {
        target.scrollIntoView({
          behavior: 'smooth',
          block: 'start'
        });
      }
    });
  });

  // Add Scroll Animation for Elements
  const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
  };

  const observer = new IntersectionObserver(function(entries) {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.style.animation = 'fadeInUp 0.6s ease forwards';
        observer.unobserve(entry.target);
      }
    });
  }, observerOptions);

  // Observe Feature Boxes and Cards
  document.querySelectorAll('.feature-box, .testimonial-card, .service-feature').forEach(el => {
    el.style.opacity = '0';
    observer.observe(el);
  });

  // Fade In Up Animation
  const style = document.createElement('style');
  style.innerHTML = `
    @keyframes fadeInUp {
      from {
        opacity: 0;
        transform: translateY(30px);
      }
      to {
        opacity: 1;
        transform: translateY(0);
      }
    }
  `;
  document.head.appendChild(style);

  // Search Functionality (if search icon exists)
  const searchIcon = document.querySelector('.fa-magnifying-glass');
  if (searchIcon) {
    searchIcon.addEventListener('click', function() {
      const searchQuery = prompt('What are you looking for?');
      if (searchQuery) {
        // Implement search functionality
        console.log('Search for:', searchQuery);
      }
    });
  }
});

// Utility: Add Active Class to Current Nav Link
document.addEventListener('DOMContentLoaded', function() {
  const currentLocation = location.pathname;
  const navLinks = document.querySelectorAll('.nav-links a, .mobile-menu a');
  
  navLinks.forEach(link => {
    if (link.getAttribute('href') === currentLocation) {
      link.classList.add('active');
    }
  });
});
