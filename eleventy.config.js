export default function (eleventyConfig) {
  eleventyConfig.addPassthroughCopy({ "src/css": "css" });
  eleventyConfig.addPassthroughCopy({ "src/assets": "assets" });

  eleventyConfig.addCollection("posts", (collectionApi) => {
    return collectionApi
      .getFilteredByGlob("src/posts/*.{md,njk,html}")
      .filter((p) => !p.data.draft)
      .sort((a, b) => a.date - b.date);
  });

  eleventyConfig.addFilter("readableDate", (date) => {
    return new Date(date).toLocaleDateString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric"
    });
  });

  return {
    dir: {
      input: "src",
      includes: "_includes",
      output: "_site"
    },
    pathPrefix: "/eleventy_blog/",
    markdownTemplateEngine: "njk",
    htmlTemplateEngine: "njk"
  };
}
