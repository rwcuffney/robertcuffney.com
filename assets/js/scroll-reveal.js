/* ============================================================
   scroll-reveal.js — Intersection Observer scroll animations
   Shared by all credential detail pages.
   No dependencies. Pure vanilla JS.
   ============================================================ */

document.addEventListener('DOMContentLoaded', () => {

  /* ----------------------------------------------------------
     Hero load-in — staggered on arrival, same feel as homepage
  ---------------------------------------------------------- */
  const heroSequence = [
    { selector: '.institution-logo', delay: 0,   cls: 'hero-fade-up'  },
    { selector: '.cred-icon-lg',     delay: 180, cls: 'hero-fade-up'  },
    { selector: '.cred-title',       delay: 340, cls: 'hero-fade-up'  },
    { selector: '.cred-subtitle',    delay: 480, cls: 'hero-fade-up'  },
    { selector: '.hero-divider',     delay: 610, cls: 'hero-scale-x'  },
  ];

  heroSequence.forEach(({ selector, delay, cls }) => {
    const el = document.querySelector(selector);
    if (!el) return;
    setTimeout(() => el.classList.add(cls), delay);
  });

  /* ----------------------------------------------------------
     Scroll-triggered sections — fire once as each enters view
  ---------------------------------------------------------- */
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (!entry.isIntersecting) return;
      const delay = parseInt(entry.target.dataset.delay || 0);
      setTimeout(() => entry.target.classList.add('scroll-visible'), delay);
      observer.unobserve(entry.target); // animate only once
    });
  }, {
    threshold: 0.08,
    rootMargin: '0px 0px -40px 0px', // trigger slightly before fully in view
  });

  document.querySelectorAll('.scroll-hidden').forEach(el => observer.observe(el));

});
