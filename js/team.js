/* ====================================
   TEAM PAGE - Menu & Modal Behavior
   ==================================== */

(function () {
  const hamburger = document.querySelector('.hamburger');
  const mobilePanel = document.querySelector('.mobile-panel');
  const closePanel = document.querySelector('.close-panel');
  const overlay = document.querySelector('.panel-overlay');

  // Open mobile panel
  function openPanel() {
    mobilePanel.classList.add('open');
    overlay.classList.add('show');
    document.body.style.overflow = 'hidden';
    hamburger.setAttribute('aria-expanded', 'true');
    mobilePanel.setAttribute('aria-hidden', 'false');
    overlay.setAttribute('aria-hidden', 'false');
  }

  // Close mobile panel
  function closePanelFn() {
    mobilePanel.classList.remove('open');
    overlay.classList.remove('show');
    document.body.style.overflow = '';
    hamburger.setAttribute('aria-expanded', 'false');
    mobilePanel.setAttribute('aria-hidden', 'true');
    overlay.setAttribute('aria-hidden', 'true');
  }

  // Click handlers
  hamburger && hamburger.addEventListener('click', openPanel);
  closePanel && closePanel.addEventListener('click', closePanelFn);
  overlay && overlay.addEventListener('click', closePanelFn);

  // Escape to close
  document.addEventListener('keydown', function (e) {
    if (e.key === 'Escape') closePanelFn();
  });

  // Mobile dropdown accordions
  document.querySelectorAll('.m-dropdown').forEach(function (drop) {
    const trigger = drop.querySelector('.m-trigger');
    const toggle = drop.querySelector('.toggle');

    trigger && trigger.addEventListener('click', function (e) {
      e.preventDefault();
      drop.classList.toggle('open');
      if (drop.classList.contains('open')) toggle.textContent = '−';
      else toggle.textContent = '+';
    });
  });

  // Prevent horizontal scroll
  function snapLayoutFix() {
    document.documentElement.style.overflowX = 'hidden';
    document.body.style.overflowX = 'hidden';
  }
  snapLayoutFix();
  window.addEventListener('resize', snapLayoutFix);
})();
