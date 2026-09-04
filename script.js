/* =====================================================
   SETUP / GLOBALS
===================================================== */
const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
const isTouch = window.matchMedia('(hover: none), (pointer: coarse)').matches;
if (isTouch) document.body.classList.add('touch-device');

document.addEventListener('DOMContentLoaded', () => {
  if (window.lucide) lucide.createIcons();

  splitHeroTitle();
  initLoader();
  initNavbar();
  initMobileMenu();
  initScrollProgress();
  initCustomCursor();
  initCursorTrail();
  initMouseGlow();
  initParticles();
  initRevealAnimations();
  initRoleTypewriter();
  initLoaderTypewriter();
  initCounters();
  initTiltCards();
  initMagneticButtons();
  initHeroPhotoTilt();
  initTimelineFill();
  initActiveNavSection();
  initVideoControls();
  initContactForm();
  initBackToTop();
  initSmoothAnchors();
  initHeroBgWordParallax();
  initParallaxLayers();
  initSectionTint();
});

/* =====================================================
   HERO TITLE — SPLIT INTO ANIMATED LETTERS
========================================== */
function splitHeroTitle() {
  const words = document.querySelectorAll('.hero-title .split-text');
  words.forEach(word => {
    const text = word.textContent;
    word.textContent = '';
    [...text].forEach((ch, i) => {
      const span = document.createElement('span');
      span.className = 'char';
      span.style.setProperty('--i', i);
      span.textContent = ch === ' ' ? '\u00A0' : ch;
      word.appendChild(span);
    });
  });
}

/* =====================================================
   CURSOR TRAIL (small glowing embers following the pointer)
========================================== */
function initCursorTrail() {
  if (isTouch || prefersReducedMotion) return;
  const container = document.getElementById('cursorTrail');
  if (!container) return;
  let lastSpawn = 0;
  window.addEventListener('mousemove', (e) => {
    const now = performance.now();
    if (now - lastSpawn < 45) return;
    lastSpawn = now;
    const dot = document.createElement('span');
    dot.className = 'trail-dot';
    dot.style.left = e.clientX + 'px';
    dot.style.top = e.clientY + 'px';
    container.appendChild(dot);
    setTimeout(() => dot.remove(), 700);
  }, { passive: true });
}

/* =====================================================
   LOADER
========================================== */
function initLoader() {
  const loader = document.getElementById('loader');
  const barFill = document.getElementById('loaderBarFill');
  const percentEl = document.getElementById('loaderPercent');
  document.body.classList.add('loading');

  let progress = 0;
  const duration = prefersReducedMotion ? 400 : 1900;
  const start = performance.now();

  function tick(now) {
    const elapsed = now - start;
    progress = Math.min(100, Math.round((elapsed / duration) * 100));
    barFill.style.width = progress + '%';
    percentEl.textContent = progress + '%';
    if (progress < 100) {
      requestAnimationFrame(tick);
    } else {
      finishLoading();
    }
  }
  requestAnimationFrame(tick);

  function finishLoading() {
    setTimeout(() => {
      loader.classList.add('loader-hide');
      document.body.classList.remove('loading');
      // Kick off the cinematic hero entrance right as the iris wipe reveals the page
      requestAnimationFrame(() => document.body.classList.add('loaded'));
      setTimeout(() => {
        loader.classList.add('loader-done');
      }, 1100);
    }, 250);
  }
}

function initLoaderTypewriter() {
  const el = document.getElementById('loaderName');
  if (!el) return;
  const text = 'CHALAMGOLU SRINIVAS';
  let i = 0;
  const speed = prefersReducedMotion ? 0 : 45;
  function type() {
    if (i <= text.length) {
      el.textContent = text.slice(0, i);
      i++;
      if (speed) setTimeout(type, speed); else el.textContent = text;
    }
  }
  type();
}

/* =====================================================
   NAVBAR
========================================== */
function initNavbar() {
  const navbar = document.getElementById('navbar');
  let lastY = window.scrollY;
  window.addEventListener('scroll', () => {
    if (window.scrollY > 40) navbar.classList.add('scrolled');
    else navbar.classList.remove('scrolled');
    lastY = window.scrollY;
  }, { passive: true });
}

function initMobileMenu() {
  const btn = document.getElementById('hamburger');
  const menu = document.getElementById('mobileMenu');
  if (!btn || !menu) return;
  btn.addEventListener('click', () => {
    const open = menu.classList.toggle('open');
    btn.classList.toggle('open', open);
    btn.setAttribute('aria-expanded', open);
  });
  menu.querySelectorAll('a').forEach(a => {
    a.addEventListener('click', () => {
      menu.classList.remove('open');
      btn.classList.remove('open');
      btn.setAttribute('aria-expanded', 'false');
    });
  });
}

