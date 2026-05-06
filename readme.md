# Web de shantiko pizzas

## Static site generator

This project uses [Eleventy (11ty)](https://www.11ty.dev/) to generate the static HTML from modular, maintainable templates with full multilanguage support.

### Project structure

```
src/
├── _data/
│   ├── pizzas.json          # All pizza data with multilingual labels and ingredients
│   ├── t.js                 # Default language fallback (Spanish)
│   ├── allTranslations.js   # Language registry — drives per-language page generation
│   └── i18n/
│       ├── es.json          # Spanish translations
│       ├── ca.json          # Catalan translations
│       └── en.json          # English translations
├── _includes/
│   ├── layouts/
│   │   └── base.njk         # Base HTML layout (head, scripts)
│   ├── components/
│   │   ├── header.njk       # Site header + mobile nav + language switcher
│   │   ├── pizza-card.njk   # Reusable flip pizza card
│   │   ├── pizza-carousel.njk  # Glide.js carousel wrapper
│   │   └── footer.njk       # Footer with contact info
│   └── sections/
│       ├── _hero.njk        # Hero video section
│       ├── _about-us.njk    # About us section
│       ├── _pizzas.njk      # Pizzas section (renders all carousels)
│       └── _shantiko.njk    # ShantiKo origin section
├── index.njk                # Main page template (paginates over languages)
└── redirect.njk             # Root index.html → redirects to /es/

media/    # Images and videos (passed through unchanged)
style/    # CSS files (passed through unchanged)
lib/      # Third-party libraries: Glide.js, fslightbox (passed through unchanged)
scripts/  # JavaScript (passed through unchanged)
```

### Generated output

```
_site/
├── index.html        # Meta-refresh redirect → /es/
├── es/index.html     # Spanish version
├── ca/index.html     # Catalan version
├── en/index.html     # English version
├── media/            # Copied assets
├── style/            # Copied styles
├── lib/              # Copied libraries
└── scripts/          # Copied scripts
```

### Getting started

Install dependencies:

```bash
npm install
```

Build the site (output goes to `_site/`):

```bash
npm run build
```

Start the dev server with live reload:

```bash
npm start
```

> **Note:** The dev server must be used (not opening files directly from disk) because asset paths use root-relative URLs (e.g. `/style/reset.css`).

### Multilanguage architecture

Eleventy **pagination** in `src/index.njk` iterates over `allTranslations` and generates one page per language at `/{lang}/index.html`. The `t` pagination alias provides the correct translation object to every template and component for that page.

A language switcher in the header links between `/es/`, `/ca/`, and `/en/` and highlights the current language.

### Adding a new pizza

Edit `src/_data/pizzas.json` and add a new entry inside the appropriate category. Provide ingredient lists for all three languages:

```json
{
    "id": "my-pizza",
    "name": "MY PIZZA",
    "image": "media/images/pizza-my-pizza.jpg",
    "ingredients": {
        "es": ["Ingrediente 1", "Ingrediente 2"],
        "ca": ["Ingredient 1", "Ingredient 2"],
        "en": ["Ingredient 1", "Ingredient 2"]
    }
}
```

### Adding a new language

1. Copy `src/_data/i18n/es.json` to `src/_data/i18n/<lang>.json` and translate all values
2. Set `"lang": "<lang>"` in the new file
3. In `src/_data/allTranslations.js`, import and add the new translation to the exported object
4. A new page at `/<lang>/index.html` will be generated automatically on next build
5. Add a link to the new language in `src/_includes/components/header.njk`
