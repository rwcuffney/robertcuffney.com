/* ============================================================
   scroll-reveal.js — hero load-in stagger for credential pages
   Scroll animations are handled entirely by CSS scroll-driven
   animations (animation-timeline: view()) — no JS needed there.
   ============================================================ */

document.addEventListener('DOMContentLoaded', () => {

  /* ----------------------------------------------------------
     Hero load-in — staggered on page arrival
  ---------------------------------------------------------- */
  const heroSequence = [
    { selector: '.cred-icon-lg',  delay: 100, cls: 'hero-fade-up' },
    { selector: '.cred-title',    delay: 260, cls: 'hero-fade-up' },
    { selector: '.cred-subtitle', delay: 400, cls: 'hero-fade-up' },
    { selector: '.hero-divider',  delay: 530, cls: 'hero-scale-x' },
  ];

  heroSequence.forEach(({ selector, delay, cls }) => {
    const el = document.querySelector(selector);
    if (!el) return;
    setTimeout(() => el.classList.add(cls), delay);
  });

});
