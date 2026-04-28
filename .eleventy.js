export default function (eleventyConfig) {
    // Pass through static assets unchanged (relative to repo root, not input dir)
    eleventyConfig.addPassthroughCopy({ media: "media" });
    eleventyConfig.addPassthroughCopy({ style: "style" });
    eleventyConfig.addPassthroughCopy({ lib: "lib" });
    eleventyConfig.addPassthroughCopy({ scripts: "scripts" });

    // Watch for changes in styles and scripts
    eleventyConfig.addWatchTarget("style/");
    eleventyConfig.addWatchTarget("scripts/");

    return {
        dir: {
            input: "src",
            output: "_site",
            includes: "_includes",
            data: "_data"
        },
        templateFormats: ["njk", "html"],
        htmlTemplateEngine: "njk",
        markdownTemplateEngine: "njk"
    };
}
