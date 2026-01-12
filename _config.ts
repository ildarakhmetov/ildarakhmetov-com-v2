import lume from "lume/mod.ts";
import tailwindcss from "lume/plugins/tailwindcss.ts";
import markdown from "lume/plugins/markdown.ts";
import date from "lume/plugins/date.ts";

const site = lume();

site.use(tailwindcss());
site.use(markdown());
site.use(date());

// Add the CSS file to be processed
site.add("styles.css");
site.copy("assets");

export default site;
