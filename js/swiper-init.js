// Initialize Swiper Carousels
(function() {
  // Wait a moment to ensure DOM is fully loaded
  setTimeout(function() {
    // Services Swiper
    if (document.querySelector('.myServicesSwiper')) {
      const servicesSwiper = new Swiper('.myServicesSwiper', {
        loop: true,
        slidesPerView: 1,
        spaceBetween: 30,
        speed: 600,
        autoplay: {
          delay: 1500,
          disableOnInteraction: false,
        },
        pagination: {
          el: '.servicesSwiper-pagination',
          clickable: true,
        },
        breakpoints: {
          768: {
            slidesPerView: 2,
          },
          1024: {
            slidesPerView: 3,
          },
        },
      });
    }

    // Testimonials Swiper
    if (document.querySelector('.mySwiper')) {
      const testimonialsSwiper = new Swiper('.mySwiper', {
        loop: true,
        slidesPerView: 1,
        spaceBetween: 20,
        speed: 600,
        autoplay: {
          delay: 5000,
          disableOnInteraction: false,
        },
        pagination: {
          el: '.testimonial-section .swiper-pagination',
          clickable: true,
        },
        breakpoints: {
          768: {
            slidesPerView: 2,
          },
        },
      });
    }
  }, 500);
})();
