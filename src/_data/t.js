// Default language fallback (Spanish).
// With multi-language builds, Eleventy pagination in src/index.njk overrides
// this value per page via allTranslations.js. This file is kept as a
// safety fallback for any template rendered outside the paginated context.
import es from "./i18n/es.json" with { type: "json" };

export default es;
