// One consolidated script for every page: navigation, quote modal, lead capture, analytics events, animations.
const WHATSAPP = '919843500114';
const WEB3FORMS_KEY = import.meta.env.PUBLIC_WEB3FORMS_KEY as string | undefined;
const SHEETS_WEBHOOK = import.meta.env.PUBLIC_SHEETS_WEBHOOK as string | undefined;

declare global { interface Window { gtag?: (...args: unknown[]) => void } }
const track = (event: string, params: Record<string, unknown> = {}) => window.gtag?.('event', event, params);

/* ---------- Mobile navigation ---------- */
const hamburger = document.querySelector<HTMLButtonElement>('.hamburger');
const panel = document.querySelector<HTMLElement>('.mobile-panel');
const navOverlay = document.querySelector<HTMLElement>('.panel-overlay');
const setPanel = (open: boolean) => {
  panel?.classList.toggle('open', open);
  navOverlay?.classList.toggle('show', open);
  hamburger?.setAttribute('aria-expanded', String(open));
  document.body.style.overflow = open ? 'hidden' : '';
};
hamburger?.addEventListener('click', () => setPanel(true));
document.querySelector('.close-panel')?.addEventListener('click', () => setPanel(false));
navOverlay?.addEventListener('click', () => setPanel(false));
panel?.querySelectorAll('a').forEach((a) => a.addEventListener('click', () => setPanel(false)));
document.querySelectorAll<HTMLButtonElement>('.m-trigger').forEach((trigger) => {
  trigger.addEventListener('click', () => {
    const drop = trigger.closest('.m-dropdown')!;
    const open = !drop.classList.contains('open');
    document.querySelectorAll('.m-dropdown.open').forEach((d) => {
      d.classList.remove('open');
      d.querySelector('.toggle')!.textContent = '+';
      d.querySelector('.m-trigger')?.setAttribute('aria-expanded', 'false');
    });
    drop.classList.toggle('open', open);
    trigger.setAttribute('aria-expanded', String(open));
    trigger.querySelector('.toggle')!.textContent = open ? '−' : '+';
  });
});
// Highlight current page in nav
const here = location.pathname;
document.querySelectorAll<HTMLAnchorElement>('.nav-links a, .mobile-menu a, .side-menu a').forEach((a) => {
  if (a.getAttribute('href') === here) a.classList.add('active');
});

/* ---------- Quote modal ---------- */
const modal = document.getElementById('request-modal');
let lastFocus: HTMLElement | null = null;
const openModal = (service?: string) => {
  if (!modal) return;
  lastFocus = document.activeElement as HTMLElement;
  modal.classList.add('open');
  modal.setAttribute('aria-hidden', 'false');
  document.body.style.overflow = 'hidden';
  if (service) {
    const sel = modal.querySelector<HTMLSelectElement>('#ro-service');
    if (sel && [...sel.options].some((o) => o.value === service)) sel.value = service;
  }
  setTimeout(() => modal.querySelector<HTMLInputElement>('#ro-name')?.focus(), 50);
  track('open_quote_form', { page: here });
};
const closeModal = () => {
  if (!modal) return;
  modal.classList.remove('open');
  modal.setAttribute('aria-hidden', 'true');
  document.body.style.overflow = '';
  lastFocus?.focus();
};
document.addEventListener('click', (e) => {
  const t = e.target as HTMLElement;
  const opener = t.closest<HTMLElement>('.js-open-request-form');
  if (opener) { e.preventDefault(); openModal(opener.dataset.service); }
  if (t.closest('.request-modal__overlay, .request-modal__close')) closeModal();
});
document.addEventListener('keydown', (e) => { if (e.key === 'Escape' && modal?.classList.contains('open')) closeModal(); });

