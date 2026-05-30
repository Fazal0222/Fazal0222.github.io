/**
 * GILP LABORATORIES — Site Data Store
 * =====================================
 * Edit this file to change default content,
 * or use the Admin Portal to update via UI.
 * Changes made in Admin are saved to localStorage.
 */

const GILP_DATA = {

  company: {
    name:    "GILP Laboratories",
    fullName: "Global Industrial & Lifesciences Pharmaceutical Laboratories",
    tagline: "Where Science Meets Industrial Precision",
    about:   "GILP Laboratories is committed to developing, manufacturing, and distributing high-quality pharmaceutical and industrial lifesciences solutions from Pune, Maharashtra. Guided by integrity, innovation, and scientific excellence — every formulation carries our commitment to patient safety and industrial precision.",
    foundedYear: 2020,
  },

  contact: {
    address:  "H M Royal Society, Near Khadi Machine, Kondawa\n3A Building, Flat No. 8, Floor 8\nPune, Maharashtra — India",
    phone:    "+91 — (Add your number)",
    email:    "info@gilplaboratories.com",
    whatsapp: "",
    website:  "www.gilplaboratories.com",
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

  products: [
    {
      id: 1,
      name: "Industrial Disinfectants",
      category: "Industrial",
      emoji: "🧴",
      description: "High-efficacy surface and equipment disinfectant solutions for industrial environments.",
      tags: ["GMP", "Industrial", "Bulk"],
      color: "c2"
    },
    {
      id: 2,
      name: "Ophthalmic Drops",
      category: "Ophthalmic",
      emoji: "👁",
      description: "Sterile ophthalmic formulations for dry eye, infection, and inflammation management.",
      tags: ["Sterile", "Ophthalmic", "WHO"],
      color: "c1"
    },
    {
      id: 3,
      name: "Dermatologic Creams",
      category: "Dermatologic",
      emoji: "🧪",
      description: "Dermatology-grade topical creams and ointments for clinical and consumer use.",
      tags: ["Topical", "GMP", "Derma"],
      color: "c3"
    },
    {
      id: 4,
      name: "Lifesciences Reagents",
      category: "Lifesciences",
      emoji: "🔬",
      description: "High-purity reagents and biochemical solutions for laboratory and research use.",
      tags: ["Research", "Lab", "ISO"],
      color: "c4"
    },
    {
      id: 5,
      name: "General Therapeutics",
      category: "General Therapeutic",
      emoji: "💊",
      description: "A broad portfolio of general therapeutic formulations including tablets and capsules.",
      tags: ["Oral", "GMP", "WHO"],
      color: "c2"
    },
    {
      id: 6,
      name: "Sanitization Solutions",
      category: "Industrial",
      emoji: "🧫",
      description: "Industrial-grade hand sanitizers and surface cleaners meeting WHO formulation guidelines.",
      tags: ["WHO", "Industrial", "Hygiene"],
      color: "c5"
    }
  ],

  mission: [
    {
      num: "01",
      title: "Mission",
      text: "Deliver high-quality pharmaceutical products that comply with strict regulatory standards and improve global health outcomes."
    },
    {
      num: "02",
      title: "Vision",
      text: "To become the most trusted provider of advanced industrial and lifesciences pharmaceutical solutions across South Asia and beyond."
    },
    {
      num: "03",
      title: "Values",
      text: "Unwavering commitment to patient safety, ethical business practices, and continuous innovation in every batch we produce."
    },
    {
      num: "04",
      title: "Goals",
      text: "Expand global reach, uphold zero-defect manufacturing, and lead accessible, effective medicine in industrial and lifesciences segments."
    }
  ],

  whyUs: [
    { icon: "🎯", title: "Precision Manufacturing", text: "Zero-defect production philosophy backed by stringent quality control at every stage of the manufacturing process." },
    { icon: "🔬", title: "R&D Innovation",          text: "Continuous research and development drives our formulation pipeline across both industrial and lifesciences segments." },
    { icon: "✅", title: "Regulatory Compliant",    text: "Fully aligned with GMP, WHO, and GDP guidelines ensuring complete product safety and documented efficacy." },
    { icon: "🌍", title: "Global Standards",        text: "Serving clients across India and international markets with consistently high quality and dependable supply chains." },
    { icon: "🤝", title: "Trusted Partnerships",    text: "Building long-term relationships with distributors, healthcare institutions, and industrial clients built on reliability." },
    { icon: "⚗️", title: "Expert Formulation",      text: "Pharmaceutical professionals dedicated to ethical practices, continuous learning, and patient safety in every decision." }
  ]
};

/* ——————————————————————————————
   Persistence: merge saved admin
   changes from localStorage
—————————————————————————————— */
(function mergeLocalStorage() {
  try {
    const saved = localStorage.getItem('gilp_data');
    if (saved) {
      const parsed = JSON.parse(saved);
      // Deep merge top-level keys
      Object.keys(parsed).forEach(key => {
        if (GILP_DATA[key] !== undefined) {
          if (Array.isArray(parsed[key])) {
            GILP_DATA[key] = parsed[key];
          } else if (typeof parsed[key] === 'object') {
            Object.assign(GILP_DATA[key], parsed[key]);
          }
        }
      });
    }
  } catch(e) {
    console.warn('GILP: Could not load saved data', e);
  }
})();

function gilpSave() {
  try {
    localStorage.setItem('gilp_data', JSON.stringify({
      company:  GILP_DATA.company,
      contact:  GILP_DATA.contact,
      stats:    GILP_DATA.stats,
      products: GILP_DATA.products,
    }));
  } catch(e) {
    console.warn('GILP: Could not save data', e);
  }
}
