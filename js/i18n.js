(() => {
  const STORAGE_KEY = 'portfolio-language';
  const supportedLanguages = ['es', 'en'];
  const html = document.documentElement;

  const text = (selector, es, en) => ({ selector, type: 'text', es, en });
  const markup = (selector, es, en) => ({ selector, type: 'html', es, en });
  const attribute = (selector, name, es, en) => ({ selector, type: 'attribute', name, es, en });

  const commonRules = [
    text('a.skip-link', 'Ir al contenido', 'Skip to content'),
    attribute('.nav-toggle', 'aria-label', 'Abrir navegación', 'Open navigation'),
    attribute('nav[data-nav-menu]', 'aria-label', 'Navegación principal', 'Main navigation'),
    text('nav[data-nav-menu] a:nth-of-type(1)', 'Sobre mí', 'About'),
    text('nav[data-nav-menu] a:nth-of-type(2)', 'Stack', 'Stack'),
    text('nav[data-nav-menu] a:nth-of-type(3)', 'Proyectos', 'Projects'),
    text('nav[data-nav-menu] a:nth-of-type(4)', 'Contacto', 'Contact'),
    markup('.nav-contact', 'Hablemos <span aria-hidden="true">↗</span>', "Let's talk <span aria-hidden=\"true\">↗</span>"),
    text('footer span:nth-child(2)', 'Desarrollador junior de software', 'Junior Software Developer'),
    attribute('.language-switcher', 'aria-label', 'Seleccionar idioma', 'Select language'),
    attribute('.language-button[data-language="es"]', 'title', 'Cambiar a español', 'Switch to Spanish'),
    attribute('.language-button[data-language="en"]', 'title', 'Cambiar a inglés', 'Switch to English'),
    text('.detail-block:nth-child(1) h2', 'Problema', 'Problem'),
    text('.detail-block:nth-child(2) h2', 'Solución', 'Solution'),
    text('.detail-block:nth-child(3) h2', 'Tecnologías', 'Technologies'),
    text('.detail-block:nth-child(4) h2', 'Funcionalidades', 'Features'),
    text('.detail-aside h2', 'Detalles del proyecto', 'Project details'),
    text('.content-section[aria-labelledby$="-screenshots-title"] .section-label span:last-child', 'Capturas', 'Screenshots'),
    text('.content-section[aria-labelledby$="-screenshots-title"] .section-title', 'Vista previa del proyecto', 'Project preview'),
    text('.content-section[aria-labelledby$="-links-title"] .section-label span:last-child', 'Enlaces', 'Links'),
    text('.content-section[aria-labelledby$="-links-title"] .section-title', 'Repositorio y demo', 'Repository & demo'),
    attribute('.screenshot-placeholder:nth-child(1)', 'aria-label', 'Espacio reservado para la captura 01', 'Placeholder for screenshot 01'),
    attribute('.screenshot-placeholder:nth-child(2)', 'aria-label', 'Espacio reservado para la captura 02', 'Placeholder for screenshot 02')
  ];

  const pageRules = {
    home: [
      attribute('meta[name="description"]', 'content', 'Portafolio de Julian, desarrollador junior de software enfocado en Java, Spring Boot, JavaScript y SQL.', "Julian's portfolio — junior software developer focused on Java, Spring Boot, JavaScript, and SQL."),
      text('title', 'Julian | Desarrollador junior de software', 'Julian | Junior Software Developer'),
      text('.hero-eyebrow', 'Desarrollador junior de software', 'Junior Software Developer'),
      markup('.hero-title', 'Construyo <span class="title-outline">soluciones</span> digitales.', 'I build <span class="title-outline">digital</span> solutions.'),
      markup('.hero-actions a:first-child', 'Explorar mi trabajo <span class="button-arrow" aria-hidden="true">↗</span>', 'Explore my work <span class="button-arrow" aria-hidden="true">↗</span>'),
      text('.scroll-indicator span:nth-child(2)', 'Sobre mí', 'About me')
    ],

    about: [
      attribute('meta[name="description"]', 'content', 'Sobre Julian, desarrollador junior de software enfocado en Java, Spring Boot, JavaScript, SQL y desarrollo web.', 'About Julian, a junior software developer focused on Java, Spring Boot, JavaScript, SQL, and web development.'),
      text('title', 'Sobre mí | Julian', 'About | Julian'),
      text('.page-kicker span:last-child', 'Sobre mí', 'About me'),
      markup('.page-title', 'Sobre <span class="title-outline">mí.</span>', 'About <span class="title-outline">me.</span>'),
      text('.page-intro', 'Un desarrollador junior al inicio de su camino, interesado en construir soluciones digitales claras, funcionales y realmente útiles.', 'A junior developer at the beginning of my journey, interested in building digital solutions that are clear, functional, and genuinely useful.'),
      text('.about-intro-grid .section-label span:last-child', 'Perfil', 'Profile'),
      text('#about-intro-title', 'Código con propósito. Aprendizaje continuo.', 'Code with purpose. Continuous learning.'),
      text('.about-copy p:nth-of-type(1)', 'Soy Julian, desarrollador junior de software. Me interesan el desarrollo web y la creación de software que resuelva problemas reales de forma práctica.', "I'm Julian, a junior software developer. I'm interested in web development and creating software that solves real problems in a practical way."),
      text('.about-copy p:nth-of-type(2)', 'Mi enfoque actual está en fortalecer mis conocimientos en Java, Spring Boot, JavaScript, SQL y bases de datos. Estoy en una etapa de aprendizaje constante, orientada a entender el problema, construir soluciones y mejorar con cada proyecto.', 'My current focus is strengthening my knowledge of Java, Spring Boot, JavaScript, SQL, and databases. I am in a constant learning stage, focused on understanding the problem, building solutions, and improving with every project.'),
      text('.focus-layout .section-label span:last-child', 'Enfoque', 'Focus'),
      text('#focus-title', 'Enfoque actual', 'Current focus'),
      attribute('.focus-list', 'aria-label', 'Áreas de enfoque actual', 'Current focus areas'),
      markup('.focus-item:nth-child(1)', '<span>01</span>Java y Spring Boot', '<span>01</span>Java &amp; Spring Boot'),
      markup('.focus-item:nth-child(2)', '<span>02</span>JavaScript y desarrollo web', '<span>02</span>JavaScript &amp; web development'),
      markup('.focus-item:nth-child(3)', '<span>03</span>SQL y bases de datos', '<span>03</span>SQL &amp; databases'),
      markup('.focus-item:nth-child(4)', '<span>04</span>Resolución de problemas', '<span>04</span>Problem solving'),
      markup('.focus-item:nth-child(5)', '<span>05</span>Aprendizaje continuo', '<span>05</span>Continuous learning'),
      text('section[aria-labelledby="approach-title"] .section-label span:last-child', 'Mi enfoque', 'My approach'),
      text('#approach-title', 'Cómo trabajo', 'How I work'),
      text('.approach-card:nth-child(1) h3', 'Resolución de problemas', 'Problem solving'),
      text('.approach-card:nth-child(1) p', 'Entender el contexto, descomponer el problema y construir una solución clara.', 'Understand the context, break down the problem, and build a clear solution.'),
      text('.approach-card:nth-child(2) h3', 'Aprendizaje continuo', 'Continuous learning'),
      text('.approach-card:nth-child(2) p', 'Aprender de forma constante y aplicar ese conocimiento en la práctica.', 'Keep learning and apply that knowledge through practice.'),
      text('.approach-card:nth-child(3) h3', 'Trabajo en equipo', 'Teamwork'),
      text('.approach-card:nth-child(3) p', 'Comunicar ideas, escuchar observaciones y trabajar de forma colaborativa.', 'Communicate ideas, listen to feedback, and work collaboratively.'),
      text('.approach-card:nth-child(4) h3', 'Adaptabilidad', 'Adaptability'),
      text('.approach-card:nth-child(4) p', 'Mantener una actitud flexible frente a cambios y nuevos requerimientos.', 'Maintain a flexible attitude toward change and new requirements.'),
      text('.mission-vision-section .section-label span:last-child', 'Misión y visión', 'Mission & vision'),
      text('#mission-vision-title', 'Misión y visión', 'Mission & vision'),
      text('[data-mission-card="mission"] h3', 'Misión', 'Mission'),
      text('[data-mission-card="mission"] p', 'Desarrollar soluciones de software que aporten valor a las personas y organizaciones, utilizando la programación, el aprendizaje constante y el trabajo en equipo para transformar necesidades en soluciones tecnológicas funcionales.', 'Develop software solutions that add value to people and organizations, using programming, continuous learning, and teamwork to transform needs into functional technological solutions.'),
      text('[data-mission-card="vision"] h3', 'Visión', 'Vision'),
      text('[data-mission-card="vision"] p', 'Convertirme en un desarrollador de software capaz de participar en proyectos tecnológicos de alto impacto, seguir creciendo profesionalmente y aportar soluciones innovadoras en empresas de alcance nacional e internacional.', 'Become a software developer capable of participating in high-impact technology projects, continuing to grow professionally, and contributing innovative solutions to companies with national and international reach.')
    ],

    stack: [
      attribute('meta[name="description"]', 'content', 'Tecnologías y herramientas que Julian utiliza y continúa aprendiendo como desarrollador junior de software.', 'Technologies and tools Julian uses and continues learning as a junior software developer.'),
      text('title', 'Stack | Julian', 'Stack | Julian'),
      text('.page-kicker span:last-child', 'Stack technological', 'Tech stack'),
      markup('.page-title', 'Herramientas para <span class="title-outline">construir.</span>', 'Tools for <span class="title-outline">building.</span>'),
      text('.page-intro', 'Tecnologías y herramientas que utilizo en mi proceso de aprendizaje y construcción. Esta es mi stack actual, no una clasificación de experiencia.', 'Technologies and tools I use throughout my learning and building process. This is my current stack, not a ranking of experience.'),
      text('.stack-intro .section-label span:last-child', 'Resumen', 'Overview'),
      text('#stack-overview-title', 'Un stack para seguir creciendo.', 'A stack built for continued growth.'),
      markup('.stack-note', '<strong>Stack de aprendizaje</strong>Cada tecnología representa una herramienta de aprendizaje o un área que sigo desarrollando.', '<strong>Learning stack</strong>Each technology represents a learning tool or an area I continue to develop.'),
      text('#languages-title', 'Lenguajes', 'Languages'),
      text('#backend-title', 'Backend', 'Backend'),
      text('#databases-title', 'Bases de datos', 'Databases'),
      text('#tools-title', 'Herramientas', 'Tools'),
      text('#skills-title', 'Habilidades', 'Skills'),
      text('.technology-item-skill h3', 'Inglés', 'English'),
      text('.technology-item-skill .skill-description', 'Intermedio', 'Intermediate'),
      text('.stack-footer-note', 'Mi objetivo es profundizar estas herramientas según las necesidades de cada proyecto, sin presentar niveles que aún no estén definidos.', 'My goal is to deepen these tools according to the needs of each project, without presenting levels that have not yet been defined.')
    ],

    projects: [
      attribute('meta[name="description"]', 'content', 'Proyectos de Julian: VART, SmartCity Fix y este portafolio.', "Julian's projects: VART, SmartCity Fix, and this portfolio."),
      text('title', 'Proyectos | Julian', 'Projects | Julian'),
      text('.page-kicker span:last-child', 'Trabajo seleccionado', 'Selected work'),
      markup('.page-title', 'Proyectos <span class="title-outline">seleccionados.</span>', 'Selected <span class="title-outline">projects.</span>'),
      text('.page-intro', 'Proyectos relacionados con desarrollo web, software, automatización y aprendizaje continuo. La información pendiente está señalada para completarla con datos reales.', 'Projects related to web development, software, automation, and continuous learning. Pending information is clearly marked so it can be completed with real data.'),
      text('#project-list-title', 'Índice de proyectos', 'Project index'),
      text('.project-card[data-project-id="vart"] .project-description', 'Proyecto actualmente en desarrollo, construido con Java, Spring Boot y PostgreSQL.', 'Project currently in development, built with Java, Spring Boot, and PostgreSQL.'),
      text('.project-card[data-project-id="vart"] .project-status', 'En desarrollo', 'In development'),
      attribute('.project-card[data-project-id="vart"] .tag-list', 'aria-label', 'Tecnologías de VART', 'VART technologies'),
      markup('.project-card[data-project-id="vart"] .project-actions a:first-child', 'Ver proyecto <span class="button-arrow" aria-hidden="true">↗</span>', 'View project <span class="button-arrow" aria-hidden="true">↗</span>'),
      text('.project-card[data-project-id="smartcity-fix"] .project-number', '02 / Automatización', '02 / Automation'),
      text('.project-card[data-project-id="smartcity-fix"] .project-status', 'Por definir', 'Status to define'),
      text('.project-card[data-project-id="smartcity-fix"] .project-description', 'Proyecto relacionado con la clasificación y gestión de reportes de problemas urbanos mediante automatización.', 'Project focused on classifying and managing reports of urban problems through automation.'),
      attribute('.project-card[data-project-id="smartcity-fix"] .tag-list', 'aria-label', 'Tecnologías de SmartCity Fix', 'SmartCity Fix technologies'),
      markup('.project-card[data-project-id="smartcity-fix"] .project-actions a:first-child', 'Ver proyecto <span class="button-arrow" aria-hidden="true">↗</span>', 'View project <span class="button-arrow" aria-hidden="true">↗</span>'),
      text('.project-card[data-project-id="portfolio"] .project-status', 'Disponible', 'Available'),
      text('.project-card[data-project-id="portfolio"] h2', 'Este portafolio', 'This Portfolio'),
      text('.project-card[data-project-id="portfolio"] .project-description', 'Portafolio multipágina construido con HTML, CSS, JavaScript y Canvas para presentar mi perfil, stack y proyectos.', 'Multipage portfolio built with HTML, CSS, JavaScript, and Canvas to showcase my profile, stack, and projects.'),
      attribute('.project-card[data-project-id="portfolio"] .tag-list', 'aria-label', 'Tecnologías del portafolio', 'Portfolio technologies'),
      markup('.project-card[data-project-id="portfolio"] .project-actions a:first-child', 'Ver proyecto <span class="button-arrow" aria-hidden="true">↗</span>', 'View project <span class="button-arrow" aria-hidden="true">↗</span>')
    ],

    contact: [
      attribute('meta[name="description"]', 'content', 'Contacto de Julian, desarrollador junior de software en Colombia.', "Contact information for Julian, a junior software developer based in Colombia."),
      text('title', 'Contacto | Julian', 'Contact | Julian'),
      text('.page-kicker span:last-child', 'Contacto', 'Contact'),
      markup('.contact-title', 'Construyamos <span>algo.</span>', "Let's build <span>something.</span>"),
      text('.contact-prompt', '¿Tienes una idea, una oportunidad o un proyecto? Conversemos.', 'Have an idea, an opportunity, or a project? Let’s talk.'),
      attribute('.contact-options', 'aria-label', 'Datos de contacto', 'Contact details'),
      markup('.cv-panel p', 'Descarga mi CV.<span class="placeholder-path">Hoja de vida · PDF</span>', 'Download my CV.<span class="placeholder-path">Hoja de vida · PDF</span>'),
      markup('.cv-panel .button', 'Descargar CV <span class="button-arrow" aria-hidden="true">↓</span>', 'Download CV <span class="button-arrow" aria-hidden="true">↓</span>')
    ],

    vart: [
      attribute('meta[name="description"]', 'content', 'Detalles del proyecto VART, actualmente en desarrollo.', 'Details about the VART project, currently in development.'),
      text('title', 'VART — Proyecto 01 | Julian', 'VART — Project 01 | Julian'),
      text('.breadcrumb', '← Todos los proyectos', '← All projects'),
      text('.project-detail-hero .page-kicker > span:first-child', 'Proyecto 01', 'Project 01'),
      text('.project-status', 'En desarrollo', 'In development'),
      text('.project-detail-summary', 'Proyecto de software actualmente en desarrollo, construido con Java, Spring Boot y PostgreSQL. El alcance y las funcionalidades se completarán con información real del proyecto.', 'Software project currently in development, built with Java, Spring Boot, and PostgreSQL. The scope and features will be completed with verified project information.'),
      attribute('.content-section', 'aria-label', 'Información de VART', 'VART information'),
      text('.detail-block:nth-child(1) .placeholder-label', 'Contenido pendiente', 'Content needed'),
      text('.detail-block:nth-child(1) .placeholder-copy', '[CONTENIDO PENDIENTE — Describe el problema real que busca resolver VART.]', '[PENDING CONTENT — Describe the real problem VART aims to solve.]'),
      text('.detail-block:nth-child(2) .placeholder-label', 'Contenido pendiente', 'Content needed'),
      text('.detail-block:nth-child(2) .placeholder-copy', '[CONTENIDO PENDIENTE — Explica la solución que ofrece VART cuando esté disponible.]', '[PENDING CONTENT — Explain the solution VART provides when available.]'),
      attribute('.detail-block:nth-child(3) .tag-list', 'aria-label', 'Tecnologías de VART', 'VART technologies'),
      text('.detail-block:nth-child(4) .placeholder-label', 'Contenido pendiente', 'Content needed'),
      text('.detail-block:nth-child(4) .placeholder-copy', '[CONTENIDO PENDIENTE — Añade únicamente funcionalidades que ya estén implementadas.]', '[PENDING CONTENT — Add only features that have already been implemented.]'),
      attribute('.detail-aside', 'aria-label', 'Resumen del proyecto', 'Project overview'),
      text('.detail-facts li:nth-child(1) span', 'Proyecto', 'Project'),
      text('.detail-facts li:nth-child(2) span', 'Estado', 'Status'),
      text('.detail-facts li:nth-child(2) strong', 'En desarrollo', 'In development'),
      text('.detail-facts li:nth-child(3) span', 'Rol', 'Role'),
      text('.detail-facts li:nth-child(3) strong', '[Por definir]', '[To define]'),
      text('.screenshot-placeholder:nth-child(1)', '[Captura 01] · Agrega una imagen real del proyecto', '[Screenshot 01] · Add a real project image'),
      text('.screenshot-placeholder:nth-child(2)', '[Captura 02] · Agrega una imagen real del proyecto', '[Screenshot 02] · Add a real project image'),
      text('.project-links button:first-child', 'GitHub · URL pendiente', 'GitHub · pending URL'),
      text('.project-links button:last-child', 'Demo · URL pendiente', 'Demo · pending URL')
    ],

    smartcity: [
      attribute('meta[name="description"]', 'content', 'Detalles de SmartCity Fix, un proyecto web de clasificación y automatización de reportes urbanos.', 'Details about SmartCity Fix, a web project for classifying and automating urban reports.'),
      text('title', 'SmartCity Fix — Proyecto 02 | Julian', 'SmartCity Fix — Project 02 | Julian'),
      text('.breadcrumb', '← Todos los proyectos', '← All projects'),
      text('.project-detail-hero .page-kicker > span:first-child', 'Proyecto 02', 'Project 02'),
      text('.project-status', 'Por definir', 'Status to define'),
      text('.project-detail-summary', 'Proyecto web relacionado con la clasificación y gestión de reportes de problemas urbanos mediante automatización, n8n e IA.', 'Web project focused on classifying and managing reports of urban problems through automation, n8n, and AI.'),
      attribute('.content-section', 'aria-label', 'Información de SmartCity Fix', 'SmartCity Fix information'),
      text('.detail-block:nth-child(1) p', 'El proyecto aborda la clasificación y gestión de reportes de problemas urbanos mediante automatización.', 'The project addresses the classification and management of reports of urban problems through automation.'),
      text('.detail-block:nth-child(2) p', 'Combina un flujo web con n8n e IA para apoyar la clasificación y gestión de esos reportes.', 'It combines a web flow with n8n and AI to support the classification and management of those reports.'),
      attribute('.detail-block:nth-child(3) .tag-list', 'aria-label', 'Tecnologías de SmartCity Fix', 'SmartCity Fix technologies'),
      attribute('.detail-block:nth-child(4) .tag-list', 'aria-label', 'Funcionalidades confirmadas de SmartCity Fix', 'Confirmed SmartCity Fix features'),
      attribute('.detail-aside', 'aria-label', 'Resumen del proyecto', 'Project overview'),
      text('.detail-facts li:nth-child(1) span', 'Proyecto', 'Project'),
      text('.detail-facts li:nth-child(2) span', 'Estado', 'Status'),
      text('.detail-facts li:nth-child(2) strong', '[Por definir]', '[To define]'),
      text('.detail-facts li:nth-child(3) span', 'Rol', 'Role'),
      text('.detail-facts li:nth-child(3) strong', '[Por definir]', '[To define]'),
      text('.detail-block:nth-child(4) li:nth-child(1)', 'Clasificación de reportes urbanos', 'Urban report classification'),
      text('.detail-block:nth-child(4) li:nth-child(2)', 'Gestión de reportes mediante automatización', 'Report management through automation'),
      text('.screenshot-placeholder:nth-child(1)', '[Captura 01] · Agrega una imagen real del proyecto', '[Screenshot 01] · Add a real project image'),
      text('.screenshot-placeholder:nth-child(2)', '[Captura 02] · Agrega una imagen real del proyecto', '[Screenshot 02] · Add a real project image'),
      text('.project-links button:first-child', 'GitHub · URL pendiente', 'GitHub · pending URL'),
      text('.project-links button:last-child', 'Demo · URL pendiente', 'Demo · pending URL')
    ],

    portfolio: [
      attribute('meta[name="description"]', 'content', 'Detalles de este portafolio multipágina construido con HTML, CSS, JavaScript y Canvas.', 'Details about this multipage portfolio built with HTML, CSS, JavaScript, and Canvas.'),
      text('title', 'Este portafolio — Proyecto 03 | Julian', 'This Portfolio — Project 03 | Julian'),
      text('.breadcrumb', '← Todos los proyectos', '← All projects'),
      text('.project-detail-hero .page-kicker > span:first-child', 'Proyecto 03', 'Project 03'),
      text('.project-status', 'Disponible', 'Available'),
      text('.project-detail-summary', 'Portafolio personal multipágina construido con HTML, CSS, JavaScript y Canvas para presentar mi perfil, stack y proyectos con una identidad visual consistente.', 'Personal multipage portfolio built with HTML, CSS, JavaScript, and Canvas to showcase my profile, stack, and projects with a consistent visual identity.'),
      attribute('.content-section', 'aria-label', 'Información del portafolio', 'Portfolio information'),
      text('.detail-block:nth-child(1) p', 'El proyecto nace como un portafolio personal para organizar y presentar información profesional y proyectos en páginas independientes.', 'The project began as a personal portfolio for organizing and presenting professional information and projects across independent pages.'),
      text('.detail-block:nth-child(2) p', 'Un sitio web minimalista y responsive que mantiene una navegación, un footer y una identidad visual consistentes en todas sus páginas.', 'A minimalist, responsive website that maintains consistent navigation, a footer, and a visual identity across every page.'),
      attribute('.detail-block:nth-child(3) .tag-list', 'aria-label', 'Tecnologías del portafolio', 'Portfolio technologies'),
      attribute('.detail-block:nth-child(4) .tag-list', 'aria-label', 'Características del portafolio', 'Portfolio features'),
      text('.detail-facts li:nth-child(2) span', 'Estado', 'Status'),
      text('.detail-facts li:nth-child(2) strong', 'Disponible', 'Available'),
      text('.detail-facts li:nth-child(3) span', 'Tipo', 'Type'),
      text('.detail-facts li:nth-child(3) strong', 'Sitio web de portafolio', 'Portfolio website'),
      text('.detail-block:nth-child(4) li:nth-child(1)', 'Páginas independientes', 'Independent pages'),
      text('.detail-block:nth-child(4) li:nth-child(2)', 'Navegación responsive', 'Responsive navigation'),
      text('.detail-block:nth-child(4) li:nth-child(3)', 'Páginas de detalle de proyectos', 'Project detail pages'),
      text('.detail-block:nth-child(4) li:nth-child(4)', 'Fondo con Canvas', 'Canvas background'),
      text('.screenshot-placeholder:nth-child(1)', '[Captura 01] · Agrega una imagen real del proyecto', '[Screenshot 01] · Add a real project image'),
      text('.screenshot-placeholder:nth-child(2)', '[Captura 02] · Agrega una imagen real del proyecto', '[Screenshot 02] · Add a real project image'),
      markup('.project-links a:last-child', 'Abrir demo <span class="button-arrow" aria-hidden="true">↗</span>', 'Open demo <span class="button-arrow" aria-hidden="true">↗</span>')
    ]
  };

  const getPageKey = () => {
    const path = window.location.pathname.toLowerCase();
    if (path.includes('/projects/vart')) return 'vart';
    if (path.includes('/projects/smartcity-fix')) return 'smartcity';
    if (path.includes('/projects/portfolio')) return 'portfolio';
    if (path.includes('/about')) return 'about';
    if (path.includes('/stack')) return 'stack';
    if (path.includes('/projects')) return 'projects';
    if (path.includes('/contact')) return 'contact';
    return 'home';
  };

  const getInitialLanguage = () => {
    const requestedLanguage = new URLSearchParams(window.location.search).get('lang');
    if (supportedLanguages.includes(requestedLanguage)) return requestedLanguage;

    try {
      const storedLanguage = window.localStorage.getItem(STORAGE_KEY);
      return supportedLanguages.includes(storedLanguage) ? storedLanguage : 'es';
    } catch {
      return 'es';
    }
  };

  const saveLanguage = (language) => {
    try {
      window.localStorage.setItem(STORAGE_KEY, language);
    } catch {
      // The selector still works when storage is unavailable.
    }
  };

  const createLanguageSwitcher = () => {
    const nav = document.querySelector('[data-site-nav]');
    const contactLink = nav?.querySelector('.nav-contact');
    if (!nav || !contactLink) return;

    const existingSwitcher = nav.querySelector('.language-switcher');
    if (existingSwitcher) return;

    const actions = document.createElement('div');
    actions.className = 'nav-actions';

    const switcher = document.createElement('div');
    switcher.className = 'language-switcher';
    switcher.setAttribute('role', 'group');

    supportedLanguages.forEach((language) => {
      const button = document.createElement('button');
      button.className = 'language-button';
      button.type = 'button';
      button.dataset.language = language;
      button.lang = language;
      button.textContent = language.toUpperCase();
      button.addEventListener('click', () => setLanguage(language));
      switcher.append(button);
    });

    contactLink.before(actions);
    actions.append(switcher, contactLink);
  };

  const applyRule = (rule, language) => {
    const element = document.querySelector(rule.selector);
    if (!element) return;

    const value = rule[language];
    if (!value) return;

    if (rule.type === 'text') element.textContent = value;
    if (rule.type === 'html') element.innerHTML = value;
    if (rule.type === 'attribute') element.setAttribute(rule.name, value);
  };

  const setLanguage = (language) => {
    if (!supportedLanguages.includes(language)) return;

    html.lang = language;
    [...commonRules, ...pageRules[getPageKey()]].forEach((rule) => applyRule(rule, language));

    document.querySelectorAll('.language-button').forEach((button) => {
      button.setAttribute('aria-pressed', String(button.dataset.language === language));
    });

    saveLanguage(language);
    document.dispatchEvent(new CustomEvent('portfolio:languagechange', { detail: { language } }));
  };

  createLanguageSwitcher();
  setLanguage(getInitialLanguage());
})();
