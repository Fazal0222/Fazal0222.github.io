/**
 * GILP LABORATORIES — Admin Portal Script
 * Password-protected CMS for updating site content
 *
 * SECURITY NOTE: Change the password below before going live!
 * For production, replace with a proper backend login system.
 */

const ADMIN_CREDENTIALS = {
  username: 'admin',
  password: 'gilp2025'
  // ⚠️  CHANGE THIS before deploying to production!
};

let nextProductId = 100;
let isAdminOpen   = false;

/* ——— Open / Close ——— */
function openAdmin() {
  document.getElementById('admin-overlay').classList.add('open');
  document.body.style.overflow = 'hidden';
  isAdminOpen = true;
}
function closeAdmin() {
  document.getElementById('admin-overlay').classList.remove('open');
  document.body.style.overflow = '';
  isAdminOpen = false;
}

window.openAdmin  = openAdmin;
window.closeAdmin = closeAdmin;

// Close on overlay click
document.getElementById('admin-overlay').addEventListener('click', e => {
  if (e.target === document.getElementById('admin-overlay')) closeAdmin();
});
// Close on Escape
document.addEventListener('keydown', e => {
  if (e.key === 'Escape' && isAdminOpen) closeAdmin();
});

/* ——— Login ——— */
function doLogin() {
  const user = document.getElementById('admin-user').value.trim();
  const pass = document.getElementById('admin-pass').value;
  const err  = document.getElementById('admin-login-error');

  if (user === ADMIN_CREDENTIALS.username && pass === ADMIN_CREDENTIALS.password) {
    document.getElementById('admin-login').style.display  = 'none';
    document.getElementById('admin-workspace').classList.add('show');
    populateAdminForms();
    renderAdminProducts();
    err.classList.remove('show');
  } else {
    err.classList.add('show');
    document.getElementById('admin-pass').value = '';
    document.getElementById('admin-pass').focus();
  }
}
window.doLogin = doLogin;

// Allow Enter key to submit login
['admin-user','admin-pass'].forEach(id => {
  document.getElementById(id)?.addEventListener('keydown', e => {
    if (e.key === 'Enter') doLogin();
  });
});

function doLogout() {
  document.getElementById('admin-login').style.display  = 'flex';
  document.getElementById('admin-workspace').classList.remove('show');
  document.getElementById('admin-user').value = '';
  document.getElementById('admin-pass').value = '';
  document.getElementById('admin-login-error').classList.remove('show');
  showPanel('company');
}
window.doLogout = doLogout;

/* ——— Panel switching ——— */
function showPanel(id) {
  document.querySelectorAll('.admin-panel').forEach(p => p.classList.remove('active'));
  document.querySelectorAll('.sidebar-item').forEach(s => s.classList.remove('active'));
  const panel = document.getElementById('panel-' + id);
  if (panel) panel.classList.add('active');
  const sItem = document.querySelector(`[data-panel="${id}"]`);
  if (sItem) sItem.classList.add('active');
}
window.showPanel = showPanel;

document.querySelectorAll('.sidebar-item[data-panel]').forEach(item => {
  item.addEventListener('click', () => showPanel(item.dataset.panel));
});

/* ——— Populate admin forms with current data ——— */
function populateAdminForms() {
  const d = GILP_DATA;
  // Company
  setVal('a-company-name',    d.company.name);
  setVal('a-company-tagline', d.company.tagline);
  setVal('a-company-about',   d.company.about);
  // Stats
  setVal('a-stat-products', d.stats.products);
  setVal('a-stat-years',    d.stats.years);
  setVal('a-stat-cert1',    d.stats.cert1);
  setVal('a-stat-cert2',    d.stats.cert2);
  setVal('a-stat-cert3',    d.stats.cert3);
  setVal('a-stat-cert4',    d.stats.cert4);
  // Contact
  setVal('a-contact-address',  d.contact.address);
  setVal('a-contact-phone',    d.contact.phone);
  setVal('a-contact-email',    d.contact.email);
  setVal('a-contact-whatsapp', d.contact.whatsapp);
  setVal('a-contact-website',  d.contact.website);
  setVal('a-contact-hours',    d.contact.hours);
}

