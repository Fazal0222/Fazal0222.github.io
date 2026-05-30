/**
 * GILP LABORATORIES — Admin Portal v2
 * =====================================
 * Features:
 *  - Login protection
 *  - Company info + logo upload
 *  - Product management with image upload
 *  - Contact details
 *  - Stats & certifications
 *
 * IMAGE STORAGE STRATEGY (GitHub Pages):
 *  Uploaded images are saved as base64 in localStorage for instant preview.
 *  For permanent hosting on GitHub Pages, also commit the image files to
 *  /images/products/ or /images/logo/ in your repo.
 *
 * ⚠️  CHANGE PASSWORD before going live!
 */

const ADMIN_CREDS = { username: 'admin', password: 'gilp2025' };

let adminOpen  = false;
let nextProdId = 200;

/* ─── Open / Close ─────────────────────────────────────────────────────── */
function openAdmin() {
  document.getElementById('admin-overlay').classList.add('open');
  document.body.style.overflow = 'hidden';
  adminOpen = true;
}
function closeAdmin() {
  document.getElementById('admin-overlay').classList.remove('open');
  document.body.style.overflow = '';
  adminOpen = false;
}
window.openAdmin  = openAdmin;
window.closeAdmin = closeAdmin;

document.getElementById('admin-overlay').addEventListener('click', e => {
  if (e.target.id === 'admin-overlay') closeAdmin();
});
document.addEventListener('keydown', e => { if (e.key === 'Escape' && adminOpen) closeAdmin(); });

/* ─── Login ─────────────────────────────────────────────────────────────── */
function doLogin() {
  const u = document.getElementById('admin-user').value.trim();
  const p = document.getElementById('admin-pass').value;
  const err = document.getElementById('admin-login-error');
  if (u === ADMIN_CREDS.username && p === ADMIN_CREDS.password) {
    document.getElementById('admin-login').style.display = 'none';
    document.getElementById('admin-workspace').classList.add('show');
    err.classList.remove('show');
    populateForms();
    renderAdminProducts();
  } else {
    err.classList.add('show');
    document.getElementById('admin-pass').value = '';
    document.getElementById('admin-pass').focus();
  }
}
window.doLogin = doLogin;

['admin-user','admin-pass'].forEach(id => {
  document.getElementById(id)?.addEventListener('keydown', e => { if (e.key === 'Enter') doLogin(); });
});

function doLogout() {
  document.getElementById('admin-login').style.display = 'flex';
  document.getElementById('admin-workspace').classList.remove('show');
  document.getElementById('admin-user').value = '';
  document.getElementById('admin-pass').value = '';
  document.getElementById('admin-login-error').classList.remove('show');
  showPanel('company');
}
window.doLogout = doLogout;

/* ─── Panel switching ───────────────────────────────────────────────────── */
function showPanel(id) {
  document.querySelectorAll('.admin-panel').forEach(p => p.classList.remove('active'));
  document.querySelectorAll('.sidebar-item,.admin-tab').forEach(s => s.classList.remove('active'));
  const panel = document.getElementById('panel-' + id);
  if (panel) panel.classList.add('active');
  document.querySelectorAll(`[data-panel="${id}"]`).forEach(el => el.classList.add('active'));
}
window.showPanel = showPanel;

document.querySelectorAll('[data-panel]').forEach(el => {
  el.addEventListener('click', () => showPanel(el.dataset.panel));
});

/* ─── Populate forms from GILP_DATA ────────────────────────────────────── */
function populateForms() {
  const d = GILP_DATA;
  setVal('a-name',     d.company.name);
  setVal('a-tagline',  d.company.tagline);
  setVal('a-about',    d.company.about);
  // Logo preview
  if (d.company.logoImage) showLogoPreview(d.company.logoImage);

  setVal('a-phone',    d.contact.phone);
  setVal('a-email',    d.contact.email);
  setVal('a-whatsapp', d.contact.whatsapp);
  setVal('a-website',  d.contact.website);
  setVal('a-address',  d.contact.address);
  setVal('a-hours',    d.contact.hours);

  setVal('a-stat-products', d.stats.products);
  setVal('a-stat-years',    d.stats.years);
  setVal('a-stat-cert1',    d.stats.cert1);
  setVal('a-stat-cert2',    d.stats.cert2);
  setVal('a-stat-cert3',    d.stats.cert3);
  setVal('a-stat-cert4',    d.stats.cert4);
}