/* =====================================================
   SCROLL PROGRESS
========================================== */
function initScrollProgress() {
  const bar = document.getElementById('scrollProgressBar');
  if (!bar) return;
  function update() {
    const h = document.documentElement;
    const scrolled = h.scrollTop;
    const height = h.scrollHeight - h.clientHeight;
    const pct = height > 0 ? (scrolled / height) * 100 : 0;
    bar.style.width = pct + '%';
  }
  window.addEventListener('scroll', update, { passive: true });
  update();
}

/* =====================================================
   CUSTOM CURSOR
========================================== */
function initCustomCursor() {
  if (isTouch) return;
  const dot = document.querySelector('.cursor-dot');
  const ring = document.querySelector('.cursor-ring');
  if (!dot || !ring) return;

  let mouseX = window.innerWidth / 2, mouseY = window.innerHeight / 2;
  let ringX = mouseX, ringY = mouseY;

  window.addEventListener('mousemove', (e) => {
    mouseX = e.clientX;
    mouseY = e.clientY;
    dot.style.transform = `translate(${mouseX}px, ${mouseY}px) translate(-50%,-50%)`;
  });

  function animateRing() {
    ringX += (mouseX - ringX) * 0.18;
    ringY += (mouseY - ringY) * 0.18;
    ring.style.transform = `translate(${ringX}px, ${ringY}px) translate(-50%,-50%)`;
    requestAnimationFrame(animateRing);
  }
  animateRing();

  const hoverables = 'a, button, .tilt-card, input, select, textarea, .flip-inner';
  document.addEventListener('mouseover', (e) => {
    if (e.target.closest(hoverables)) ring.classList.add('cursor-hover');
  });
  document.addEventListener('mouseout', (e) => {
    if (e.target.closest(hoverables)) ring.classList.remove('cursor-hover');
  });
}

/* =====================================================
   MOUSE-FOLLOW BACKGROUND GLOW
========================================== */
function initMouseGlow() {
  if (isTouch) return;
  const glow = document.getElementById('mouseGlow');
  if (!glow) return;
  window.addEventListener('mousemove', (e) => {
    glow.style.left = e.clientX + 'px';
    glow.style.top = e.clientY + 'px';
  }, { passive: true });
}

/* =====================================================
   FLOATING PARTICLES
========================================== */
function initParticles() {
  const container = document.getElementById('bgParticles');
  if (!container || prefersReducedMotion) return;
  const count = window.innerWidth < 768 ? 18 : 36;
  for (let i = 0; i < count; i++) {
    const p = document.createElement('span');
    p.className = 'particle';
    const size = Math.random() * 3 + 1;
    p.style.width = size + 'px';
    p.style.height = size + 'px';
    p.style.left = Math.random() * 100 + 'vw';
    p.style.bottom = '-10px';
    p.style.animationDuration = (Math.random() * 18 + 14) + 's';
    p.style.animationDelay = (Math.random() * 20) + 's';
    if (i % 4 === 0) {
      p.style.background = '#ffb454';
      p.style.boxShadow = '0 0 8px 2px rgba(255,180,84,0.5)';
    }
    container.appendChild(p);
  }
}

/* =====================================================
   SCROLL REVEAL (IntersectionObserver)
========================================== */
function initRevealAnimations() {
  const targets = document.querySelectorAll('.reveal, .reveal-left, .reveal-right, .reveal-scale, .reveal-char');
  if (!targets.length) return;

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('in-view');
      } else {
        entry.target.classList.remove('in-view');
      }
    });
  }, { threshold: 0.15, rootMargin: '0px 0px -8% 0px' });

  targets.forEach(t => observer.observe(t));
}

/* =====================================================
   HERO ROLE TYPEWRITER / ROTATOR
========================================== */
function initRoleTypewriter() {
  const el = document.getElementById('roleRotator');
  if (!el) return;
  const roles = [
    'Digital Innovator',
    'Founder of Datta Creations',
    'IoT Engineer',
    'Website Developer',
    'Digital Marketer',
    'Creative Technologist',
    'B.Tech Student',
    'Team Leader'
  ];

  if (prefersReducedMotion) {
    el.textContent = roles[0];
    return;
  }

  let roleIndex = 0;
  let charIndex = roles[0].length;
  let deleting = false;

  function step() {
    const current = roles[roleIndex];
    if (!deleting) {
      charIndex++;
      if (charIndex > current.length) {
        deleting = true;
        setTimeout(step, 1400);
        return;
      }
    } else {
      charIndex--;
      if (charIndex < 0) {
        deleting = false;
        roleIndex = (roleIndex + 1) % roles.length;
        charIndex = 0;
      }
    }
    el.textContent = current.slice(0, charIndex);
    setTimeout(step, deleting ? 35 : 65);
  }
  setTimeout(step, 1400);
}