/* ——— Save handlers ——— */
window.saveCompany = function() {
  GILP_DATA.company.name    = getVal('a-company-name');
  GILP_DATA.company.tagline = getVal('a-company-tagline');
  GILP_DATA.company.about   = getVal('a-company-about');
  gilpSave();
  renderSite();
  showToast('✓ Company info updated on website!');
};

window.saveStats = function() {
  GILP_DATA.stats.products = getVal('a-stat-products');
  GILP_DATA.stats.years    = getVal('a-stat-years');
  GILP_DATA.stats.cert1    = getVal('a-stat-cert1');
  GILP_DATA.stats.cert2    = getVal('a-stat-cert2');
  GILP_DATA.stats.cert3    = getVal('a-stat-cert3');
  GILP_DATA.stats.cert4    = getVal('a-stat-cert4');
  gilpSave();
  renderSite();
  showToast('✓ Stats updated on homepage!');
};

window.saveContact = function() {
  GILP_DATA.contact.address  = getVal('a-contact-address');
  GILP_DATA.contact.phone    = getVal('a-contact-phone');
  GILP_DATA.contact.email    = getVal('a-contact-email');
  GILP_DATA.contact.whatsapp = getVal('a-contact-whatsapp');
  GILP_DATA.contact.website  = getVal('a-contact-website');
  GILP_DATA.contact.hours    = getVal('a-contact-hours');
  gilpSave();
  renderContact();
  renderFooter();
  showToast('✓ Contact details updated!');
};

/* ——— Products ——— */
const CATEGORY_COLORS = {
  'Industrial':         'c2',
  'Ophthalmic':         'c1',
  'Dermatologic':       'c3',
  'Lifesciences':       'c4',
  'General Therapeutic':'c5',
};

function renderAdminProducts() {
  const list = document.getElementById('admin-prod-list');
  if (!list) return;
  list.innerHTML = GILP_DATA.products.map(p => `
    <div class="admin-prod-row" id="apr-${p.id}">
      <div class="admin-prod-emoji">${p.emoji}</div>
      <div class="admin-prod-info">
        <strong>${p.name}</strong>
        <span>${p.category} · ${p.tags.join(', ')}</span>
      </div>
      <div class="admin-prod-actions">
        <button class="del-btn" onclick="deleteProduct(${p.id})">Delete</button>
      </div>
    </div>`).join('');
  nextProductId = Math.max(...GILP_DATA.products.map(p => p.id), nextProductId) + 1;
}

window.toggleAddForm = function() {
  document.getElementById('add-prod-form').classList.toggle('open');
};

window.addProduct = function() {
  const name  = getVal('np-name').trim();
  const cat   = getVal('np-cat');
  const emoji = getVal('np-emoji').trim() || '💊';
  const desc  = getVal('np-desc').trim();
  const tags  = getVal('np-tags').split(',').map(t => t.trim()).filter(Boolean);

  if (!name || !desc) {
    showToast('⚠ Please fill in Name and Description');
    return;
  }
  GILP_DATA.products.push({
    id:          nextProductId++,
    name, category: cat, emoji, description: desc, tags,
    color: CATEGORY_COLORS[cat] || 'c1'
  });
  gilpSave();
  renderProducts();
  renderAdminProducts();
  // Reset form
  ['np-name','np-desc','np-tags'].forEach(id => setVal(id, ''));
  setVal('np-emoji', '💊');
  document.getElementById('add-prod-form').classList.remove('open');
  showToast('✓ Product added to website!');
};

window.deleteProduct = function(id) {
  const prod = GILP_DATA.products.find(p => p.id === id);
  if (!prod) return;
  if (!confirm(`Delete "${prod.name}" from the website?`)) return;
  GILP_DATA.products = GILP_DATA.products.filter(p => p.id !== id);
  gilpSave();
  renderProducts();
  renderAdminProducts();
  showToast('✓ Product removed!');
};

/* ——— Helpers ——— */
function getVal(id) {
  const el = document.getElementById(id);
  return el ? el.value : '';
}
function setVal(id, val) {
  const el = document.getElementById(id);
  if (el) el.value = val || '';
}

/* ——— Init sidebar default panel ——— */
document.addEventListener('DOMContentLoaded', () => {
  showPanel('company');
});
