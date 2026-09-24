(() => {
  const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  if (prefersReducedMotion || !('IntersectionObserver' in window)) return;

  const targets = Array.from(document.querySelectorAll(
    '.page-hero > *, .content-section > *, .project-card, .stack-group, .approach-card, .contact-main > *'
  ));

  targets.forEach((target, index) => {
    target.classList.add('reveal-ready');
    target.style.transitionDelay = `${(index % 3) * 60}ms`;
  });

  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (!entry.isIntersecting) return;

      entry.target.classList.add('is-visible');
      observer.unobserve(entry.target);
    });
  }, {
    threshold: 0.1,
    rootMargin: '0px 0px -8% 0px'
  });

  targets.forEach((target) => observer.observe(target));
})();
