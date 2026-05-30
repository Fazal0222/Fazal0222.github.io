/**
 * GILP LABORATORIES — Site Data Store v2
 * =========================================
 * GitHub Pages: https://fazal0222.github.io
 * Product images live in: /images/products/
 * Logo image lives in:    /images/logo/
 *
 * To add a product image:
 *   1. Put the image file in /images/products/
 *   2. Set the product's "image" field to "images/products/yourfile.jpg"
 *
 * Or use the Admin Portal — it saves images as base64 in localStorage.
 */

const GILP_DATA = {

  company: {
    name:        "GILP Laboratories",
    fullName:    "Global Industrial & Lifesciences Pharmaceutical Laboratories",
    tagline:     "Where Science Meets Industrial Precision",
    about:       "GILP Laboratories is committed to developing, manufacturing, and distributing high-quality pharmaceutical and industrial lifesciences solutions from Pune, Maharashtra. Guided by integrity, innovation, and scientific excellence — every formulation carries our commitment to patient safety and industrial precision.",
    logoImage:   "",   // Set to "images/logo/logo.png" after upload, or leave "" for letter icon
    logoLetter:  "G",
  },

  contact: {
    address:  "H M Royal Society, Near Khadi Machine, Kondawa\n3A Building, Flat No. 8, Floor 8\nPune, Maharashtra — India",
    phone:    "",
    email:    "info@gilplaboratories.com",
    whatsapp: "",
    website:  "fazal0222.github.io",
    hours:    "Mon–Sat: 9:00 AM – 6:00 PM IST",
  },

  stats: {
    products: "150+",
    years:    "5+",
    cert1:    "GMP",
    cert2:    "WHO",
    cert3:    "ISO",
    cert4:    "GDP",
  },

  certifications: ["GMP Certified", "WHO Compliant", "ISO Quality", "GDP Certified"],

  // ─── PRODUCTS ──────────────────────────────────────────────────────────────
  // image: path relative to index.html, e.g. "images/products/disinfectant.jpg"
  //        Leave "" to show the placeholder SVG
  products: [
    {
      id: 1,
      name:        "Industrial Disinfectants",
      category:    "Industrial",
      image:       "",
      description: "High-efficacy surface and equipment disinfectant solutions for industrial environments.",
      tags:        ["GMP", "Industrial", "Bulk"]
    },
    {
      id: 2,
      name:        "Ophthalmic Drops",
      category:    "Ophthalmic",
      image:       "",
      description: "Sterile ophthalmic formulations for dry eye, infection, and inflammation management.",
      tags:        ["Sterile", "Ophthalmic", "WHO"]
    },
    {
      id: 3,
      name:        "Dermatologic Creams",
      category:    "Dermatologic",
      image:       "",
      description: "Dermatology-grade topical creams and ointments for clinical and consumer use.",
      tags:        ["Topical", "GMP", "Derma"]
    },
    {
      id: 4,
      name:        "Lifesciences Reagents",
      category:    "Lifesciences",
      image:       "",
      description: "High-purity reagents and biochemical solutions for laboratory and research use.",
      tags:        ["Research", "Lab", "ISO"]
    },
    {
      id: 5,
      name:        "General Therapeutics",
      category:    "General Therapeutic",
      image:       "",
      description: "A broad portfolio of general therapeutic formulations including tablets and capsules.",
      tags:        ["Oral", "GMP", "WHO"]
    },
    {
      id: 6,
      name:        "Sanitization Solutions",
      category:    "Industrial",
      image:       "",
      description: "Industrial-grade hand sanitizers and surface cleaners meeting WHO formulation guidelines.",
      tags:        ["WHO", "Industrial", "Hygiene"]
    }
  ],

  mission: [
    { num:"01", title:"Mission", text:"Deliver high-quality pharmaceutical products that comply with strict regulatory standards and improve global health outcomes." },
    { num:"02", title:"Vision",  text:"To become the most trusted provider of advanced industrial and lifesciences pharmaceutical solutions across South Asia and beyond." },
    { num:"03", title:"Values",  text:"Unwavering commitment to patient safety, ethical business practices, and continuous innovation in every batch we produce." },
    { num:"04", title:"Goals",   text:"Expand global reach, uphold zero-defect manufacturing, and lead accessible, effective medicine in industrial and lifesciences segments." }
  ],

  whyUs: [
    { icon:"🎯", title:"Precision Manufacturing", text:"Zero-defect production philosophy backed by stringent quality control at every stage of the manufacturing process." },
    { icon:"🔬", title:"R&D Innovation",           text:"Continuous research and development drives our formulation pipeline across both industrial and lifesciences segments." },
    { icon:"✅", title:"Regulatory Compliant",     text:"Fully aligned with GMP, WHO, and GDP guidelines ensuring complete product safety and documented efficacy." },
    { icon:"🌍", title:"Global Standards",         text:"Serving clients across India and international markets with consistently high quality and dependable supply chains." },
    { icon:"🤝", title:"Trusted Partnerships",     text:"Building long-term relationships with distributors, healthcare institutions, and industrial clients built on reliability." },
    { icon:"⚗️", title:"Expert Formulation",       text:"Pharmaceutical professionals dedicated to ethical practices, continuous learning, and patient safety in every decision." }
  ]
};

/* ─── Persistence ─────────────────────────────────────────────────────────── */
(function mergeLocalStorage() {
  try {
    const saved = localStorage.getItem('gilp_data_v2');
    if (!saved) return;
    const parsed = JSON.parse(saved);
    ['company','contact','stats','products'].forEach(key => {
      if (parsed[key] === undefined) return;
      if (Array.isArray(parsed[key])) {
        GILP_DATA[key] = parsed[key];
      } else if (typeof parsed[key] === 'object') {
        Object.assign(GILP_DATA[key], parsed[key]);
      }
    });
  } catch(e) { console.warn('GILP: Could not load saved data', e); }
})();

function gilpSave() {
  try {
    localStorage.setItem('gilp_data_v2', JSON.stringify({
      company:  GILP_DATA.company,
      contact:  GILP_DATA.contact,
      stats:    GILP_DATA.stats,
      products: GILP_DATA.products,
    }));
  } catch(e) { console.warn('GILP: Could not save data', e); }
}
