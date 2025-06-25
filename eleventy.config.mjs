import { DateTime } from "luxon";
import markdownIt from "markdown-it";
import { eleventyImageTransformPlugin } from "@11ty/eleventy-img";
import fontAwesomePlugin from "@11ty/font-awesome";
import CleanCSS from "clean-css";

export default async function (eleventyConfig) {
    // Filters
    const md = markdownIt({ html: true });
    eleventyConfig.addFilter('markdownify', content => md.render(content));
    eleventyConfig.addFilter('markdownify-inline', content => md.renderInline(content));
    eleventyConfig.addFilter("monthDate", dateObj => {
        return DateTime.fromJSDate(dateObj).toFormat("LLLL yyyy"); // e.g., 24 June 2025
    });
    eleventyConfig.addFilter("cssmin", function (code) {
        return new CleanCSS({}).minify(code).styles;
    });

    // Pass-through
    eleventyConfig.addPassthroughCopy("src/styles");
    eleventyConfig.addPassthroughCopy("src/static");
    eleventyConfig.addPassthroughCopy("src/robots.txt");

    // Plugins
    eleventyConfig.addBundle("css");

    eleventyConfig.addPlugin(eleventyImageTransformPlugin, {
        formats: ["avif", "svg", "jpeg"],
        widths: [150, 200, 500, "auto"],
        svgShortCircuit: true,
        htmlOptions: {
            imgAttributes: {
                loading: "lazy",
                decoding: "async",
            },
            pictureAttributes: {}
        },
    });
    eleventyConfig.addPlugin(fontAwesomePlugin);

    return {
        dir: {
            input: "src"
        }
    }
};

