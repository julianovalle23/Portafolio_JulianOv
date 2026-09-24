(() => {
  const nav = document.querySelector('[data-site-nav]');
  const toggle = nav?.querySelector('[data-nav-toggle]');
  const menu = nav?.querySelector('[data-nav-menu]');

  if (!nav || !toggle || !menu) return;

  const desktopQuery = window.matchMedia('(min-width: 901px)');

  const setMenuState = (isOpen) => {
    const isEnglish = document.documentElement.lang === 'en';
    nav.classList.toggle('is-open', isOpen);
    toggle.setAttribute('aria-expanded', String(isOpen));
    toggle.setAttribute(
      'aria-label',
      isOpen
        ? (isEnglish ? 'Close navigation' : 'Cerrar navegación')
        : (isEnglish ? 'Open navigation' : 'Abrir navegación')
    );
  };

  const closeMenu = () => setMenuState(false);

  toggle.addEventListener('click', () => {
    const isOpen = toggle.getAttribute('aria-expanded') === 'true';
    setMenuState(!isOpen);
  });

  menu.querySelectorAll('a').forEach((link) => {
    link.addEventListener('click', closeMenu);
  });

  document.addEventListener('keydown', (event) => {
    if (event.key === 'Escape') {
      closeMenu();
      toggle.focus();
    }
  });

  document.addEventListener('click', (event) => {
    if (!nav.contains(event.target)) closeMenu();
  });

  desktopQuery.addEventListener('change', (event) => {
    if (event.matches) closeMenu();
  });

  document.addEventListener('portfolio:languagechange', () => {
    setMenuState(toggle.getAttribute('aria-expanded') === 'true');
  });
})();
