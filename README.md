# 🌟 Manoj Ravi — Professional Multi-Page Engineering Portfolio Website

An aesthetic, responsive, multi-page portfolio website showcasing **Manoj Ravi's** qualifications, technical skills, engineering projects, and work experience as an **Electronics & Communication Engineer (B.E - ECE)** and **Automation Developer**.

---

## 🏗️ Multi-Page Architecture

This portfolio is structured across specialized pages so visitors can explore high-level overviews on the base page and click through to dedicated pages for comprehensive details:

| Page | URL | Description |
|---|---|---|
| **Home (Base Page)** | [`index.html`](index.html) | Master overview hub featuring profile photo, hero elevator pitch, key metrics, and interactive directory cards leading to dedicated topic pages. |
| **About Me** | [`about.html`](about.html) | In-depth biography, official career objective, engineering philosophy, spoken languages (English & Tamil), and core competencies. |
| **Engineering Projects** | [`projects.html`](projects.html) | Technical case studies: Raspberry Pi Soil Analysis System (NPK, pH, moisture sensors, ADC) and UiPath RE Framework automation pipeline. |
| **Work Experience** | [`experience.html`](experience.html) | Professional history at Hexaware Technologies (customer operations & query resolution) and Tech UC (PIC microcontroller & embedded firmware internship). |
| **Technical Skills** | [`skills.html`](skills.html) | Complete skill matrix across Programming (C, Python, Embedded C), Hardware, UiPath RPA, Databases (MySQL), Linux, and Soft Skills. |
| **Education Credentials** | [`education.html`](education.html) | Academic history: Sri Shakthi Institute (B.E ECE - 7.8 GPA) and Sathya Sai Higher Secondary (7.0 GPA) with coursework. |
| **Contact & Connect** | [`contact.html`](contact.html) | Interactive contact form, 1-click clipboard copying for email and phone (+91 6379348375), and Coimbatore location card. |

---

## 🎨 Visual Design & Highlights

- **Cyber-Engineering Dark Theme**: Deep obsidian background with ambient indigo and cyan radial lighting, glassmorphic blur cards, and sleek typography (`Inter`, `Outfit`, and `JetBrains Mono`).
- **Interactive UI**:
  - Live availability indicator (`Open to Full-Time Roles • Coimbatore, Tamil Nadu`).
  - 1-Click contact copying (`manojravi1707@gmail.com` and `+91 6379348375`) with animated toast feedback.
  - Interactive project detail modal and full-page case studies.
  - Formatted **Resume Modal** accessible from any page with built-in **Print / Save as PDF** support (`@media print`).
  - Interactive contact form with auto-formatted `mailto:` client integration.
  - 100% Mobile-first responsive navigation drawer.

---

## 📁 File Structure

```
manoj-ravi-portfolio/
├── index.html       # Base overview homepage & topic directory
├── about.html       # Dedicated biography, career objective & languages
├── projects.html    # In-depth case studies for IoT Soil Analysis & UiPath RPA
├── experience.html  # Career timeline: Hexaware Technologies & Tech UC
├── skills.html      # Comprehensive technical & soft skills matrix
├── education.html   # Degree records (Sri Shakthi Institute & Sathya Sai)
├── contact.html     # Contact form, direct phone/email copy & location
├── styles.css       # Tailwind utility configuration, glassmorphism & print stylesheet
├── script.js        # Interactive modals, clipboard toasts, mobile drawer, form handling
├── profile.jpg      # High-resolution profile portrait of Manoj Ravi
└── README.md        # Documentation and deployment guide
```

---

## 🚀 How to Run Locally

### Option 1: Direct Browser Launch
Double-click `index.html` or run in PowerShell:
```powershell
Start-Process "C:\Users\manoj\.gemini\antigravity\scratch\manoj-ravi-portfolio\index.html"
```

### Option 2: Local HTTP Server (Python)
In PowerShell:
```powershell
cd "C:\Users\manoj\.gemini\antigravity\scratch\manoj-ravi-portfolio"
python -m http.server 8080
```
Then visit `http://localhost:8080` in your web browser.

---

## 🐙 Git Workflow & Deployment

### Check Git Status:
```powershell
git status
```

### Commit & Push:
```powershell
git add .
git commit -m "feat: multi-page portfolio website with dedicated topic pages"
git push origin main
```

### Free GitHub Pages Hosting:
1. Push the code to GitHub.
2. In your repository settings, navigate to **Settings > Pages**.
3. Under **Build and deployment > Branch**, choose `main` / `root` and click **Save**.
4. Your website will be live globally at `https://manojravi1707-debug.github.io/manoj-ravi-portfolio/`.
