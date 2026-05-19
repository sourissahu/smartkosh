/* ============================================
   SMARTKOSH TECHNOLOGIES — Main JS
   ============================================ */

document.addEventListener('DOMContentLoaded', () => {

  /* ── Navbar scroll behavior ── */
  const navbar = document.querySelector('.navbar');
  let lastScroll = 0;

  const handleScroll = () => {
    const y = window.scrollY;
    if (y > 20) {
      navbar.classList.add('scrolled');
    } else {
      navbar.classList.remove('scrolled');
    }
    lastScroll = y;
  };

  window.addEventListener('scroll', handleScroll, { passive: true });
  handleScroll();

  /* ── Hamburger toggle ── */
  const hamburger = document.querySelector('.hamburger');
  const navLinks  = document.querySelector('.nav-links');

  if (hamburger && navLinks) {
    hamburger.addEventListener('click', () => {
      hamburger.classList.toggle('open');
      navLinks.classList.toggle('open');
      document.body.style.overflow = navLinks.classList.contains('open') ? 'hidden' : '';
    });

    navLinks.querySelectorAll('a').forEach(link => {
      link.addEventListener('click', () => {
        hamburger.classList.remove('open');
        navLinks.classList.remove('open');
        document.body.style.overflow = '';
      });
    });
  }

  /* ── Scroll reveal ── */
  const revealObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
        revealObserver.unobserve(entry.target);
      }
    });
  }, { threshold: 0.12, rootMargin: '0px 0px -40px 0px' });

  document.querySelectorAll('.reveal').forEach(el => revealObserver.observe(el));

  /* ── Animated counter for stats ── */
  const counters = document.querySelectorAll('.stat-num[data-target]');

  const animateCounter = (el) => {
    const target = parseFloat(el.dataset.target);
    const suffix = el.dataset.suffix || '';
    const duration = 1800;
    const start = performance.now();
    const isFloat = String(target).includes('.');

    const tick = (now) => {
      const elapsed  = now - start;
      const progress = Math.min(elapsed / duration, 1);
      const eased    = 1 - Math.pow(1 - progress, 3); // ease-out-cubic
      const val      = eased * target;
      el.textContent = (isFloat ? val.toFixed(1) : Math.floor(val)) + suffix;
      if (progress < 1) requestAnimationFrame(tick);
    };

    requestAnimationFrame(tick);
  };

  const counterObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        animateCounter(entry.target);
        counterObserver.unobserve(entry.target);
      }
    });
  }, { threshold: 0.5 });

  counters.forEach(el => counterObserver.observe(el));

  /* ── Contact form ── */
  const contactForm = document.querySelector('.contact-form-el');
  if (contactForm) {
    contactForm.addEventListener('submit', (e) => {
      e.preventDefault();
      const btn     = contactForm.querySelector('.btn-submit');
      const origHTML = btn.innerHTML;

      btn.innerHTML = `<span>Sending…</span>`;
      btn.disabled  = true;

      setTimeout(() => {
        btn.innerHTML = `<svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><polyline points="20 6 9 17 4 12"/></svg><span>Message Sent!</span>`;
        btn.style.background = '#00c97a';

        setTimeout(() => {
          btn.innerHTML = origHTML;
          btn.style.background = '';
          btn.disabled = false;
          contactForm.reset();
        }, 3000);
      }, 1200);
    });
  }

  /* ── Cursor glow effect on hero ── */
  const hero = document.querySelector('.hero');
  if (hero && window.innerWidth > 900) {
    hero.addEventListener('mousemove', (e) => {
      const rect = hero.getBoundingClientRect();
      const x = ((e.clientX - rect.left) / rect.width) * 100;
      const y = ((e.clientY - rect.top) / rect.height) * 100;
      hero.style.setProperty('--mouse-x', `${x}%`);
      hero.style.setProperty('--mouse-y', `${y}%`);
    });
  }

  /* ── Active nav link on scroll ── */
  const sections = document.querySelectorAll('section[id]');
  const navAnchors = document.querySelectorAll('.nav-links a[href^="#"]');

  const activeObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        navAnchors.forEach(a => a.classList.remove('active'));
        const active = document.querySelector(`.nav-links a[href="#${entry.target.id}"]`);
        if (active) active.classList.add('active');
      }
    });
  }, { threshold: 0.4 });

  sections.forEach(s => activeObserver.observe(s));

  /* ── Tilt effect on product cards ── */
  const productCards = document.querySelectorAll('.product-card');

  productCards.forEach(card => {
    card.addEventListener('mousemove', (e) => {
      const rect   = card.getBoundingClientRect();
      const cx     = rect.left + rect.width / 2;
      const cy     = rect.top  + rect.height / 2;
      const dx     = (e.clientX - cx) / (rect.width / 2);
      const dy     = (e.clientY - cy) / (rect.height / 2);
      card.style.transform = `translateY(-10px) rotateY(${dx * 4}deg) rotateX(${-dy * 4}deg)`;
    });

    card.addEventListener('mouseleave', () => {
      card.style.transform = '';
      card.style.transition = 'transform 0.6s var(--ease-out)';
      setTimeout(() => card.style.transition = '', 600);
    });
  });

});
