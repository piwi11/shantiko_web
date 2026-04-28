# Web de shantiko pizzas

## Static site generator

This project uses [Eleventy (11ty)](https://www.11ty.dev/) to generate the static HTML from modular, maintainable templates.

### Project structure

```
src/
├── _data/
│   ├── pizzas.json          # All pizza data (name, image, ingredients per category)
│   ├── t.js                 # Active language selector
│   └── i18n/
│       └── es.json          # Spanish translations
├── _includes/
│   ├── layouts/
│   │   └── base.njk         # Base HTML layout (head, scripts)
│   ├── components/
│   │   ├── header.njk       # Site header + mobile nav
│   │   ├── pizza-card.njk   # Reusable flip pizza card
│   │   ├── pizza-carousel.njk  # Glide.js carousel wrapper
│   │   └── footer.njk       # Footer with contact info
│   └── sections/
│       ├── _hero.njk        # Hero video section
│       ├── _about-us.njk    # About us section
│       ├── _pizzas.njk      # Pizzas section (renders all carousels)
│       └── _shantiko.njk    # ShantiKo origin section
└── index.njk                # Main page template

media/    # Images and videos (passed through unchanged)
style/    # CSS files (passed through unchanged)
lib/      # Third-party libraries: Glide.js, fslightbox (passed through unchanged)
scripts/  # JavaScript (passed through unchanged)
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

### Adding a new pizza

Edit `src/_data/pizzas.json` and add a new entry inside the appropriate category:

```json
{
    "id": "my-pizza",
    "name": "MY PIZZA",
    "image": "media/images/pizza-my-pizza.jpg",
    "ingredients": ["Ingredient 1", "Ingredient 2"]
}
```

### Adding a new language

1. Copy `src/_data/i18n/es.json` to `src/_data/i18n/<lang>.json`
2. Translate all values in the new file
3. In `src/_data/t.js`, import and export the new translation file
4. Set `lang` in your new translation file (e.g. `"lang": "ca"`)
