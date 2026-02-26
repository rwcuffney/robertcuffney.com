/* ============================================================
   animations.js — staggered load-in sequence (Apple-style)
   No dependencies. Pure vanilla JS + CSS class toggling.
   ============================================================ */

document.addEventListener('DOMContentLoaded', () => {

  /* ----------------------------------------------------------
     Animation sequence — { selector, delay (ms), css class }
     Elements must have class="will-animate" in HTML to start
     hidden, and the animation class triggers the keyframe.
  ---------------------------------------------------------- */
  const sequence = [
    { selector: '.header-name',           delay: 100,  cls: 'anim-fade-up' },
    { selector: '.header-title',          delay: 250,  cls: 'anim-fade-up' },
    { selector: '.header-divider',        delay: 400,  cls: 'anim-scale-x' },
    { selector: '#g-circles',             delay: 600,  cls: 'anim-fade-in' },
    { selector: '#g-glow',                delay: 950,  cls: 'anim-fade-in' },
    { selector: '#g-label-ai',            delay: 1050, cls: 'anim-fade-in' },
    { selector: '#g-label-legal',         delay: 1180, cls: 'anim-fade-in' },
    { selector: '#g-label-tech',          delay: 1310, cls: 'anim-fade-in' },
    { selector: '#g-label-center',        delay: 1440, cls: 'anim-fade-in' },
    { selector: '#g-label-intersections', delay: 1570, cls: 'anim-fade-in' },
  ];

  sequence.forEach(({ selector, delay, cls }) => {
    const el = document.querySelector(selector);
    if (!el) return;
    setTimeout(() => el.classList.add(cls), delay);
  });

  /* ----------------------------------------------------------
     Credential items — stagger each card individually
  ---------------------------------------------------------- */
  document.querySelectorAll('.cred-item').forEach((el, i) => {
    setTimeout(() => el.classList.add('anim-fade-up'), 1700 + i * 130);
  });

});
