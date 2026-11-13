# Portafolio · Julian Ovalle

Portafolio personal de Julian Ovalle, desarrollador junior de software (Java, Spring Boot, PostgreSQL, n8n y RAG).

**Sitio:** https://julianovalle23.github.io/Portafolio_JulianOv/

## Proyectos incluidos

| # | Proyecto | Qué es | Tecnologías |
|---|---|---|---|
| 01 | [NEXUS Support](https://github.com/julianovalle23/NEXUSS) | Mesa de ayuda con asistente de IA basado en RAG | Java 21, Spring Boot, PostgreSQL, n8n, Qdrant, OpenRouter, Docker |
| 02 | [CampusDesk](https://github.com/julianovalle23/CampusDesk) | Mesa de ayuda con ciclo de vida de tickets y roles (equipo de 4) | Java 17, Spring Boot, Spring Security, JWT, PostgreSQL |
| 03 | [TechStore](https://github.com/julianovalle23/techstore) | Tienda de computadores con catálogo público y pedidos con control de stock | Java 21, Spring Boot 4, Gradle, JWT, PostgreSQL |
| 04 | [Chatbot de ventas en Telegram](https://github.com/julianovalle23/streamcrack_N8N) | Agente conversacional de ventas (equipo de 3) | n8n, Telegram, OpenRouter |
| 05 | Este portafolio | Sitio multipágina y bilingüe | HTML, CSS, JavaScript, Canvas |

## Estructura

```
index.html                 Inicio
pages/                     Sobre mí, Stack, Proyectos y Contacto
pages/projects/            Una página de detalle por proyecto
css/                       styles.css (base) + una hoja por página
js/i18n.js                 Cambio de idioma ES/EN
js/projects.js             Tarjetas de proyecto con vista posterior y panel de detalles
js/nav.js, js/reveal.js    Menú responsive y animaciones de entrada
script.js                  Fondo animado con Canvas
assets/                    Íconos, capturas de proyectos y hoja de vida
```

## Idiomas

El sitio está en español y se puede cambiar a inglés desde el selector ES/EN (se recuerda en `localStorage`, o con `?lang=en`).
Hay dos formas de traducir un texto:

- **En la página (recomendado para contenido nuevo):** el HTML lleva el texto en español y la versión en inglés en
  `data-en`. Para textos con etiquetas se añade `data-i18n-html`; para `aria-label` y `alt` se usan `data-en-label` y `data-en-alt`.

  ```html
  <p data-en="Completed">Completado</p>
  ```

- **Reglas por selector** en `js/i18n.js` (`commonRules` y `pageRules`), que usan las páginas originales.

## Agregar un proyecto

1. Copia una página de `pages/projects/` (por ejemplo `techstore.html`) y cambia el contenido y sus `data-en`.
2. Agrega su tarjeta en `pages/projects.html` (`data-project-images` acepta una lista JSON de capturas).
3. Guarda las capturas en `assets/images/projects/<id-del-proyecto>/`.

## Ejecutar en local

No necesita compilación. Cualquier servidor estático sirve:

```bash
python -m http.server 5500
```

y abre http://localhost:5500.
