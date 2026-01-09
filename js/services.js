/* =========================
   SERVICES PAGE JAVASCRIPT
   ========================= */

document.addEventListener('DOMContentLoaded', function() {
  /* Mobile Navigation */
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

  /* Lucide Icons */
  if (typeof lucide !== 'undefined') {
    lucide.createIcons();
  }

  /* Mobile Side Menu Touch Handler */
  if ('ontouchstart' in window) {
    const sideMenuLinks = document.querySelectorAll('.side-menu a');
    sideMenuLinks.forEach(function(link) {
      link.addEventListener('touchstart', function() {
        sideMenuLinks.forEach(function(l) {
          l.classList.remove('touched');
        });
        this.classList.add('touched');
      });

      link.addEventListener('touchend', function() {
        const self = this;
        setTimeout(function() {
          self.classList.remove('touched');
        }, 300);
      });
    });
  }

  /* ===== REQUEST MODAL ===== */
  const requestModal = document.getElementById('request-modal');
  const requestOpenBtns = document.querySelectorAll('.js-open-request-form');

  if (requestModal) {
    const requestCloseBtn = requestModal.querySelector('.request-modal__close');
    const requestOverlay = requestModal.querySelector('.request-modal__overlay');
    const requestForm = document.getElementById('request-online-form');
    const requestSubmitBtn = document.getElementById('ro-submit-btn');

    function openRequestModal() {
      requestModal.classList.add('open');
      requestModal.setAttribute('aria-hidden', 'false');
      document.body.style.overflow = 'hidden';
    }

    function closeRequestModal() {
      requestModal.classList.remove('open');
      requestModal.setAttribute('aria-hidden', 'true');
      document.body.style.overflow = '';
    }

    /* Open modal triggers */
    requestOpenBtns.forEach(function(btn) {
      btn.addEventListener('click', function(e) {
        e.preventDefault();
        openRequestModal();
      });
    });

    /* Close modal handlers */
    if (requestCloseBtn) {
      requestCloseBtn.addEventListener('click', closeRequestModal);
    }

    if (requestOverlay) {
      requestOverlay.addEventListener('click', closeRequestModal);
    }

    /* Escape key handler */
    requestModal.addEventListener('keydown', function(e) {
      if (e.key === 'Escape') {
        closeRequestModal();
      }
    });

    /* Form submission */
    if (requestForm && requestSubmitBtn) {
      requestForm.addEventListener('submit', function(e) {
        e.preventDefault();

        const formData = new FormData(requestForm);
        const name = formData.get('name')?.trim();
        const company = formData.get('company')?.trim() || 'Not provided';
        const email = formData.get('email')?.trim();
        const phone = formData.get('phone')?.trim();
        const service = formData.get('service')?.trim();
        const location = formData.get('location')?.trim();
        const message = formData.get('message')?.trim();
        const budget = formData.get('budget')?.trim() || 'Not specified';
        const contactPref = formData.get('contactPreference')?.trim();
        const accept = requestForm.querySelector('#ro-accept').checked;

        if (!name || !email || !phone || !service || !location || !message || !contactPref || !accept) {
          alert('Please fill all required fields and accept the consent.');
          return;
        }

        const whatsappMsg = 
          '*New Project Enquiry*\n\n' +
          'Name: ' + name + '\n' +
          'Company: ' + company + '\n' +
          'Email: ' + email + '\n' +
          'Phone: ' + phone + '\n' +
          'Service: ' + service + '\n' +
          'Location: ' + location + '\n' +
          'Project Details: ' + message + '\n' +
          'Budget: ' + budget + '\n' +
          'Preferred Contact: ' + contactPref;

        const whatsappNumber = '919843500114';
        const waUrl = 'https://wa.me/' + whatsappNumber + '?text=' + encodeURIComponent(whatsappMsg);

        requestSubmitBtn.textContent = 'Opening WhatsApp...';
        requestSubmitBtn.disabled = true;

        setTimeout(function() {
          window.open(waUrl, '_blank');
          requestForm.reset();
          closeRequestModal();
          requestSubmitBtn.textContent = 'Submit Request';
          requestSubmitBtn.disabled = false;
          alert('Thank you! Please send your message via WhatsApp to complete your enquiry.');
        }, 500);
      });
    }
  }
});
