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


  // Scroll effect on navbar
  function attachNavbarScroll() {
    if (!navbar) return;
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

  // ==========================================
  // ANIMATION & VISUAL EFFECTS SUITE
  // ==========================================

  // Scroll Reveal Animations
  function initScrollReveal() {
    const elements = document.querySelectorAll('.reveal-fade-up, .reveal-fade-left, .reveal-fade-right, .reveal-scale-up');
    if (!elements.length) return;

    const observer = new IntersectionObserver((entries, obs) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('reveal-active');
          obs.unobserve(entry.target);
        }
      });
    }, {
      threshold: 0.1,
      rootMargin: '0px 0px -40px 0px'
    });

    elements.forEach(el => observer.observe(el));
  }

  // Typewriter Text Cycler for Hero
  function initTypewriter() {
    const target = document.getElementById('typewriter-text');
    if (!target) return;

    const titles = [
      "Electronics & Communication",
      "IoT & Embedded Systems",
      "UiPath RPA Developer",
      "Python & C Programming",
      "Customer Support & Operations"
    ];

    let titleIndex = 0;
    let charIndex = 0;
    let isDeleting = false;
    let speed = 90;

    function type() {
      const current = titles[titleIndex];
      if (isDeleting) {
        target.textContent = current.substring(0, charIndex - 1);
        charIndex--;
        speed = 45;
      } else {
        target.textContent = current.substring(0, charIndex + 1);
        charIndex++;
        speed = 90;
      }

      if (!isDeleting && charIndex === current.length) {
        isDeleting = true;
        speed = 2000; // Pause at full text
      } else if (isDeleting && charIndex === 0) {
        isDeleting = false;
        titleIndex = (titleIndex + 1) % titles.length;
        speed = 400; // Pause before typing new
      }

      setTimeout(type, speed);
    }

    type();
  }

  // Interactive Card Spotlight & 3D Tilt
  function initSpotlightAndTilt() {
    const cards = document.querySelectorAll('.glass-card');
    cards.forEach(card => {
      card.addEventListener('mousemove', (e) => {
        const rect = card.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;
        card.style.setProperty('--spotlight-x', `${x}px`);
        card.style.setProperty('--spotlight-y', `${y}px`);

        if (card.classList.contains('tilt-card')) {
          const centerX = rect.width / 2;
          const centerY = rect.height / 2;
          const rotateX = ((y - centerY) / centerY) * -6;
          const rotateY = ((x - centerX) / centerX) * 6;
          card.style.transform = `perspective(1000px) rotateX(${rotateX.toFixed(2)}deg) rotateY(${rotateY.toFixed(2)}deg) translateY(-4px)`;
        }
      });

      card.addEventListener('mouseleave', () => {
        if (card.classList.contains('tilt-card')) {
          card.style.transform = '';
        }
      });
    });
  }

  // Number Counter Animation for Stats
  function initStatCounters() {
    const counters = document.querySelectorAll('[data-counter]');
    if (!counters.length) return;

    const observer = new IntersectionObserver((entries, obs) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          animateCounter(entry.target);
          obs.unobserve(entry.target);
        }
      });
    }, { threshold: 0.3 });

    counters.forEach(c => observer.observe(c));

    function animateCounter(el) {
      const targetStr = el.dataset.counter;
      const isFloat = targetStr.includes('.');
      const targetVal = parseFloat(targetStr);
      const duration = 1500;
      const startTime = performance.now();

      function update(now) {
        const elapsed = now - startTime;
        const progress = Math.min(elapsed / duration, 1);
        const ease = 1 - Math.pow(1 - progress, 3); // Ease-out cubic
        const current = ease * targetVal;

        el.textContent = isFloat ? current.toFixed(1) : Math.floor(current);

        if (progress < 1) {
          requestAnimationFrame(update);
        } else {
          el.textContent = targetStr;
        }
      }

      requestAnimationFrame(update);
    }
  }

  // Dynamic Skill Bars Fill Animation
  function initAnimatedSkillBars() {
    const skillFills = document.querySelectorAll('.skill-bar-fill[data-width]');
    if (!skillFills.length) return;

    const observer = new IntersectionObserver((entries, obs) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          const el = entry.target;
          el.style.width = el.dataset.width;
          obs.unobserve(el);
        }
      });
    }, { threshold: 0.15 });

    skillFills.forEach(bar => observer.observe(bar));
  }

  // Interactive Particle Canvas Network
  function initParticleCanvas() {
    const canvas = document.getElementById('particle-canvas');
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    let width, height;
    let particles = [];
    const particleCount = 40;
    let mouse = { x: null, y: null, radius: 110 };

    function resize() {
      if (!canvas.parentElement) return;
      width = canvas.width = canvas.parentElement.offsetWidth;
      height = canvas.height = canvas.parentElement.offsetHeight;
    }
    resize();
    window.addEventListener('resize', resize);

    window.addEventListener('mousemove', (e) => {
      const rect = canvas.getBoundingClientRect();
      mouse.x = e.clientX - rect.left;
      mouse.y = e.clientY - rect.top;
    });

    window.addEventListener('mouseout', () => {
      mouse.x = null;
      mouse.y = null;
    });

    class Particle {
      constructor() {
        this.x = Math.random() * width;
        this.y = Math.random() * height;
        this.vx = (Math.random() - 0.5) * 0.65;
        this.vy = (Math.random() - 0.5) * 0.65;
        this.radius = Math.random() * 2 + 1;
        const palette = ['rgba(124, 58, 237, ', 'rgba(255, 87, 34, ', 'rgba(163, 230, 53, '];
        this.color = palette[Math.floor(Math.random() * palette.length)];
        this.alpha = Math.random() * 0.45 + 0.25;
      }

      update() {
        this.x += this.vx;
        this.y += this.vy;

        if (this.x < 0 || this.x > width) this.vx *= -1;
        if (this.y < 0 || this.y > height) this.vy *= -1;

        if (mouse.x !== null && mouse.y !== null) {
          const dx = mouse.x - this.x;
          const dy = mouse.y - this.y;
          const dist = Math.sqrt(dx * dx + dy * dy);
          if (dist < mouse.radius) {
            const force = (mouse.radius - dist) / mouse.radius;
            this.x -= (dx / dist) * force * 2.5;
            this.y -= (dy / dist) * force * 2.5;
          }
        }
      }

      draw() {
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
        ctx.fillStyle = this.color + this.alpha + ')';
        ctx.fill();
      }
    }

    for (let i = 0; i < particleCount; i++) {
      particles.push(new Particle());
    }

    function connect() {
      for (let a = 0; a < particles.length; a++) {
        for (let b = a + 1; b < particles.length; b++) {
          const dx = particles[a].x - particles[b].x;
          const dy = particles[a].y - particles[b].y;
          const dist = Math.sqrt(dx * dx + dy * dy);

          if (dist < 115) {
            const alpha = (1 - dist / 115) * 0.22;
            ctx.strokeStyle = `rgba(99, 102, 241, ${alpha})`;
            ctx.lineWidth = 0.8;
            ctx.beginPath();
            ctx.moveTo(particles[a].x, particles[a].y);
            ctx.lineTo(particles[b].x, particles[b].y);
            ctx.stroke();
          }
        }
      }
    }

    function animate() {
      ctx.clearRect(0, 0, width, height);
      for (let i = 0; i < particles.length; i++) {
        particles[i].update();
        particles[i].draw();
      }
      connect();
      requestAnimationFrame(animate);
    }

    animate();
  }

  // Floating Back-to-Top Button
  function initBackToTop() {
    const btn = document.getElementById('back-to-top');
    const circle = document.querySelector('#back-to-top circle.progress-circle');
    if (!btn) return;

    const totalDash = 138;

    window.addEventListener('scroll', () => {
      const scrollY = window.scrollY;
      const docHeight = document.documentElement.scrollHeight - window.innerHeight;
      const progress = docHeight > 0 ? scrollY / docHeight : 0;

      if (scrollY > 300) {
        btn.classList.add('visible');
      } else {
        btn.classList.remove('visible');
      }

      if (circle) {
        const offset = totalDash - (progress * totalDash);
        circle.style.strokeDashoffset = offset;
      }
    });

    btn.addEventListener('click', () => {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    });
  }

  // Universal Contact Me Click Handler (Opens mail client for manojravi1707@gmail.com)
  function attachContactMeHandlers() {
    const contactLinks = document.querySelectorAll('a, button');
    contactLinks.forEach(el => {
      const text = el.textContent.trim().toLowerCase();
      if (text === 'contact me' || text === 'get in touch') {
        if (el.tagName.toLowerCase() === 'a') {
          el.setAttribute('href', 'mailto:manojravi1707@gmail.com?subject=Contact%20Manoj%20Ravi');
        } else {
          el.addEventListener('click', (e) => {
            e.preventDefault();
            window.location.href = 'mailto:manojravi1707@gmail.com?subject=Contact%20Manoj%20Ravi';
          });
        }
      }
    });
  }

  // Extended init
  function init() {
    if (window.lucide) lucide.createIcons();
    attachNavbarScroll();
    attachMobileMenu();
    attachClipboardButtons();
    attachResumeModal();
    attachProjectModal();
    attachContactForm();
    attachContactMeHandlers();
    initScrollReveal();
    initTypewriter();
    initSpotlightAndTilt();
    initStatCounters();
    initAnimatedSkillBars();
    initParticleCanvas();
    initBackToTop();
    // New advanced animations
    initScrollProgressBar();
    initCursorGlow();
    initParallaxOrbs();
    initRippleEffect();
    initMagneticButtons();
  }

  // ==========================================
  // NEW ADVANCED ANIMATION SYSTEMS
  // ==========================================

  // 1. Scroll Progress Bar
  function initScrollProgressBar() {
    const bar = document.getElementById('scroll-progress-bar');
    if (!bar) return;
    window.addEventListener('scroll', () => {
      const scrollY = window.scrollY;
      const docH = document.documentElement.scrollHeight - window.innerHeight;
      const pct = docH > 0 ? (scrollY / docH) * 100 : 0;
      bar.style.width = pct.toFixed(2) + '%';
    }, { passive: true });
  }

  // 2. Cursor Glow Trail Canvas
  function initCursorGlow() {
    const canvas = document.getElementById('cursor-glow-canvas');
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    let trails = [];
    let mouse = { x: -200, y: -200 };

    function resize() {
      canvas.width  = window.innerWidth;
      canvas.height = window.innerHeight;
    }
    resize();
    window.addEventListener('resize', resize, { passive: true });

    window.addEventListener('mousemove', (e) => {
      mouse.x = e.clientX;
      mouse.y = e.clientY;
      trails.push({ x: e.clientX, y: e.clientY, r: 18, alpha: 0.35 });
      if (trails.length > 22) trails.shift();
    }, { passive: true });

    function drawGlow() {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      // Main cursor aura
      const grad = ctx.createRadialGradient(mouse.x, mouse.y, 0, mouse.x, mouse.y, 60);
      grad.addColorStop(0, 'rgba(124,58,237,0.22)');
      grad.addColorStop(0.5, 'rgba(255,87,34,0.12)');
      grad.addColorStop(1, 'rgba(0,0,0,0)');
      ctx.fillStyle = grad;
      ctx.beginPath();
      ctx.arc(mouse.x, mouse.y, 60, 0, Math.PI * 2);
      ctx.fill();
      // Trail rings
      trails.forEach((t, i) => {
        t.alpha -= 0.015;
        if (t.alpha <= 0) return;
        ctx.beginPath();
        ctx.arc(t.x, t.y, t.r * (1 - i / trails.length), 0, Math.PI * 2);
        ctx.fillStyle = `rgba(124,58,237,${t.alpha * (i / trails.length)})`;
        ctx.fill();
      });
      trails = trails.filter(t => t.alpha > 0);
      requestAnimationFrame(drawGlow);
    }
    drawGlow();
  }

  // 3. Parallax Floating Orbs
  function initParallaxOrbs() {
    const orbs = document.querySelectorAll('.floating-orb');
    if (!orbs.length) return;
    const speeds = [0.04, 0.07, 0.025];
    window.addEventListener('scroll', () => {
      const scrollY = window.scrollY;
      orbs.forEach((orb, i) => {
        const speed = speeds[i % speeds.length];
        const yShift = scrollY * speed;
        const xShift = scrollY * speed * 0.4;
        orb.style.transform = `translate(${i % 2 === 0 ? xShift : -xShift}px, ${yShift}px)`;
      });
    }, { passive: true });
  }

  // 4. Ripple Click Effect on Buttons
  function initRippleEffect() {
    const targets = document.querySelectorAll('.btn-primary, .btn-secondary, .copy-pill');
    targets.forEach(btn => {
      btn.classList.add('ripple-container');
      btn.addEventListener('click', (e) => {
        const rect = btn.getBoundingClientRect();
        const size = Math.max(rect.width, rect.height);
        const x = e.clientX - rect.left - size / 2;
        const y = e.clientY - rect.top  - size / 2;
        const ripple = document.createElement('span');
        ripple.className = 'ripple-wave';
        ripple.style.cssText = `width:${size}px;height:${size}px;left:${x}px;top:${y}px;`;
        btn.appendChild(ripple);
        ripple.addEventListener('animationend', () => ripple.remove());
      });
    });
  }

  // 5. Magnetic Button Effect
  function initMagneticButtons() {
    const btns = document.querySelectorAll('.btn-primary, .btn-secondary');
    btns.forEach(btn => {
      btn.addEventListener('mousemove', (e) => {
        const rect = btn.getBoundingClientRect();
        const dx = e.clientX - (rect.left + rect.width  / 2);
        const dy = e.clientY - (rect.top  + rect.height / 2);
        const dist = Math.sqrt(dx * dx + dy * dy);
        const maxDist = Math.max(rect.width, rect.height);
        if (dist < maxDist) {
          const pull = 0.28;
          btn.style.transform = `translate(${dx * pull}px, ${dy * pull}px)`;
        }
      });
      btn.addEventListener('mouseleave', () => {
        btn.style.transform = '';
      });
    });
  }

  // Run on DOM ready
  document.addEventListener('DOMContentLoaded', init);
})();