/* ─── LOGO UPLOAD ───────────────────────────────────────────────────────── */
document.getElementById('logo-file-input')?.addEventListener('change', function () {
  const file = this.files[0];
  if (!file) return;
  if (!file.type.startsWith('image/')) { showToast('⚠ Please select an image file'); return; }
  if (file.size > 2 * 1024 * 1024) { showToast('⚠ Logo file must be under 2 MB'); return; }
  const reader = new FileReader();
  reader.onload = e => {
    const dataUrl = e.target.result;
    showLogoPreview(dataUrl);
    GILP_DATA.company.logoImage = dataUrl;
    gilpSave();
    renderLogo();
    showToast('✓ Logo updated!');
  };
  reader.readAsDataURL(file);
});

function showLogoPreview(src) {
  const logoEl = document.getElementById('logo-current');
  if (logoEl) logoEl.innerHTML = `<img src="${src}" alt="Logo">`;
}
function clearLogo() {
  GILP_DATA.company.logoImage = '';
  gilpSave();
  renderLogo();
  const logoEl = document.getElementById('logo-current');
  if (logoEl) logoEl.innerHTML = `<span class="logo-current-letter">${GILP_DATA.company.logoLetter || 'G'}</span>`;
  showToast('✓ Logo removed — using letter icon');
}
window.clearLogo = clearLogo;

/* ─── SAVE: Company ─────────────────────────────────────────────────────── */
window.saveCompany = function() {
  GILP_DATA.company.name    = getVal('a-name');
  GILP_DATA.company.tagline = getVal('a-tagline');
  GILP_DATA.company.about   = getVal('a-about');
  gilpSave();
  renderSite();
  showToast('✓ Company info saved!');
};

/* ─── SAVE: Contact ─────────────────────────────────────────────────────── */
window.saveContact = function() {
  Object.assign(GILP_DATA.contact, {
    phone:    getVal('a-phone'),
    email:    getVal('a-email'),
    whatsapp: getVal('a-whatsapp'),
    website:  getVal('a-website'),
    address:  getVal('a-address'),
    hours:    getVal('a-hours'),
  });
  gilpSave();
  renderContact();
  renderFooter();
  showToast('✓ Contact info saved!');
};

/* ─── SAVE: Stats ───────────────────────────────────────────────────────── */
window.saveStats = function() {
  Object.assign(GILP_DATA.stats, {
    products: getVal('a-stat-products'),
    years:    getVal('a-stat-years'),
    cert1:    getVal('a-stat-cert1'),
    cert2:    getVal('a-stat-cert2'),
    cert3:    getVal('a-stat-cert3'),
    cert4:    getVal('a-stat-cert4'),
  });
  gilpSave();
  renderAboutStats();
  showToast('✓ Stats updated on homepage!');
};

/* ─── PRODUCTS ──────────────────────────────────────────────────────────── */
function renderAdminProducts() {
  const list = document.getElementById('admin-prod-list');
  if (!list) return;
  if (!GILP_DATA.products.length) {
    list.innerHTML = `<p style="color:var(--text-muted);font-size:13px;padding:16px 0">No products yet. Add one above.</p>`;
    return;
  }
  nextProdId = Math.max(...GILP_DATA.products.map(p => p.id), nextProdId) + 1;
  list.innerHTML = GILP_DATA.products.map(p => `
    <div class="admin-prod-row" id="apr-${p.id}">
      <img class="admin-prod-thumb"
           src="${p.image || 'images/products/placeholder.svg'}"
           alt="${p.name}"
           onerror="this.src='images/products/placeholder.svg'">
      <div class="admin-prod-info">
        <strong>${p.name}</strong>
        <span>${p.category} · ${p.tags.join(', ')}</span>
      </div>
      <div class="admin-prod-actions">
        <button class="del-btn" onclick="deleteProduct(${p.id})">Delete</button>
      </div>
    </div>`).join('');
}

/* Add product form toggle */
window.toggleAddForm = function() {
  const form = document.getElementById('add-prod-form');
  form.classList.toggle('open');
  // Reset preview
  const prev = document.getElementById('np-img-preview');
  const rem  = document.getElementById('np-img-remove');
  if (prev) { prev.src = ''; prev.classList.remove('show'); }
  if (rem)  rem.classList.remove('show');
  document.getElementById('np-img-input').value = '';
  document.getElementById('np-img-dataurl').value = '';
};

