window.addEventListener('load', function () {
  if (typeof Swiper === 'undefined') return;
  if (document.querySelector('.myServicesSwiper')) {
    new Swiper('.myServicesSwiper', {
      loop: true, slidesPerView: 1, spaceBetween: 30, speed: 600,
      autoplay: { delay: 2500, disableOnInteraction: false, pauseOnMouseEnter: true },
      pagination: { el: '.servicesSwiper-pagination', clickable: true },
      breakpoints: { 768: { slidesPerView: 2 }, 1024: { slidesPerView: 3 } },
    });
  }
  if (document.querySelector('.mySwiper')) {
    new Swiper('.mySwiper', {
      loop: true, slidesPerView: 1, spaceBetween: 20, speed: 600,
      autoplay: { delay: 5000, disableOnInteraction: false },
      pagination: { el: '.testimonial-section .swiper-pagination', clickable: true },
      breakpoints: { 768: { slidesPerView: 2 } },
    });
  }
});
