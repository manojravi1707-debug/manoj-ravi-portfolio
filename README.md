# 🌟 Manoj Ravi — Professional Engineering Portfolio Website

An aesthetic, modern, and high-impact personal portfolio website showcasing **Manoj Ravi's** qualifications, technical skills, engineering projects, and work experience as an **Electronics & Communication Engineer (B.E - ECE)** and **Automation Developer**.

---

## 🎨 Visual Design & Theme
- **Aesthetic Cyber-Engineering Theme**: Obsidian/deep slate background with ambient indigo and cyan radial glows, glassmorphic backdrop filters, and sleek typography (`Outfit` + `Inter`).
- **Interactive UI**:
  - Live availability badge (`Open to Opportunities • Coimbatore, TN`)
  - 1-Click contact copying (Email: `manojravi1707@gmail.com`, Phone: `+91 6379348375`) with animated toast feedback
  - Project detail popups with technical implementation highlights and business impact
  - Interactive career and internship timeline
  - Interactive formatted **Resume Modal** with built-in **Print / Save as PDF** support (`@media print` stylesheet)
  - Interactive contact form with auto-formatted `mailto:` client integration
  - 100% Mobile-first responsive design with accessible navigation drawer

---

## 📄 Sections Included

1. **Header & Navigation**: Sticky blur navigation with brand monogram (`MR`), quick section links, and one-click "View Resume" action.
2. **Hero Section**: Strong elevator pitch, status badge, GPA highlight (7.8 / 10), and quick-action buttons.
3. **About Me**: Narrative connecting electronics hardware (PIC, Raspberry Pi) with software (Python, C, UiPath RE Framework, MySQL, Linux) and professional competencies from Hexaware Technologies.
4. **Technical Arsenal & Skills**:
   - **Hardware & Embedded**: Embedded C, Raspberry Pi, PIC Microcontrollers, Soil & Environmental Sensors, LCD Interfacing, Hardware Support.
   - **Programming & Databases**: Python, C Programming, MySQL, Linux OS.
   - **Automation & Professional**: UiPath Studio (RE Framework), Web Scraping, Excel Automation, Leadership, Clear Communication, Time Management.
5. **Featured Projects**:
   - **Raspberry Pi Soil Analysis & Crop Recommendation System**: Precision IoT sensor analysis (NPK, pH, moisture) and agricultural decision-making algorithm.
   - **UiPath Robotic Enterprise Automation**: RE Framework transaction processing, automatic web form data entry, web scraping into Excel, and automated email distribution.
   - **PIC Microcontroller & LCD Telemetry**: Firmware in Embedded C, communication protocols, and circuit simulation.
6. **Work Experience**:
   - **Hexaware Technologies** (Associate / Support Executive, 2025–2026): Customer query resolution, queue time reduction, prompt issue escalations.
   - **Tech UC** (Embedded Systems Intern, 2022): PIC microcontroller programming, LCD interfacing, Embedded C, communication protocols.
7. **Education**:
   - **Sri Shakthi Institute**: B.E in Electronics & Communication Engineering (GPA: 7.8 / 10, 2020–2024).
   - **Sathya Sai**: Higher Secondary (GPA: 7.0 / 10, 2019–2020).
8. **Contact & Connect**: Direct copy buttons for email and phone, location card, and quick message inquiry form.
9. **Official Resume Modal**: Structured CV with one-click print/PDF download.

---

## 📁 File Structure

```
manoj-ravi-portfolio/
├── index.html       # Semantic responsive HTML5 structure
├── styles.css       # Custom aesthetic styling, glassmorphism, animations & print layout
├── script.js        # Event handlers, clipboard toasts, modal controls, and mobile menu
└── README.md        # Documentation and deployment guide
```

---

## 🚀 How to Run Locally

### Option 1: Direct Browser Launch
Open `index.html` directly in any web browser (Chrome, Edge, Firefox, Brave):
```powershell
Start-Process "C:\Users\manoj\.gemini\antigravity\scratch\manoj-ravi-portfolio\index.html"
```

### Option 2: Local HTTP Server (Python)
In PowerShell:
```powershell
cd "C:\Users\manoj\.gemini\antigravity\scratch\manoj-ravi-portfolio"
python -m http.server 8080
```
Then visit `http://localhost:8080` in your browser.

---

## 🌐 Free 1-Click Hosting Options

1. **GitHub Pages**:
   - Create a repository named `manoj-ravi-portfolio` or `<your-username>.github.io`.
   - Push these files to the `main` branch.
   - Go to **Settings > Pages** and select `Deploy from branch: main / root`.
2. **Netlify / Vercel**:
   - Drag and drop this folder onto [netlify.com/drop](https://app.netlify.com/drop) or deploy via Vercel for instant free global HTTPS hosting.

---

## 📸 Optional: Adding a Profile Photo
To display your portrait photo instead of the `MR` initials avatar:
1. Save your photo as `profile.jpg` inside `manoj-ravi-portfolio/`.
2. Open `index.html` and replace the avatar monogram div with:
```html
<img src="profile.jpg" alt="Manoj Ravi" class="w-20 h-20 rounded-2xl object-cover shadow-xl shadow-indigo-500/20 border-2 border-indigo-500/40">
```