/* ---------- Lead capture: save lead (email / Google Sheet) + open WhatsApp ---------- */
async function saveLead(data: Record<string, string>) {
  const jobs: Promise<unknown>[] = [];
  if (WEB3FORMS_KEY) {
    jobs.push(fetch('https://api.web3forms.com/submit', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
      body: JSON.stringify({ access_key: WEB3FORMS_KEY, subject: `New survey enquiry – ${data.service || 'Website'} – ${data.location || ''}`, from_name: 'Cartospatial Website', ...data }),
    }));
  }
  if (SHEETS_WEBHOOK) {
    // Google Apps Script web app; no-cors because Apps Script does not send CORS headers.
    jobs.push(fetch(SHEETS_WEBHOOK, { method: 'POST', mode: 'no-cors', body: JSON.stringify({ ...data, submittedAt: new Date().toISOString() }) }));
  }
  await Promise.allSettled(jobs);
}

document.querySelectorAll<HTMLFormElement>('form[data-lead-form]').forEach((form) => {
  form.addEventListener('submit', async (e) => {
    e.preventDefault();
    const status = form.querySelector<HTMLElement>('.form-status');
    if (!form.checkValidity()) {
      form.reportValidity();
      return;
    }
    const fd = new FormData(form);
    if (fd.get('botcheck')) return; // honeypot
    const data: Record<string, string> = { source: form.dataset.leadForm || 'Form', page: location.href };
    fd.forEach((v, k) => { if (k !== 'botcheck' && String(v).trim()) data[k] = String(v).trim(); });

    const btn = form.querySelector<HTMLButtonElement>('button[type="submit"]');
    btn && (btn.disabled = true);
    if (status) status.textContent = 'Sending your enquiry…';

    // Open the WhatsApp window synchronously-ish to avoid popup blockers, then fill it after saving.
    const waWin = window.open('', '_blank');
    await saveLead(data);
    track('generate_lead', { form: data.source, service: data.service, location: data.location });

    const lines = Object.entries(data)
      .filter(([k]) => !['source', 'page'].includes(k))
      .map(([k, v]) => `*${k.replace(/([A-Z])/g, ' $1').replace(/^./, (c) => c.toUpperCase())}:* ${v}`);
    const waUrl = `https://wa.me/${WHATSAPP}?text=${encodeURIComponent(`Hi Cartospatial Technologies, I would like a quote.\n\n${lines.join('\n')}`)}`;
    if (waWin) waWin.location.href = waUrl; else location.href = waUrl;

    form.reset();
    btn && (btn.disabled = false);
    if (status) status.innerHTML = '✅ Thank you! Your enquiry is received. Please press <strong>Send</strong> in WhatsApp – we usually reply within 2 working hours.';
  });
});

/* ---------- Analytics on calls / WhatsApp / email clicks ---------- */
document.addEventListener('click', (e) => {
  const a = (e.target as HTMLElement).closest<HTMLAnchorElement>('a[href^="tel:"], a[href*="wa.me"], a[href^="mailto:"]');
  if (!a) return;
  const kind = a.href.startsWith('tel:') ? 'click_call' : a.href.includes('wa.me') ? 'click_whatsapp' : 'click_email';
  track(kind, { page: here });
});

/* ---------- Reveal-on-scroll animation ---------- */
if ('IntersectionObserver' in window && !matchMedia('(prefers-reduced-motion: reduce)').matches) {
  const io = new IntersectionObserver((entries) => entries.forEach((en) => {
    if (en.isIntersecting) { en.target.classList.add('is-visible'); io.unobserve(en.target); }
  }), { threshold: 0.1, rootMargin: '0px 0px -40px 0px' });
  document.querySelectorAll('.feature-box, .testimonial-card, .reveal').forEach((el) => { el.classList.add('reveal-init'); io.observe(el); });
}

/* ---------- FAQ accordion analytics ---------- */
document.querySelectorAll<HTMLDetailsElement>('.faq details').forEach((d) =>
  d.addEventListener('toggle', () => d.open && track('faq_open', { q: d.querySelector('summary')?.textContent })));

export {};
