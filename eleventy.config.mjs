import { DateTime } from "luxon";
import markdownIt from "markdown-it";

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

    return {
        dir: {
            input: "src"
        }
    }
};

