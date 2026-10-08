/**
 * Manoj Ravi - Portfolio Interactive Scripts
 * Handles mobile navigation, modals, clipboard copying, toasts, and project popups.
 */

(function () {
  'use strict';

  // Project Extended Content Data
  const PROJECT_DETAILS = {
    soil: {
      title: "Raspberry Pi Soil Analysis & Smart Crop Recommendation System",
      category: "IoT & Embedded Hardware",
      badgeClass: "cyan",
      techStack: ["Raspberry Pi 4", "NPK Soil Sensor", "Moisture / pH Sensors", "Python 3", "ADC Converter", "Hardware Support"],
      overview: "An integrated precision agriculture prototype designed to bridge physical sensor electronics with intelligent software diagnostics. Soil nutrients and physical conditions are measured continuously to eliminate guesswork for farmers and optimize crop yield.",
      keyFeatures: [
        "Real-Time Telemetry: Gathers soil moisture, pH, and macronutrient indices (Nitrogen, Phosphorus, Potassium) through interfaced sensor hardware.",
        "Analog-to-Digital Conversion: Employs signal conditioning and ADC circuits to interface sensor probes with the Raspberry Pi GPIO headers.",
        "Nutritional Evaluation Logic: Analyzes current soil health metrics against benchmark fertility databases.",
        "Crop Matching Engine: Recommends the highest-yielding crop strains tailored precisely to the analyzed soil profile."
      ],
      impact: "Eliminates soil testing delays and empowers sustainable farming through targeted fertilization and data-backed crop choices."
    },
    rpa: {
      title: "UiPath Robotic Enterprise Automation & Web Scraping Pipeline",
      category: "Robotic Process Automation (RPA)",
      badgeClass: "indigo",
      techStack: ["UiPath Studio", "Robotic Enterprise (RE) Framework", "Excel Automation", "Web Scraping", "SMTP / Outlook Integration"],
      overview: "An enterprise-grade software automation pipeline designed using UiPath's state-machine Robotic Enterprise Framework. Automatically scrapes web data, updates Excel spreadsheets, and dispatches automated status emails with attached documents.",
      keyFeatures: [
        "Robotic Enterprise Framework: Leveraged RE Framework state machine (Init, Get Transaction Data, Process, End Process) for industrial-grade stability and exception handling.",
        "Automatic Web Form Filling: Interacts with dynamic browser web elements to automate repetitive data entry workflows.",
        "Structured Web Data Scraping: High-speed automated extraction of tabular data into formatted Excel workbooks.",
        "Automated Email Dispatch: Assembles reports and triggers automated transactional emails with attachments to designated recipients."
      ],
      impact: "Reduced routine operational processing times by over 80% while completely removing human manual data entry errors."
    }
  };

  // Toast Notification System
  function showToast(message, type = 'success') {
    const container = document.getElementById('toast-container');
    if (!container) return;

    const toast = document.createElement('div');
    toast.className = `toast ${type}`;

    const iconName = type === 'success' ? 'check-circle' : 'info';
    toast.innerHTML = `
      <i data-lucide="${iconName}" class="w-4 h-4 text-emerald-400 shrink-0"></i>
      <span class="text-xs sm:text-sm font-medium">${escapeHtml(message)}</span>
    `;

    container.appendChild(toast);
    if (window.lucide) lucide.createIcons({ root: toast });

    setTimeout(() => toast.classList.add('show'), 10);

    setTimeout(() => {
      toast.classList.remove('show');
      setTimeout(() => toast.remove(), 300);
    }, 3500);
  }

  // Clipboard Copy Functionality
  async function copyToClipboard(text, successMsg = 'Copied to clipboard!') {
    try {
      if (navigator.clipboard && navigator.clipboard.writeText) {
        await navigator.clipboard.writeText(text);
      } else {
        const textarea = document.createElement('textarea');
        textarea.value = text;
        textarea.style.position = 'fixed';
        textarea.style.opacity = '0';
        document.body.appendChild(textarea);
        textarea.select();
        document.execCommand('copy');
        document.body.removeChild(textarea);
      }
      showToast(successMsg, 'success');
    } catch (err) {
      console.error('Failed to copy:', err);
      showToast('Could not copy to clipboard', 'error');
    }
  }

  function escapeHtml(str) {
    if (!str) return '';
    return str
      .replace(/&/g, "&amp;")
      .replace(/</g, "&lt;")
      .replace(/>/g, "&gt;")
      .replace(/"/g, "&quot;")
      .replace(/'/g, "&#039;");
  }

  // DOM Elements
  const navbar = document.getElementById('navbar');
  const mobileMenuBtn = document.getElementById('mobile-menu-btn');
  const mobileMenu = document.getElementById('mobile-menu');
  const mobileNavLinks = document.querySelectorAll('.mobile-nav-link');

  // Resume Modal Elements
  const resumeModal = document.getElementById('resume-modal');
  const modalCloseBtn = document.getElementById('modal-close-btn');
  const modalPrintBtn = document.getElementById('modal-print-btn');
  const viewResumeBtn = document.getElementById('view-resume-btn');
  const heroResumeBtn = document.getElementById('hero-resume-btn');
  const mobileResumeBtn = document.getElementById('mobile-resume-btn');
  const sidebarCvBtn = document.getElementById('sidebar-cv-btn');

  // Project Modal Elements
  const projectModal = document.getElementById('project-modal');
  const projectModalTitle = document.getElementById('project-modal-title');
  const projectModalBody = document.getElementById('project-modal-body');
  const projectModalClose = document.getElementById('project-modal-close');

  // Contact Form
  const contactForm = document.getElementById('contact-form');

  // Initialize
  function init() {
    if (window.lucide) lucide.createIcons();
    attachNavbarScroll();
    attachMobileMenu();
    attachClipboardButtons();
    attachResumeModal();
    attachProjectModal();
    attachContactForm();
  }

  // Scroll effect on navbar
  function attachNavbarScroll() {
    window.addEventListener('scroll', () => {
      if (window.scrollY > 40) {
        navbar.classList.add('shadow-xl', 'bg-[#070b14]/95');
      } else {
        navbar.classList.remove('shadow-xl', 'bg-[#070b14]/95');
      }
    });
  }

  // Mobile menu handling
  function attachMobileMenu() {
    if (!mobileMenuBtn || !mobileMenu) return;

    mobileMenuBtn.addEventListener('click', () => {
      mobileMenu.classList.toggle('hidden');
    });

    mobileNavLinks.forEach(link => {
      link.addEventListener('click', () => {
        mobileMenu.classList.add('hidden');
      });
    });
  }

  // Clipboard buttons (email, phone number pills)
  function attachClipboardButtons() {
    document.querySelectorAll('.copy-pill').forEach(btn => {
      btn.addEventListener('click', () => {
        const text = btn.dataset.clipboard;
        if (!text) return;
        const label = text.includes('@') ? 'Email copied: ' + text : 'Phone number copied: +91 ' + text;
        copyToClipboard(text, label);
      });
    });
  }

  // Resume Modal Triggers
  function openResumeModal() {
    if (resumeModal) {
      resumeModal.classList.add('active');
      document.body.style.overflow = 'hidden';
      if (window.lucide) lucide.createIcons();
    }
  }

  function closeResumeModal() {
    if (resumeModal) {
      resumeModal.classList.remove('active');
      document.body.style.overflow = '';
    }
  }

  function attachResumeModal() {
    const triggers = [viewResumeBtn, heroResumeBtn, mobileResumeBtn, sidebarCvBtn];
    triggers.forEach(btn => {
      if (btn) btn.addEventListener('click', openResumeModal);
    });

    if (modalCloseBtn) {
      modalCloseBtn.addEventListener('click', closeResumeModal);
    }

    if (resumeModal) {
      resumeModal.addEventListener('click', (e) => {
        if (e.target === resumeModal) closeResumeModal();
      });
    }

    if (modalPrintBtn) {
      modalPrintBtn.addEventListener('click', () => {
        window.print();
      });
    }

    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape') {
        closeResumeModal();
        closeProjectModal();
      }
    });
  }

  // Project Details Modal
  function openProjectModal(projectId) {
    const project = PROJECT_DETAILS[projectId];
    if (!project || !projectModal) return;

    projectModalTitle.textContent = project.title;

    let techTagsHtml = project.techStack.map(t =>
      `<span class="tag-badge ${project.badgeClass}">${escapeHtml(t)}</span>`
    ).join(' ');

    let featuresHtml = project.keyFeatures.map(f =>
      `<li class="flex items-start gap-2">
        <i data-lucide="check-circle" class="w-4 h-4 text-emerald-400 shrink-0 mt-0.5"></i>
        <span>${escapeHtml(f)}</span>
      </li>`
    ).join('');

    projectModalBody.innerHTML = `
      <div class="space-y-3">
        <div class="flex items-center gap-2">
          <span class="tag-badge ${project.badgeClass}">${escapeHtml(project.category)}</span>
        </div>
        <p class="text-xs sm:text-sm text-slate-300 leading-relaxed">${escapeHtml(project.overview)}</p>
      </div>

      <div class="space-y-2 pt-2 border-t border-white/10">
        <h4 class="text-xs font-semibold text-slate-400 uppercase tracking-wider">Key Architecture & Implementation:</h4>
        <ul class="space-y-2 text-xs sm:text-sm text-slate-300">
          ${featuresHtml}
        </ul>
      </div>

      <div class="p-3.5 rounded-xl bg-slate-900/80 border border-white/5 space-y-1">
        <span class="text-xs font-semibold text-slate-400 uppercase">Outcome & Impact:</span>
        <p class="text-xs text-slate-300">${escapeHtml(project.impact)}</p>
      </div>

      <div class="space-y-1.5 pt-2 border-t border-white/10">
        <span class="text-xs text-slate-400 block font-medium">Tools & Technologies:</span>
        <div class="flex flex-wrap gap-1.5">${techTagsHtml}</div>
      </div>
    `;

    projectModal.classList.add('active');
    document.body.style.overflow = 'hidden';
    if (window.lucide) lucide.createIcons();
  }

  function closeProjectModal() {
    if (projectModal) {
      projectModal.classList.remove('active');
      document.body.style.overflow = '';
    }
  }

  function attachProjectModal() {
    document.querySelectorAll('.project-details-btn').forEach(btn => {
      btn.addEventListener('click', () => {
        openProjectModal(btn.dataset.project);
      });
    });

    if (projectModalClose) {
      projectModalClose.addEventListener('click', closeProjectModal);
    }

    if (projectModal) {
      projectModal.addEventListener('click', (e) => {
        if (e.target === projectModal) closeProjectModal();
      });
    }
  }

  // Contact Form handler (triggers pre-filled email client mailto)
  function attachContactForm() {
    if (!contactForm) return;

    contactForm.addEventListener('submit', (e) => {
      e.preventDefault();

      const name = document.getElementById('contact-name').value.trim();
      const email = document.getElementById('contact-email').value.trim();
      const subject = document.getElementById('contact-subject').value.trim() || 'Inquiry from Portfolio';
      const message = document.getElementById('contact-message').value.trim();

      const mailtoLink = `mailto:manojravi1707@gmail.com?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(
        `Hi Manoj,\n\nMy name is ${name} (${email}).\n\n${message}\n\nBest regards,\n${name}`
      )}`;

      // Open mail client
      window.location.href = mailtoLink;

      showToast('Opening your email client to send message! 📨', 'success');
      contactForm.reset();
    });
  }

  // Run on DOM ready
  document.addEventListener('DOMContentLoaded', init);
})();
