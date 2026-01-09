/* ====================================
   PROJECT PAGE - All Functionality
   ==================================== */

(function () {
  // =============================================
  // MOBILE NAV
  // =============================================
  const hamburger = document.querySelector('.hamburger');
  const panel = document.querySelector('.mobile-panel');
  const overlay = document.querySelector('.panel-overlay');
  const closeBtn = document.querySelector('.close-panel');

  if (hamburger && panel && overlay && closeBtn) {
    hamburger.addEventListener('click', () => {
      panel.classList.add('open');
      overlay.classList.add('show');
    });
    closeBtn.addEventListener('click', () => {
      panel.classList.remove('open');
      overlay.classList.remove('show');
    });
    overlay.addEventListener('click', () => {
      panel.classList.remove('open');
      overlay.classList.remove('show');
    });
  }

  // Mobile dropdowns
  document.querySelectorAll('.m-dropdown').forEach((drop) => {
    const trigger = drop.querySelector('.m-trigger');
    const toggle = drop.querySelector('.toggle');
    if (!trigger || !toggle) return;
    trigger.addEventListener('click', () => {
      drop.classList.toggle('open');
      toggle.textContent = drop.classList.contains('open') ? '−' : '+';
    });
  });

  // =============================================
  // SCROLL TO SUMMARY
  // =============================================
  document.getElementById('scrollToSummary')?.addEventListener('click', () => {
    const target = document.getElementById('projectSummary');
    if (!target) return;
    window.scrollTo({
      top: target.offsetTop - 20,
      behavior: 'smooth',
    });
  });

  // =============================================
  // TABS LOGIC
  // =============================================
  const tabButtons = document.querySelectorAll('.tab-btn');
  const tabPanels = {
    overview: document.getElementById('tab-overview'),
    solution: document.getElementById('tab-solution'),
  };

  tabButtons.forEach((btn) => {
    btn.addEventListener('click', () => {
      const tabName = btn.getAttribute('data-tab');
      if (!tabName) return;

      tabButtons.forEach((b) => b.classList.remove('active'));
      btn.classList.add('active');

      Object.keys(tabPanels).forEach((key) => {
        tabPanels[key].classList.toggle('active', key === tabName);
      });
    });
  });

  // =============================================
  // COUNTER ANIMATION
  // =============================================
  const counters = document.querySelectorAll('[data-counter]');
  let countersStarted = false;

  function animateCounters() {
    if (countersStarted) return;
    countersStarted = true;

    counters.forEach((el) => {
      const target = parseInt(el.getAttribute('data-counter'), 10);
      let current = 0;
      const duration = 1100;
      const steps = 40;
      const increment = target / steps;
      let elapsed = 0;

      const interval = setInterval(() => {
        elapsed += duration / steps;
        current += increment;
        if (elapsed >= duration) {
          current = target;
          clearInterval(interval);
        }
        el.textContent = Math.round(current) + (target >= 100 ? '+' : '');
      }, duration / steps);
    });
  }

  // =============================================
  // INTERSECTION OBSERVER FOR FADE-IN & COUNTERS
  // =============================================
  const fadeInElems = document.querySelectorAll('.fade-in');
  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting) return;
        entry.target.classList.add('visible');
        animateCounters();
        observer.unobserve(entry.target);
      });
    },
    { threshold: 0.2 }
  );

  fadeInElems.forEach((el) => observer.observe(el));

  // =============================================
  // STRATEGY CARD CLICK -> CHANGE TAB
  // =============================================
  document.querySelectorAll('.strategy-card').forEach((card) => {
    card.addEventListener('click', () => {
      const kind = card.getAttribute('data-highlight');
      if (kind === 'execution') {
        document.querySelector('.tab-btn[data-tab="solution"]')?.click();
      } else {
        document.querySelector('.tab-btn[data-tab="overview"]')?.click();
      }
      card.classList.add('active-flash');
      setTimeout(() => card.classList.remove('active-flash'), 350);
    });
  });

  // =============================================
  // MODALS: OPEN / CLOSE
  // =============================================
  const openButtons = document.querySelectorAll('.project-open-btn');
  const modalOverlays = document.querySelectorAll('.project-modal-overlay');

  openButtons.forEach((btn) => {
    btn.addEventListener('click', () => {
      const id = btn.getAttribute('data-modal');
      const modal = document.getElementById(id);
      if (modal) {
        modal.classList.add('show');
      }
    });
  });

  modalOverlays.forEach((overlayEl) => {
    overlayEl.addEventListener('click', (e) => {
      if (e.target === overlayEl) {
        overlayEl.classList.remove('show');
      }
    });
  });

  document.querySelectorAll('.project-modal-close').forEach((btn) => {
    btn.addEventListener('click', () => {
      const overlayEl = btn.closest('.project-modal-overlay');
      if (overlayEl) overlayEl.classList.remove('show');
    });
  });

  // Close modal on ESC
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') {
      document.querySelectorAll('.project-modal-overlay.show').forEach((m) => m.classList.remove('show'));
    }
  });

  // =============================================
  // REQUEST ONLINE FORM MODAL + SUBMIT
  // =============================================
  const requestModal = document.getElementById('request-modal');
  if (requestModal) {
    const requestOverlay = requestModal.querySelector('.request-modal__overlay');
    const requestCloseBtn = requestModal.querySelector('.request-modal__close');

    const openRequestModal = () => {
      requestModal.classList.add('open');
      requestModal.setAttribute('aria-hidden', 'false');
      document.body.style.overflow = 'hidden';
    };

    const closeRequestModal = () => {
      requestModal.classList.remove('open');
      requestModal.setAttribute('aria-hidden', 'true');
      document.body.style.overflow = '';
    };

    document.querySelectorAll('.js-open-request-form').forEach((btn) => {
      btn.addEventListener('click', (e) => {
        e.preventDefault();
        openRequestModal();
      });
    });

    requestOverlay.addEventListener('click', closeRequestModal);
    requestCloseBtn.addEventListener('click', closeRequestModal);

    window.addEventListener('keydown', (e) => {
      if (e.key === 'Escape' && requestModal.classList.contains('open')) {
        closeRequestModal();
      }
    });

    const roForm = document.getElementById('request-online-form');
    const roSubmitBtn = document.getElementById('ro-submit-btn');

    if (roForm && roSubmitBtn) {
      roForm.addEventListener('submit', (e) => {
        e.preventDefault();

        const required = roForm.querySelectorAll('[required]');
        let ok = true;

        required.forEach((field) => {
          const isCheckbox = field.type === 'checkbox';
          const valid = isCheckbox ? field.checked : field.value.trim() !== '';
          if (!valid) {
            field.style.outline = '2px solid #fdf2e6';
            field.style.boxShadow = '0 0 0 3px rgba(247,147,30,0.2)';
            ok = false;
          } else {
            field.style.outline = '';
            field.style.boxShadow = '';
          }
        });

        if (!ok) {
          alert('Please fill all required fields and accept the terms.');
          return;
        }

        roSubmitBtn.disabled = true;
        roSubmitBtn.textContent = 'Sending...';

        const data = {
          name: roForm.name.value.trim(),
          company: roForm.company.value.trim(),
          email: roForm.email.value.trim(),
          phone: roForm.phone.value.trim(),
          service: roForm.service.value,
          location: roForm.location.value.trim(),
          message: roForm.message.value.trim(),
          budget: roForm.budget.value.trim(),
          contactPreference: roForm.contactPreference.value,
        };

        try {
          const ownerWhatsappNumber = '919843500114';
          const waText =
            `New enquiry from Cartospatial website%0A` +
            `Name: ${data.name}%0A` +
            `Company: ${data.company || '-'}%0A` +
            `Email: ${data.email}%0A` +
            `Phone: ${data.phone}%0A` +
            `Service: ${data.service}%0A` +
            `Location: ${data.location}%0A` +
            `Budget: ${data.budget || '-'}%0A` +
            `Pref Contact: ${data.contactPreference}%0A%0A` +
            `Project Details:%0A${encodeURIComponent(data.message)}`;

          window.open(`https://wa.me/${ownerWhatsappNumber}?text=${waText}`, '_blank');

          alert('Thank you! Your request has been captured. We will contact you shortly.');
          roForm.reset();
          closeRequestModal();
        } catch (err) {
          console.error('Error submitting request:', err);
          alert('There was an error submitting your request. Please try again or contact us directly.');
        } finally {
          roSubmitBtn.disabled = false;
          roSubmitBtn.textContent = 'Submit Request';
        }
      });
    }
  }
})();
