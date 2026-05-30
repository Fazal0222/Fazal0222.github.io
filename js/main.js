/**
 * GILP LABORATORIES — Main Site Script
 * Renders all dynamic content from GILP_DATA
 */

/* ——— NAV scroll effect ——— */
window.addEventListener('scroll', () => {
  const nav = document.querySelector('.nav');
  if (window.scrollY > 60) nav.style.boxShadow = '0 4px 24px rgba(0,0,0,0.3)';
  else nav.style.boxShadow = 'none';

  // Active nav link
  const sections = ['home','about','products','mission','why','contact'];
  let current = '';
  sections.forEach(id => {
    const el = document.getElementById(id);
    if (el && window.scrollY >= el.offsetTop - 100) current = id;
  });
  document.querySelectorAll('.nav-links a').forEach(a => {
    a.classList.toggle('active', a.getAttribute('href') === '#' + current);
  });
});

/* ——— Mobile nav toggle ——— */
document.querySelector('.nav-toggle').addEventListener('click', () => {
  document.querySelector('.nav-links').classList.toggle('open');
});
document.querySelectorAll('.nav-links a').forEach(a => {
  a.addEventListener('click', () => document.querySelector('.nav-links').classList.remove('open'));
});

/* ——— Render all sections from data ——— */
function renderSite() {
  renderHero();
  renderAbout();
  renderProducts();
  renderMission();
  renderWhyUs();
  renderContact();
  renderFooter();
}

function renderHero() {
  const d = GILP_DATA;
  setText('hero-tagline', d.company.tagline);
  setText('hero-about', d.company.about.substring(0, 180) + '…');
  setHTML('hero-stat-products', `<div class="hero-stat-num">${d.stats.products}</div><div class="hero-stat-label">Products</div>`);
  setHTML('hero-stat-cert', `
    <div class="hero-stat-num">${d.stats.cert1}</div><div class="hero-stat-label">Certified</div>
  `);
}

function renderAbout() {
  const d = GILP_DATA;
  setHTML('about-stat-products', `<div class="num">${d.stats.products}</div><div class="lbl">Products</div>`);
  setHTML('about-stat-years', `<div class="num">${d.stats.years}</div><div class="lbl">Years</div>`);
  setText('about-desc', d.company.about);
  // Cert badges
  const certs = d.certifications || [];
  setHTML('cert-badges', certs.map(c => `<div class="cert-badge">${c.replace(' Certified','').replace(' Compliant','')}</div>`).join(''));
}

function renderProducts() {
  const grid = document.getElementById('products-grid');
  if (!grid) return;
  grid.innerHTML = GILP_DATA.products.map(p => `
    <div class="prod-card">
      <div class="prod-thumb ${p.color || 'c1'}">${p.emoji}</div>
      <div class="prod-body">
        <div class="prod-cat">${p.category}</div>
        <div class="prod-name">${p.name}</div>
        <div class="prod-desc">${p.description}</div>
        <div class="prod-tags">${p.tags.map(t => `<span class="tag">${t}</span>`).join('')}</div>
      </div>
    </div>`).join('');
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
  setHTML('contact-address', c.address.replace(/\n/g, '<br>'));
  setHTML('contact-phone',   c.phone   ? `<a href="tel:${c.phone}" style="color:inherit;text-decoration:none">${c.phone}</a>` : '—');
  setHTML('contact-email',   c.email   ? `<a href="mailto:${c.email}" style="color:var(--teal-dark)">${c.email}</a>` : '—');
  setText('contact-hours', c.hours || 'Mon–Sat: 9:00 AM – 6:00 PM IST');
}

function renderFooter() {
  const c = GILP_DATA.contact;
  setText('footer-address', c.address.split('\n').join(', '));
  setText('footer-email', c.email);
  setText('footer-phone', c.phone);
  const yr = new Date().getFullYear();
  setHTML('footer-copy', `© ${yr} GILP Laboratories. All rights reserved.`);
}

/* ——— helpers ——— */
function setText(id, val) {
  const el = document.getElementById(id);
  if (el) el.textContent = val;
}
function setHTML(id, val) {
  const el = document.getElementById(id);
  if (el) el.innerHTML = val;
}

/* ——— Toast ——— */
function showToast(msg = '✓ Saved!') {
  const t = document.getElementById('toast');
  if (!t) return;
  t.textContent = msg;
  t.classList.add('show');
  setTimeout(() => t.classList.remove('show'), 2800);
}

/* ——— Contact form ——— */
const contactForm = document.getElementById('contact-form');
if (contactForm) {
  contactForm.addEventListener('submit', e => {
    e.preventDefault();
    showToast('✓ Enquiry submitted! We will contact you shortly.');
    contactForm.reset();
  });
}

/* ——— Smooth scroll for all anchors ——— */
document.querySelectorAll('a[href^="#"]').forEach(a => {
  a.addEventListener('click', e => {
    const target = document.querySelector(a.getAttribute('href'));
    if (target) {
      e.preventDefault();
      target.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  });
});

/* ——— Init ——— */
document.addEventListener('DOMContentLoaded', renderSite);
