/* =========================
   CONTACT PAGE JAVASCRIPT
   ========================= */

/* Mobile Navigation - Hamburger, Panel, Overlay */
document.addEventListener('DOMContentLoaded', function() {
  const hamburger = document.querySelector('.hamburger');
  const panel = document.querySelector('.mobile-panel');
  const overlay = document.querySelector('.panel-overlay');
  const closeBtn = document.querySelector('.close-panel');

  if (hamburger && panel) {
    hamburger.addEventListener('click', function() {
      panel.classList.add('open');
      overlay.classList.add('show');
    });
  }

  if (closeBtn) {
    closeBtn.addEventListener('click', function() {
      panel.classList.remove('open');
      overlay.classList.remove('show');
    });
  }

  if (overlay) {
    overlay.addEventListener('click', function() {
      panel.classList.remove('open');
      overlay.classList.remove('show');
    });
  }

  /* Mobile dropdown toggles */
  document.querySelectorAll('.m-dropdown').forEach(function(drop) {
    const trigger = drop.querySelector('.m-trigger');
    const toggle = drop.querySelector('.toggle');

    if (trigger) {
      trigger.addEventListener('click', function() {
        drop.classList.toggle('open');
        if (toggle) {
          toggle.textContent = drop.classList.contains('open') ? '−' : '+';
        }
      });
    }
  });

  /* ===== REQUEST ONLINE FORM MODAL ===== */
  const requestModal = document.getElementById('request-modal');
  const requestOverlay = requestModal ? requestModal.querySelector('.request-modal__overlay') : null;
  const requestCloseBtn = requestModal ? requestModal.querySelector('.request-modal__close') : null;

  function openRequestModal() {
    if (requestModal) {
      requestModal.classList.add('open');
      requestModal.setAttribute('aria-hidden', 'false');
      document.body.style.overflow = 'hidden';
    }
  }

  function closeRequestModal() {
    if (requestModal) {
      requestModal.classList.remove('open');
      requestModal.setAttribute('aria-hidden', 'true');
      document.body.style.overflow = '';
    }
  }

  /* All request form triggers */
  document.querySelectorAll('.js-open-request-form').forEach(function(btn) {
    btn.addEventListener('click', function(e) {
      e.preventDefault();
      openRequestModal();
    });
  });

  /* Modal close handlers */
  if (requestOverlay) {
    requestOverlay.addEventListener('click', closeRequestModal);
  }

  if (requestCloseBtn) {
    requestCloseBtn.addEventListener('click', closeRequestModal);
  }

  window.addEventListener('keydown', function(e) {
    if (e.key === 'Escape' && requestModal && requestModal.classList.contains('open')) {
      closeRequestModal();
    }
  });

  /* ===== FORM SUBMISSION LOGIC ===== */
  const roForm = document.getElementById('request-online-form');
  const roSubmitBtn = roForm ? roForm.querySelector('#ro-submit-btn') : null;

  if (roForm && roSubmitBtn) {
    roForm.addEventListener('submit', async function(e) {
      e.preventDefault();

      /* Basic front-end validation */
      const required = roForm.querySelectorAll('[required]');
      let ok = true;

      required.forEach(function(field) {
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
        contactPreference: roForm.contactPreference.value
      };

      try {
        /* Open WhatsApp with pre-filled message */
        const ownerWhatsappNumber = '919843500114';
        const waText =
          'New enquiry from Cartospatial website%0A' +
          'Name: ' + data.name + '%0A' +
          'Company: ' + (data.company || '-') + '%0A' +
          'Email: ' + data.email + '%0A' +
          'Phone: ' + data.phone + '%0A' +
          'Service: ' + data.service + '%0A' +
          'Location: ' + data.location + '%0A' +
          'Budget: ' + (data.budget || '-') + '%0A' +
          'Pref Contact: ' + data.contactPreference + '%0A%0A' +
          'Project Details:%0A' + data.message;

        window.open('https://wa.me/' + ownerWhatsappNumber + '?text=' + waText, '_blank');

        alert('Thank you! Your request has been captured. We will contact you shortly.');
        roForm.reset();
        closeRequestModal();
      } catch (err) {
        console.error(err);
        alert('Something went wrong. Please try again or contact us directly by phone/WhatsApp.');
      } finally {
        roSubmitBtn.disabled = false;
        roSubmitBtn.textContent = 'Submit Request';
      }
    });
  }

  /* Contact form (on page) submission - WhatsApp Integration */
  const contactForm = document.getElementById('contact-form');
  if (contactForm) {
    contactForm.addEventListener('submit', function(e) {
      e.preventDefault();

      const required = contactForm.querySelectorAll('[required]');
      let ok = true;

      required.forEach(function(field) {
        const isCheckbox = field.type === 'checkbox';
        const valid = isCheckbox ? field.checked : field.value.trim() !== '';

        if (!valid) {
          field.style.outline = '2px solid #fdf2e6';
          field.style.boxShadow = '0 0 0 3px rgba(247,147,30,0.12)';
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

      const submitBtn = contactForm.querySelector('.btn-submit');
      submitBtn.disabled = true;
      submitBtn.textContent = 'Sending...';

      // Collect form data
      const firstName = document.getElementById('firstName') ? document.getElementById('firstName').value.trim() : '';
      const phone = document.getElementById('phone') ? document.getElementById('phone').value.trim() : '';
      const email = document.getElementById('email') ? document.getElementById('email').value.trim() : '';
      const industry = document.getElementById('industry') ? document.getElementById('industry').value : '';
      const budget = document.getElementById('budget') ? document.getElementById('budget').value.trim() : '';
      const message = document.getElementById('message') ? document.getElementById('message').value.trim() : '';
      const servicePref = document.getElementById('service-pref') ? document.getElementById('service-pref').value : '';
      const contactMethod = document.getElementById('contact-method') ? document.getElementById('contact-method').value : '';

      // WhatsApp number
      const whatsappNumber = '919843500114';

      // Create WhatsApp message
      const waText =
        'New Quote Request from Cartospatial Website%0A%0A' +
        '*Personal Details:*%0A' +
        'Name: ' + firstName + '%0A' +
        'Phone: ' + phone + '%0A' +
        'Email: ' + email + '%0A%0A' +
        '*Project Details:*%0A' +
        'Industry: ' + (industry || '-') + '%0A' +
        'Preferred Service: ' + (servicePref || '-') + '%0A' +
        'Budget: ' + (budget || '-') + '%0A' +
        'Contact Method: ' + (contactMethod || '-') + '%0A%0A' +
        '*Project Description:*%0A' + message;

      // Open WhatsApp
      window.open('https://wa.me/' + whatsappNumber + '?text=' + waText, '_blank');

      setTimeout(function() {
        submitBtn.disabled = false;
        submitBtn.textContent = 'Get Your Quote';
        alert('Thank you! Opening WhatsApp for direct communication...');
        contactForm.reset();
      }, 500);
    });
  }
});