/* Product image picker */
const npImgInput = document.getElementById('np-img-input');
if (npImgInput) {
  npImgInput.addEventListener('change', function() {
    handleProductImageFile(this.files[0], 'np-img-preview', 'np-img-remove', 'np-img-dataurl');
  });
}
document.getElementById('np-img-zone')?.addEventListener('click', () => npImgInput?.click());

setupDragDrop('np-img-zone', file => {
  if (npImgInput) npImgInput.files; // Can't set, handled via dataUrl
  handleProductImageFile(file, 'np-img-preview', 'np-img-remove', 'np-img-dataurl');
});

function handleProductImageFile(file, previewId, removeId, dataurlId) {
  if (!file) return;
  if (!file.type.startsWith('image/')) { showToast('⚠ Please select an image file'); return; }
  if (file.size > 5 * 1024 * 1024) { showToast('⚠ Image must be under 5 MB'); return; }
  const reader = new FileReader();
  reader.onload = e => {
    const prev = document.getElementById(previewId);
    const rem  = document.getElementById(removeId);
    const du   = document.getElementById(dataurlId);
    if (prev) { prev.src = e.target.result; prev.classList.add('show'); }
    if (rem)  rem.classList.add('show');
    if (du)   du.value = e.target.result;
    // Show file name
    const zone = document.getElementById('np-img-zone');
    if (zone) {
      const nameEl = zone.querySelector('.img-upload-text');
      if (nameEl) nameEl.textContent = file.name;
    }
  };
  reader.readAsDataURL(file);
}

window.clearNewProdImage = function() {
  document.getElementById('np-img-preview').classList.remove('show');
  document.getElementById('np-img-remove').classList.remove('show');
  document.getElementById('np-img-dataurl').value = '';
  document.getElementById('np-img-input').value   = '';
  const zone = document.getElementById('np-img-zone');
  if (zone) { const t = zone.querySelector('.img-upload-text'); if (t) t.textContent = 'Click to upload or drag & drop'; }
};

window.addProduct = function() {
  const name    = getVal('np-name').trim();
  const cat     = getVal('np-cat');
  const desc    = getVal('np-desc').trim();
  const tags    = getVal('np-tags').split(',').map(t => t.trim()).filter(Boolean);
  const imgData = getVal('np-img-dataurl');

  if (!name || !desc) { showToast('⚠ Name and Description are required'); return; }

  const prod = {
    id:          nextProdId++,
    name, category: cat, description: desc, tags,
    image:       imgData || '',
  };
  GILP_DATA.products.push(prod);
  gilpSave();
  renderProducts();
  renderAdminProducts();

  // Reset form
  ['np-name','np-desc','np-tags'].forEach(id => setVal(id, ''));
  clearNewProdImage();
  document.getElementById('add-prod-form').classList.remove('open');
  showToast('✓ Product added!');
};

window.deleteProduct = function(id) {
  const prod = GILP_DATA.products.find(p => p.id === id);
  if (!prod) return;
  if (!confirm(`Delete "${prod.name}" from the website?`)) return;
  GILP_DATA.products = GILP_DATA.products.filter(p => p.id !== id);
  gilpSave();
  renderProducts();
  renderAdminProducts();
  showToast('✓ Product removed');
};

/* ─── Drag & drop helper ────────────────────────────────────────────────── */
function setupDragDrop(zoneId, onFile) {
  const zone = document.getElementById(zoneId);
  if (!zone) return;
  zone.addEventListener('dragover', e => { e.preventDefault(); zone.classList.add('drag-over'); });
  zone.addEventListener('dragleave', () => zone.classList.remove('drag-over'));
  zone.addEventListener('drop', e => {
    e.preventDefault();
    zone.classList.remove('drag-over');
    const file = e.dataTransfer.files[0];
    if (file) onFile(file);
  });
}

/* ─── Helpers ───────────────────────────────────────────────────────────── */
function getVal(id) { const el = document.getElementById(id); return el ? el.value : ''; }
function setVal(id, val) { const el = document.getElementById(id); if (el) el.value = val || ''; }

/* ─── Init ──────────────────────────────────────────────────────────────── */
document.addEventListener('DOMContentLoaded', () => showPanel('company'));
