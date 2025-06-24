import { DateTime } from "luxon";
import markdownIt from "markdown-it";
import { eleventyImageTransformPlugin } from "@11ty/eleventy-img";
import fontAwesomePlugin from "@11ty/font-awesome";

export default async function (eleventyConfig) {
    // Filters
    const md = markdownIt({ html: true });
    eleventyConfig.addFilter('markdownify', content => md.render(content));
    eleventyConfig.addFilter("monthDate", dateObj => {
        return DateTime.fromJSDate(dateObj).toFormat("LLLL yyyy"); // e.g., 24 June 2025
    });

    // Pass-through
    eleventyConfig.addPassthroughCopy("src/styles");
    eleventyConfig.addPassthroughCopy("src/static");

    // Plugins
    eleventyConfig.addBundle("css");
    eleventyConfig.addPlugin(eleventyImageTransformPlugin, {
        formats: ["avif", "webp", "svg", "jpeg"],
        widths: [150, 500, "auto"],
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

