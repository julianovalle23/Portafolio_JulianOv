(() => {
  const REVEAL_SELECTOR = '.reveal-left, .reveal-right, .reveal-up';
  const STAGGER_DELAY = 80;
  const MAX_STAGGER_INDEX = 4;

  const initReveal = () => {
    const targets = Array.from(document.querySelectorAll(REVEAL_SELECTOR));
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)');

    if (!targets.length || prefersReducedMotion.matches || !('IntersectionObserver' in window)) return;

    const groupPositions = new Map();

    targets.forEach((target) => {
      // Targets sharing a parent are staggered together. A future
      // [data-reveal-group] can be used to group a wider set of elements.
      const group = target.closest('[data-reveal-group]') || target.parentElement || target;
      const position = groupPositions.get(group) || 0;

      groupPositions.set(group, position + 1);
      target.style.setProperty(
        '--reveal-delay',
        `${Math.min(position, MAX_STAGGER_INDEX) * STAGGER_DELAY}ms`
      );
      target.classList.add('reveal-ready');
    });

    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting) return;

        entry.target.classList.add('is-visible');
        observer.unobserve(entry.target);
      });
    }, {
      threshold: 0.12,
      rootMargin: '0px 0px 5% 0px'
    });

    targets.forEach((target) => observer.observe(target));
  };

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initReveal, { once: true });
  } else {
    initReveal();
  }
})();
