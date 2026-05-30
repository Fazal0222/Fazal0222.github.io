# GILP Laboratories — Website

**Global Industrial & Lifesciences Pharmaceutical Laboratories**
H M Royal Society, Near Khadi Machine, Kondawa
3A Building, Flat No. 8, Floor 8 — Pune, Maharashtra

---

## 🚀 Run Locally (Localhost)

### Option 1 — Python (easiest, no install needed)
Python comes pre-installed on most systems.

```bash
# Navigate into the project folder
cd gilp-labs

# Python 3 (recommended)
python3 -m http.server 8080

# Python 2 (if python3 not available)
python -m SimpleHTTPServer 8080
```
Then open: **http://localhost:8080**

---

### Option 2 — Node.js `serve` package

```bash
# Install serve globally (one-time)
npm install -g serve

# Run from inside the folder
cd gilp-labs
serve .
```
Then open: **http://localhost:3000**

---

### Option 3 — VS Code Live Server

1. Install the **Live Server** extension in VS Code
2. Open the `gilp-labs` folder in VS Code
3. Right-click `index.html` → **Open with Live Server**

Auto-reloads on every file save!

---

### Option 4 — PHP (if installed)

```bash
cd gilp-labs
php -S localhost:8080
```

---

## 📁 Project Structure

```
gilp-labs/
├── index.html          ← Main website (open this)
├── css/
│   ├── style.css       ← Public site styles
│   └── admin.css       ← Admin portal styles
├── js/
│   ├── data.js         ← All site content/data (edit defaults here)
│   ├── main.js         ← Renders content, nav, forms
│   └── admin.js        ← Admin portal logic
└── README.md           ← This file
```

---

## 🔐 Admin Portal

Click the **⚙ Admin** button in the top-right corner of the website.

| Field    | Value      |
|----------|------------|
| Username | `admin`    |
| Password | `gilp2025` |

**What you can do in Admin:**
- ✏️  Edit company name, tagline, about description
- 💊  Add / delete products (live preview on save)
- 📞  Update phone, email, address, WhatsApp
- 📊  Change homepage stats and certification badges

**Data persistence:** All changes are saved to `localStorage` in your browser — they persist between page refreshes. Clear browser data to reset to defaults.

---

## ✏️ Editing Default Content

To permanently change default content (not just in browser), edit **`js/data.js`**.

All site content lives in the `GILP_DATA` object:
- `GILP_DATA.company`   — name, tagline, about text
- `GILP_DATA.contact`   — address, phone, email
- `GILP_DATA.stats`     — product count, years, certifications
- `GILP_DATA.products`  — product catalogue array
- `GILP_DATA.mission`   — mission/vision/values/goals
- `GILP_DATA.whyUs`     — "Why Choose Us" cards

---

## ⚠️ Before Going Live (Production)

1. **Change the admin password** in `js/admin.js`:
   ```js
   const ADMIN_CREDENTIALS = {
     username: 'admin',
     password: 'YOUR_NEW_STRONG_PASSWORD'
   };
   ```

2. **Add your real phone number** — update `js/data.js` → `contact.phone`

3. **Connect a backend** for the contact form (`index.html` → `#contact-form`)
   - Options: Formspree, Netlify Forms, EmailJS, or your own PHP/Node backend

4. **Add your logo** — replace the `G` icon in `.nav-logo-icon` with an `<img>` tag

5. **Deploy** to any static host:
   - Netlify (drag & drop the folder — free)
   - Vercel (`vercel deploy` command)
   - GitHub Pages
   - Any shared hosting (upload via FTP)

---

## 📞 Support

Built for GILP Laboratories, Pune.
Questions? Contact your developer.
