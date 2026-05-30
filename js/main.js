/**
 * GILP LABORATORIES — Main Site Script v2
 */

const PLACEHOLDER = 'images/products/placeholder.svg';

/* ──────────────────────────────────────────
   NAV
────────────────────────────────────────── */
const nav      = document.querySelector('.nav');
const burger   = document.querySelector('.nav-burger');
const drawer   = document.querySelector('.nav-drawer');
const navLinks = document.querySelectorAll('.nav-links a, .nav-drawer a');

window.addEventListener('scroll', () => {
  nav.classList.toggle('scrolled', window.scrollY > 50);
  updateActiveLink();
}, { passive: true });

burger.addEventListener('click', () => {
  const open = burger.classList.toggle('open');
  drawer.classList.toggle('open', open);
  document.body.style.overflow = open ? 'hidden' : '';
  burger.setAttribute('aria-expanded', open);
});

document.querySelectorAll('.nav-drawer a').forEach(a => {
  a.addEventListener('click', () => {
    burger.classList.remove('open');
    drawer.classList.remove('open');
    document.body.style.overflow = '';
  });
});

function updateActiveLink() {
  const sections = ['home','about','products','mission','why','contact'];
  let current = 'home';
  sections.forEach(id => {
    const el = document.getElementById(id);
    if (el && window.scrollY >= el.offsetTop - 90) current = id;
  });
  navLinks.forEach(a => a.classList.toggle('active', a.getAttribute('href') === '#' + current));
}

/* ──────────────────────────────────────────
   RENDER SITE
────────────────────────────────────────── */
function renderSite() {
  renderLogo();
  renderProducts();
  renderMission();
  renderWhyUs();
  renderContact();
  renderFooter();
  renderAboutStats();
}

function renderLogo() {
  const d = GILP_DATA.company;
  const logoContainers = document.querySelectorAll('.nav-logo-icon');
  logoContainers.forEach(el => {
    if (d.logoImage) {
      el.innerHTML = `<img src="${d.logoImage}" alt="GILP Logo">`;
    } else {
      el.innerHTML = `<span class="nav-logo-icon-letter">${d.logoLetter || 'G'}</span>`;
    }
  });
}

function renderAboutStats() {
  const d = GILP_DATA;
  setHTML('about-stat-products', `<div class="num">${d.stats.products}</div><div class="lbl">Products</div>`);
  setHTML('about-stat-years',    `<div class="num">${d.stats.years}</div><div class="lbl">Years</div>`);
  const certs = d.certifications || [];
  setHTML('cert-badges', certs.map(c =>
    `<div class="cert-badge">${c.replace(' Certified','').replace(' Compliant','')}</div>`
  ).join(''));
  setHTML('hero-stat-products', `
    <div class="hero-stat-num">${d.stats.products}</div>
    <div class="hero-stat-label">Products</div>
  `);
  setText('about-desc', d.company.about);
}

function renderProducts() {
  const grid = document.getElementById('products-grid');
  if (!grid) return;
  if (!GILP_DATA.products.length) {
    grid.innerHTML = `<p style="color:var(--text-muted);font-size:15px;grid-column:1/-1;text-align:center;padding:40px 0">No products yet. Add products via the Admin Portal.</p>`;
    return;
  }
  grid.innerHTML = GILP_DATA.products.map(p => `
    <article class="prod-card">
      <div class="prod-thumb">
        <img
          src="${p.image || PLACEHOLDER}"
          alt="${p.name}"
          loading="lazy"
          onerror="this.src='${PLACEHOLDER}'"
        >
      </div>
      <div class="prod-body">
        <div class="prod-cat">${p.category}</div>
        <h3 class="prod-name">${p.name}</h3>
        <p class="prod-desc">${p.description}</p>
        <div class="prod-tags">${p.tags.map(t => `<span class="tag">${t}</span>`).join('')}</div>
      </div>
    </article>`).join('');
}

function renderMission() {
  const grid = document.getElementById('mission-grid');
  if (!grid) return;
  grid.innerHTML = GILP_DATA.mission.map(m => `
    <div class="mission-card">
      <div class="mission-num">${m.num}</div>
      <h3>${m.title}</h3>
      <p>${m.text}</p>
    </div>`).join('');
}

function renderWhyUs() {
  const grid = document.getElementById('why-grid');
  if (!grid) return;
  grid.innerHTML = GILP_DATA.whyUs.map(w => `
    <div class="why-card">
      <div class="why-icon">${w.icon}</div>
      <h4>${w.title}</h4>
      <p>${w.text}</p>
    </div>`).join('');
}

function renderContact() {
  const c = GILP_DATA.contact;
  setHTML('contact-address', c.address.replace(/\n/g,'<br>'));
  setHTML('contact-phone',   c.phone ? `<a href="tel:${c.phone}">${c.phone}</a>` : '<em style="color:#aaa">Add via Admin</em>');
  setHTML('contact-email',   c.email ? `<a href="mailto:${c.email}">${c.email}</a>` : '');
  setText('contact-hours',   c.hours);
  if (c.whatsapp) {
    const wa = document.getElementById('contact-whatsapp-row');
    if (wa) { wa.style.display = 'flex'; setText('contact-whatsapp', c.whatsapp); }
  }
}

function renderFooter() {
  const c = GILP_DATA.contact;
  setHTML('footer-email',   c.email ? `<a href="mailto:${c.email}">${c.email}</a>` : '');
  setText('footer-phone',   c.phone || '');
  setText('footer-address', c.address.split('\n').join(', '));
  setHTML('footer-copy',    `© ${new Date().getFullYear()} GILP Laboratories. All rights reserved.`);
}

/* ──────────────────────────────────────────
   CONTACT FORM
────────────────────────────────────────── */
const contactForm = document.getElementById('contact-form');
if (contactForm) {
  contactForm.addEventListener('submit', e => {
    e.preventDefault();
    showToast('✓ Enquiry sent! We will contact you shortly.');
    contactForm.reset();
  });
}

/* ──────────────────────────────────────────
   HELPERS
────────────────────────────────────────── */
function setText(id, val) {
  const el = document.getElementById(id);
  if (el) el.textContent = val || '';
}
function setHTML(id, val) {
  const el = document.getElementById(id);
  if (el) el.innerHTML = val || '';
}

function showToast(msg = '✓ Saved!') {
  const t = document.getElementById('toast');
  if (!t) return;
  t.textContent = msg;
  t.classList.add('show');
  clearTimeout(t._timer);
  t._timer = setTimeout(() => t.classList.remove('show'), 3000);
}
window.showToast = showToast;

/* Smooth anchor scroll */
document.querySelectorAll('a[href^="#"]').forEach(a => {
  a.addEventListener('click', e => {
    const target = document.querySelector(a.getAttribute('href'));
    if (target) {
      e.preventDefault();
      const offset = target.getBoundingClientRect().top + window.scrollY - 72;
      window.scrollTo({ top: offset, behavior: 'smooth' });
    }
  });
});

/* ──────────────────────────────────────────
   INIT
────────────────────────────────────────── */
document.addEventListener('DOMContentLoaded', () => {
  renderSite();
  updateActiveLink();
});