/* =====================================================
   ANIMATED COUNTERS
========================================== */
function initCounters() {
  const counters = document.querySelectorAll('[data-count]');
  if (!counters.length) return;

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        animateCount(entry.target);
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.5 });

  counters.forEach(c => observer.observe(c));

  function animateCount(el) {
    const target = parseInt(el.dataset.count, 10);
    if (prefersReducedMotion) { el.textContent = target; return; }
    let current = 0;
    const duration = 1400;
    const startTime = performance.now();
    function tick(now) {
      const progress = Math.min(1, (now - startTime) / duration);
      const eased = 1 - Math.pow(1 - progress, 3);
      current = Math.round(eased * target);
      el.textContent = current + (target >= 15 ? '+' : '');
      if (progress < 1) requestAnimationFrame(tick);
      else el.textContent = target + (target >= 15 ? '+' : '');
    }
    requestAnimationFrame(tick);
  }
}

/* =====================================================
   3D TILT CARDS
========================================== */
function initTiltCards() {
  if (isTouch || prefersReducedMotion) return;
  const cards = document.querySelectorAll('.tilt-card');
  cards.forEach(card => {
    card.addEventListener('mousemove', (e) => {
      const rect = card.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      const cx = rect.width / 2;
      const cy = rect.height / 2;
      const rotateX = ((y - cy) / cy) * -6;
      const rotateY = ((x - cx) / cx) * 6;
      card.style.transform = `perspective(900px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateY(-4px)`;
    });
    card.addEventListener('mouseleave', () => {
      card.style.transform = 'perspective(900px) rotateX(0) rotateY(0) translateY(0)';
    });
  });
}

/* =====================================================
   MAGNETIC BUTTONS
========================================== */
function initMagneticButtons() {
  if (isTouch || prefersReducedMotion) return;
  const items = document.querySelectorAll('.magnetic');
  items.forEach(item => {
    item.addEventListener('mousemove', (e) => {
      const rect = item.getBoundingClientRect();
      const x = e.clientX - rect.left - rect.width / 2;
      const y = e.clientY - rect.top - rect.height / 2;
      item.style.transform = `translate(${x * 0.25}px, ${y * 0.35}px)`;
      item.style.setProperty('--rx', ((e.clientX - rect.left) / rect.width) * 100 + '%');
      item.style.setProperty('--ry', ((e.clientY - rect.top) / rect.height) * 100 + '%');
    });
    item.addEventListener('mouseleave', () => {
      item.style.transform = 'translate(0,0)';
    });
  });
}

/* =====================================================
   HERO PHOTO 3D TILT ON MOUSE MOVE
========================================== */
function initHeroPhotoTilt() {
  if (isTouch || prefersReducedMotion) return;
  const wrap = document.getElementById('heroPhotoWrap');
  const frame = document.getElementById('heroPhotoFrame');
  if (!wrap || !frame) return;

  wrap.addEventListener('mousemove', (e) => {
    const rect = wrap.getBoundingClientRect();
    const x = (e.clientX - rect.left) / rect.width - 0.5;
    const y = (e.clientY - rect.top) / rect.height - 0.5;
    frame.style.transform = `rotateY(${x * 14}deg) rotateX(${-y * 14}deg) scale(1.03)`;
  });
  wrap.addEventListener('mouseleave', () => {
    frame.style.transform = 'rotateY(0) rotateX(0) scale(1)';
  });
}

/* =====================================================
   TIMELINE SCROLL FILL
========================================== */
function initTimelineFill() {
  const timeline = document.getElementById('timeline');
  const fill = document.getElementById('timelineFill');
  if (!timeline || !fill) return;

  function update() {
    const rect = timeline.getBoundingClientRect();
    const viewportH = window.innerHeight;
    const total = rect.height;
    const visible = Math.min(Math.max(viewportH * 0.6 - rect.top, 0), total);
    const pct = total > 0 ? (visible / total) * 100 : 0;
    fill.style.height = pct + '%';
  }
  window.addEventListener('scroll', update, { passive: true });
  window.addEventListener('resize', update);
  update();
}

