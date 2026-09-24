(() => {
  /*
   * Project data contract:
   * - data-project-id: stable identifier
   * - data-project-primary-icon / data-project-primary-label: primary technology image
   * - data-project-cover / data-project-images: optional image sources
   * - data-project-image-count: number of placeholder frames
   * - data-project-description[-es|-en]: optional description override
   * - data-project-github / data-project-demo: optional external links
   */
  const CARD_SELECTOR = '[data-project-card]';
  const INTERACTIVE_SELECTOR = 'a, button, input, textarea, select, [contenteditable="true"]';

  const COPY = {
    es: {
      information: 'Información del proyecto',
      technologies: 'Tecnologías',
      preview: 'Imágenes del proyecto',
      close: 'Cerrar',
      open: 'Abrir detalles de',
      closeCard: 'Cerrar detalles de',
      backLabel: 'Vista posterior',
      closeHint: 'Click para cerrar',
      screenshot: 'Captura'
    },
    en: {
      information: 'Project information',
      technologies: 'Technologies',
      preview: 'Project images',
      close: 'Close',
      open: 'Open details for',
      closeCard: 'Close details for',
      backLabel: 'Back view',
      closeHint: 'Click to close',
      screenshot: 'Screenshot'
    }
  };

  const getLanguage = () => (document.documentElement.lang === 'en' ? 'en' : 'es');
  const getCopy = () => COPY[getLanguage()];

  const createElement = (tagName, className = '', text = '') => {
    const element = document.createElement(tagName);

    if (className) element.className = className;
    if (text) element.textContent = text;

    return element;
  };

  const setInert = (element, isInert) => {
    if ('inert' in element) {
      element.inert = isInert;
      return;
    }

    if (isInert) element.setAttribute('inert', '');
    else element.removeAttribute('inert');
  };

  const getLocalizedData = (card, key) => {
    const suffix = getLanguage() === 'en' ? 'En' : 'Es';
    return card.dataset[`${key}${suffix}`] || card.dataset[key] || '';
  };

  const parseImageSources = (value) => {
    if (!value) return [];

    try {
      const parsed = JSON.parse(value);
      if (Array.isArray(parsed)) {
        return parsed.filter((source) => typeof source === 'string' && source.trim());
      }
    } catch {
      // A comma-separated value is also accepted for simple project data.
    }

    return value
      .split(',')
      .map((source) => source.trim())
      .filter(Boolean);
  };

  const parseImageLabels = (value) => (value || '')
    .split('|')
    .map((label) => label.trim())
    .filter(Boolean);

  const getIconSource = (icon) => {
    if (!icon || icon.includes('/') || icon.startsWith('data:')) return icon;
    const filename = icon.endsWith('.svg') ? icon : `${icon}.svg`;
    return `../assets/icons/technologies/${filename}`;
  };

  const createPrimaryIcon = (model, extraClass = '') => {
    if (!model.primaryIcon) return null;

    const icon = createElement('span', `project-primary-icon ${extraClass}`.trim());
    const image = document.createElement('img');

    icon.dataset.projectPrimaryIcon = '';
    icon.title = model.primaryLabel || model.primaryIcon;
    image.src = getIconSource(model.primaryIcon);
    image.alt = model.primaryLabel || model.primaryIcon;
    image.decoding = 'async';
    image.addEventListener('error', () => icon.remove(), { once: true });
    icon.append(image);

    return icon;
  };

  const getProjectModel = (card) => {
    const frontName = card.querySelector('.project-content h2')?.textContent.trim() || '';
    const frontDescription = card.querySelector('.project-description')?.textContent.trim() || '';
    const technologies = Array.from(card.querySelectorAll('.tag-list .tag'))
      .map((technology) => technology.textContent.trim())
      .filter(Boolean);
    const primaryIcon = card.dataset.projectPrimaryIcon?.trim() || '';
    const primaryLabel = card.dataset.projectPrimaryLabel?.trim() || primaryIcon;

    const sources = parseImageSources(card.dataset.projectImages);
    const cover = card.dataset.projectCover?.trim();
    if (cover) sources.unshift(cover);

    const labels = parseImageLabels(card.dataset.projectImageLabels);
    const configuredCount = Number.parseInt(card.dataset.projectImageCount || '0', 10);
    const imageCount = Math.max(
      sources.length,
      labels.length,
      Number.isFinite(configuredCount) ? configuredCount : 0
    );

    return {
      name: frontName || card.dataset.projectName || 'Project',
      description: getLocalizedData(card, 'projectDescription') || frontDescription,
      technologies,
      primaryIcon,
      primaryLabel,
      sources,
      labels,
      imageCount
    };
  };

  const createPlaceholder = (label) => {
    const placeholder = createElement('div', 'project-media-placeholder', label);
    placeholder.setAttribute('role', 'img');
    placeholder.setAttribute('aria-label', label);
    return placeholder;
  };

  const createMedia = (model, index) => {
    const copy = getCopy();
    const source = model.sources[index];
    const label = model.labels[index] || `${copy.screenshot} ${String(index + 1).padStart(2, '0')}`;
    const figure = createElement('figure', 'project-media');
    const frame = createElement('div', 'project-media-frame');

    if (source) {
      const image = document.createElement('img');
      image.src = source;
      image.alt = label;
      image.loading = 'lazy';
      image.decoding = 'async';
      image.addEventListener('error', () => {
        frame.replaceChildren(createPlaceholder(label));
      }, { once: true });
      frame.append(image);

      const caption = createElement('figcaption', '', label);
      figure.append(frame, caption);
    } else {
      frame.append(createPlaceholder(label));
      figure.append(frame);
    }

    return figure;
  };

  const createExternalLink = (href, label, className) => {
    const link = createElement('a', `button ${className}`);
    link.href = href;
    link.append(document.createTextNode(`${label} `));
    link.append(createElement('span', 'button-arrow', '↗'));
    link.querySelector('.button-arrow').setAttribute('aria-hidden', 'true');
    return link;
  };

  const getOrCreateTrigger = (card) => {
    const existingTrigger = card.querySelector('.project-card-trigger');
    if (existingTrigger) {
      card.prepend(existingTrigger);
      return existingTrigger;
    }

    const trigger = createElement('button', 'project-card-trigger');
    trigger.type = 'button';
    trigger.setAttribute('aria-expanded', 'false');
    trigger.setAttribute('aria-label', 'Open project details');
    card.prepend(trigger);
    return trigger;
  };

  const createPanel = (card, projectId) => {
    const titleId = `${projectId}-details-title`;
    const panel = createElement('section', 'project-details');

    panel.id = `project-details-${projectId}`;
    panel.dataset.projectDetails = '';
    panel.setAttribute('role', 'region');
    panel.setAttribute('aria-labelledby', titleId);
    panel.setAttribute('aria-hidden', 'true');
    setInert(panel, true);

    panel.innerHTML = `
      <div class="project-details-inner">
        <div class="project-details-content">
          <header class="project-details-header">
            <div class="project-details-title-row">
              <span class="project-primary-icon-slot" data-project-panel-primary></span>
              <div>
                <p class="project-details-kicker" data-project-copy="information"></p>
                <h3 class="project-details-title" id="${titleId}" data-project-details-title></h3>
              </div>
            </div>
            <button class="project-details-close" type="button" data-project-details-close>
              <span data-project-copy="close"></span>
              <span aria-hidden="true">×</span>
            </button>
          </header>

          <div class="project-details-body">
            <section class="project-detail-section" data-project-technologies-section>
              <h4 class="project-detail-section-title" data-project-copy="technologies"></h4>
              <ul class="project-technology-list" data-project-technologies></ul>
            </section>

            <section class="project-detail-section" data-project-gallery-section>
              <h4 class="project-detail-section-title" data-project-copy="preview"></h4>
              <div class="project-gallery" data-project-gallery></div>
            </section>

            <p class="project-details-description" data-project-description></p>
            <div class="project-details-links" data-project-links></div>
          </div>
        </div>
      </div>
    `;

    const entry = card.closest('[data-project-entry]');
    if (entry) entry.append(panel);
    else card.insertAdjacentElement('afterend', panel);

    return panel;
  };

  const renderPrimaryIcon = (state) => {
    const meta = state.card.querySelector('.project-card-meta');
    const currentIcon = meta?.querySelector('[data-project-primary-icon]');
    const nextIcon = createPrimaryIcon(state.model);

    if (!nextIcon) {
      currentIcon?.remove();
      return;
    }

    if (currentIcon) currentIcon.replaceWith(nextIcon);
    else meta?.prepend(nextIcon);
  };

  const renderBack = (state) => {
    const copy = getCopy();
    const backContent = state.backContent;
    const tags = createElement('ul', 'project-card-back-tags');

    tags.setAttribute('aria-label', `${copy.technologies}: ${state.model.name}`);
    state.model.technologies.forEach((technology) => {
      tags.append(createElement('li', 'tag', technology));
    });

    const backHeading = createElement('div', 'project-card-back-heading');
    const primaryIcon = createPrimaryIcon(state.model, 'project-primary-icon-back');
    const backLabel = createElement('p', 'project-card-back-label', copy.backLabel);

    if (primaryIcon) backHeading.append(primaryIcon);
    backHeading.append(backLabel);

    backContent.replaceChildren(
      backHeading,
      createElement('h3', '', state.model.name),
      createElement('p', 'project-card-back-copy', state.model.description),
      tags,
      createElement('p', 'project-card-back-hint', copy.closeHint)
    );
  };

  const renderLinks = (state) => {
    const links = state.panel.querySelector('[data-project-links]');
    const actions = state.card.querySelector('.project-actions');

    links.replaceChildren();

    actions?.childNodes.forEach((node) => {
      if (node.nodeType === Node.ELEMENT_NODE) links.append(node.cloneNode(true));
    });

    if (state.card.dataset.projectGithub) {
      links.append(createExternalLink(state.card.dataset.projectGithub, 'GitHub', 'button-secondary'));
    }

    if (state.card.dataset.projectDemo) {
      links.append(createExternalLink(state.card.dataset.projectDemo, 'Demo', 'button-primary'));
    }
  };

  const renderPanel = (state) => {
    const copy = getCopy();
    const technologiesSection = state.panel.querySelector('[data-project-technologies-section]');
    const technologies = state.panel.querySelector('[data-project-technologies]');
    const panelPrimary = state.panel.querySelector('[data-project-panel-primary]');
    const gallerySection = state.panel.querySelector('[data-project-gallery-section]');
    const gallery = state.panel.querySelector('[data-project-gallery]');

    state.panel.querySelector('[data-project-details-title]').textContent = state.model.name;
    state.panel.querySelector('[data-project-description]').textContent = state.model.description;
    panelPrimary.replaceChildren();

    const panelIcon = createPrimaryIcon(state.model, 'project-primary-icon-panel');
    if (panelIcon) panelPrimary.append(panelIcon);

    state.panel.querySelectorAll('[data-project-copy]').forEach((element) => {
      element.textContent = copy[element.dataset.projectCopy] || '';
    });

    technologies.replaceChildren();
    state.model.technologies.forEach((technology) => {
      technologies.append(createElement('li', 'tag', technology));
    });
    technologiesSection.hidden = state.model.technologies.length === 0;

    gallery.replaceChildren();
    for (let index = 0; index < state.model.imageCount; index += 1) {
      gallery.append(createMedia(state.model, index));
    }
    gallerySection.hidden = state.model.imageCount === 0;

    renderLinks(state);
  };

  const updateTriggerLabel = (state) => {
    const copy = getCopy();
    const action = state.open ? copy.closeCard : copy.open;
    state.trigger.setAttribute('aria-label', `${action} ${state.model.name}`);
  };

  const renderState = (state) => {
    state.model = getProjectModel(state.card);
    renderPrimaryIcon(state);
    renderBack(state);
    renderPanel(state);
    updateTriggerLabel(state);
  };

  const setCardState = (state, isOpen) => {
    state.open = isOpen;
    state.card.classList.toggle('is-flipped', isOpen);
    state.trigger.setAttribute('aria-expanded', String(isOpen));
    state.front.setAttribute('aria-hidden', String(isOpen));
    state.back.setAttribute('aria-hidden', String(!isOpen));
    setInert(state.front, isOpen);
    setInert(state.back, !isOpen);

    state.panel.classList.toggle('is-open', isOpen);
    state.panel.setAttribute('aria-hidden', String(!isOpen));
    setInert(state.panel, !isOpen);
    updateTriggerLabel(state);
  };

  const initProjects = () => {
    const cards = Array.from(document.querySelectorAll(CARD_SELECTOR));
    if (!cards.length) return;

    const usedIds = new Set();
    let activeState = null;

    const closeState = (state, restoreFocus) => {
      if (!state.open) return;

      setCardState(state, false);
      if (activeState === state) activeState = null;

      if (restoreFocus) {
        requestAnimationFrame(() => {
          if (!activeState || activeState === state) {
            state.trigger.focus({ preventScroll: true });
          }
        });
      }
    };

    const toggleState = (state) => {
      if (state.open) {
        closeState(state, true);
        return;
      }

      if (activeState && activeState !== state) closeState(activeState, false);
      activeState = state;
      setCardState(state, true);
    };

    const states = cards.map((card, index) => {
      const baseId = (card.dataset.projectId?.trim() || `project-${index + 1}`)
        .replace(/[^a-zA-Z0-9_-]/g, '-');
      let projectId = baseId;
      let suffix = 2;

      while (usedIds.has(projectId)) {
        projectId = `${baseId}-${suffix}`;
        suffix += 1;
      }
      usedIds.add(projectId);

      const panel = createPanel(card, projectId);
      const state = {
        card,
        panel,
        front: card.querySelector('.project-card-front'),
        back: card.querySelector('[data-project-back]'),
        backContent: card.querySelector('[data-project-back-content]'),
        trigger: getOrCreateTrigger(card),
        model: null,
        open: false
      };

      state.trigger.setAttribute('aria-controls', panel.id);
      renderState(state);
      setCardState(state, false);

      card.addEventListener('click', (event) => {
        const target = event.target instanceof Element ? event.target : null;
        if (target?.closest(INTERACTIVE_SELECTOR)) return;
        toggleState(state);
      });

      state.trigger.addEventListener('click', () => {
        toggleState(state);
      });

      panel.querySelector('[data-project-details-close]').addEventListener('click', (event) => {
        event.preventDefault();
        closeState(state, true);
      });

      return state;
    });

    document.addEventListener('keydown', (event) => {
      if (event.key !== 'Escape' || !activeState) return;
      event.preventDefault();
      closeState(activeState, true);
    });

    document.addEventListener('portfolio:languagechange', () => {
      states.forEach(renderState);
    });
  };

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initProjects, { once: true });
  } else {
    initProjects();
  }
})();
