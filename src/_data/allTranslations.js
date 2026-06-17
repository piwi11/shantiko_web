// Language registry for Eleventy pagination.
// Each value is a translation object. Eleventy iterates over these
// to generate one page per language at /{lang}/index.html.
// To add a new language: create src/_data/i18n/<lang>.json,
// import it here, and add it to the exported object.
import es from "./i18n/es.json" with { type: "json" };
import ca from "./i18n/ca.json" with { type: "json" };
import en from "./i18n/en.json" with { type: "json" };
import de from "./i18n/de.json" with { type: "json" };
import nl from "./i18n/nl.json" with { type: "json" };

export default { es, ca, en, de, nl };