/* =====================================================
   ACTIVE NAV SECTION (on scroll)
========================================== */
function initActiveNavSection() {
  const sections = document.querySelectorAll('main section[id]');
  const navLinks = document.querySelectorAll('.nav-link');
  if (!sections.length || !navLinks.length) return;

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const id = entry.target.getAttribute('id');
        navLinks.forEach(link => {
          link.classList.toggle('active', link.dataset.section === id);
        });
      }
    });
  }, { threshold: 0.4, rootMargin: '-84px 0px -40% 0px' });

  sections.forEach(s => observer.observe(s));
}

/* =====================================================
   PROJECT VIDEO CONTROLS
========================================== */
function initVideoControls() {
  const video = document.getElementById('iotVideo');
  const toggle = document.getElementById('videoToggle');
  const icon = document.getElementById('videoIcon');
  if (!video || !toggle) return;

  function setIcon(name) {
    icon.setAttribute('data-lucide', name);
    if (window.lucide) lucide.createIcons();
  }

  toggle.addEventListener('click', () => {
    if (video.paused) {
      video.play();
      setIcon('pause');
    } else {
      video.pause();
      setIcon('play');
    }
  });

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        video.play().then(() => setIcon('pause')).catch(() => setIcon('play'));
      } else {
        video.pause();
        setIcon('play');
      }
    });
  }, { threshold: 0.4 });
  observer.observe(video);
}

/* =====================================================
   CONTACT FORM -> WHATSAPP
========================================== */
function initContactForm() {
  const form = document.getElementById('contactForm');
  if (!form) return;

  form.addEventListener('submit', (e) => {
    e.preventDefault();
    const name = form.name.value.trim();
    const email = form.email.value.trim();
    const phone = form.phone.value.trim();
    const purpose = form.purpose.value;
    const message = form.message.value.trim();

    let text = `Hi Srinu, I visited your portfolio.\n\n`;
    text += `Name: ${name || '-'}\n`;
    if (email) text += `Email: ${email}\n`;
    if (phone) text += `Phone: ${phone}\n`;
    text += `Purpose: ${purpose}\n`;
    if (message) text += `Message: ${message}\n`;

    const url = `https://wa.me/918367022341?text=${encodeURIComponent(text)}`;
    window.open(url, '_blank', 'noopener');
  });
}

/* =====================================================
   BACK TO TOP
========================================== */
function initBackToTop() {
  const btn = document.getElementById('backToTop');
  if (!btn) return;
  window.addEventListener('scroll', () => {
    btn.classList.toggle('show', window.scrollY > 600);
  }, { passive: true });
  btn.addEventListener('click', () => {
    window.scrollTo({ top: 0, behavior: prefersReducedMotion ? 'auto' : 'smooth' });
  });
}

/* =====================================================
   SMOOTH ANCHOR SCROLL (offset for fixed navbar)
========================================== */
function initSmoothAnchors() {
  const navH = 90;
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', (e) => {
      const id = anchor.getAttribute('href');
      if (id.length < 2) return;
      const target = document.querySelector(id);
      if (!target) return;
      e.preventDefault();
      const top = target.getBoundingClientRect().top + window.scrollY - navH;
      window.scrollTo({ top, behavior: prefersReducedMotion ? 'auto' : 'smooth' });
    });
  });
}

/* =====================================================
   SCROLL-LINKED PARALLAX (background blobs, photos)
========================================== */
function initParallaxLayers() {
  if (prefersReducedMotion) return;
  const layers = document.querySelectorAll('[data-parallax]');
  if (!layers.length) return;

  let ticking = false;
  function update() {
    const y = window.scrollY;
    layers.forEach(el => {
      const speed = parseFloat(el.dataset.parallax) || 0;
      el.style.transform = `translate3d(0, ${y * speed}px, 0)`;
    });
    ticking = false;
  }
  window.addEventListener('scroll', () => {
    if (!ticking) {
      requestAnimationFrame(update);
      ticking = true;
    }
  }, { passive: true });
  update();
}

/* =====================================================
   SECTION-BASED BACKGROUND TINT (subtle hue shift as you scroll)
========================================== */
function initSectionTint() {
  const sections = document.querySelectorAll('main section[id], .tech-orbit-section, .quote-section');
  const aurora = document.querySelector('.bg-aurora');
  if (!sections.length || !aurora) return;

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        document.body.dataset.section = entry.target.id || entry.target.className.split(' ')[0];
      }
    });
  }, { threshold: 0.5 });

  sections.forEach(s => observer.observe(s));
}
function initHeroBgWordParallax() {
  const word = document.getElementById('heroBgWord');
  if (!word || prefersReducedMotion) return;
  window.addEventListener('scroll', () => {
    const y = window.scrollY;
    word.style.transform = `translate(-50%, calc(-50% + ${y * 0.25}px)) rotate(${y * 0.02}deg)`;
  }, { passive: true });
}