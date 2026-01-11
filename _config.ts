import lume from "lume/mod.ts";
import tailwindcss from "lume/plugins/tailwindcss.ts";

const site = lume();

site.use(tailwindcss());

// Add the CSS file to be processed
site.add("styles.css");

export default site;
