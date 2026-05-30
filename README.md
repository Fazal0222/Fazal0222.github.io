# GILP Laboratories Website v2

**Global Industrial & Lifesciences Pharmaceutical Laboratories**
H M Royal Society, Near Khadi Machine, Kondawa — 3A Building, Flat No. 8, Floor 8, Pune, Maharashtra

---

## 🚀 Run on Localhost (Test Before Publishing)

### Option 1 — Python (Recommended, no install needed)
```bash
cd gilp-labs
python3 -m http.server 8080
```
Open: **http://localhost:8080**

### Option 2 — VS Code Live Server
1. Install **Live Server** extension in VS Code
2. Open the `gilp-labs` folder
3. Right-click `index.html` → **Open with Live Server**

### Option 3 — Node.js
```bash
npx serve .
```

> ⚠️  **Always run via a local server** (not by double-clicking index.html directly).
> Browsers block local file access for images and fonts when opened as `file://`.

---

## 📁 Project Structure

```
gilp-labs/
├── index.html                  ← Full website + Admin portal
├── css/
│   ├── style.css               ← Public website styles (mobile-first)
│   └── admin.css               ← Admin portal styles
├── js/
│   ├── data.js                 ← All site content (edit defaults here)
│   ├── main.js                 ← Renders content dynamically
│   └── admin.js                ← Admin portal logic + image upload
├── images/
│   ├── products/
│   │   └── placeholder.svg     ← Default product image
│   └── logo/                   ← Put your logo file here
└── README.md
```

---

## 🔐 Admin Portal

Click **⚙ Admin** button on the website.

| Field    | Value      |
|----------|------------|
| Username | `admin`    |
| Password | `gilp2025` |

### What you can do:
| Tab | Actions |
|-----|---------|
| 🏢 Company | Edit name, tagline, about text, **upload logo** |
| 💊 Products | Add products with **photo upload**, delete products |
| 📞 Contact | Phone, email, WhatsApp, address, hours |
| 📊 Stats | Products count, years, certification badges |

All changes **save to browser localStorage** — they persist through refreshes.

---

## 🖼️ Product Images on GitHub Pages

### Option A — Upload via Admin (Quick, local only)
- Use the Admin Portal → Products → Upload photo
- Image saves as base64 in your browser
- Works instantly but only in your browser

### Option B — Commit to repo (Permanent, works everywhere) ✅ Recommended
1. Put image files in `/images/products/` folder (e.g. `disinfectant.jpg`)
2. Edit `js/data.js` and set the product's `image` field:
   ```js
   { id: 1, name: "Industrial Disinfectants", image: "images/products/disinfectant.jpg", ... }
   ```
3. Commit and push → image is live on GitHub Pages

### Supported formats: JPG, PNG, WebP, SVG
### Recommended size: 800×600px, under 500KB per image

---

## 🌐 Deploy to GitHub Pages

Your site URL will be: **https://fazal0222.github.io**

### Steps:
1. Go to your repo: https://github.com/Fazal0222/Fazal0222.github.io
2. Upload all files from this `gilp-labs/` folder directly to the **root** of the repo
   (index.html should be at the root, not inside a subfolder)
3. Go to **Settings → Pages → Source**: Deploy from branch `main`, folder `/` (root)
4. Wait 1–2 minutes → visit https://fazal0222.github.io

### Folder structure in your repo root:
```
Fazal0222.github.io/  (repo root)
├── index.html
├── css/
├── js/
├── images/
└── README.md
```

---

## ✏️ Edit Default Content

Open `js/data.js` to permanently change any defaults:

```js
GILP_DATA.company.name    = "GILP Laboratories"
GILP_DATA.contact.phone   = "+91 XXXXX XXXXX"    // ← Add your number
GILP_DATA.contact.email   = "info@gilp.com"
```

---

## ⚠️ Before Going Live — Checklist

- [ ] **Change admin password** in `js/admin.js` (line: `const ADMIN_CREDS`)
- [ ] Add your real **phone number** in `js/data.js` → `contact.phone`
- [ ] Upload your **company logo** via Admin Portal or put file in `images/logo/`
- [ ] Add **product photos** to `images/products/` and update `js/data.js`
- [ ] Connect a **contact form backend** (Formspree or EmailJS — free):
  - Formspree: https://formspree.io (add `action="https://formspree.io/f/YOURCODE"` to the form)
  - EmailJS: https://emailjs.com (free, works with Gmail)
- [ ] Test on mobile (Chrome DevTools → Toggle device toolbar)

---

## 📱 Mobile & Tablet Support

The site is fully responsive:
- **Mobile** (< 640px): Single column, hamburger menu, stacked admin tabs
- **Tablet** (640–1024px): 2-column grids, expanded nav
- **Desktop** (> 1024px): Full 3–4 column layouts, sidebar admin

---

Built for GILP Laboratories, Pune, Maharashtra 🇮🇳
