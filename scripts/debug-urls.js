const axios = require("axios");
const cheerio = require("cheerio");

async function run() {
  try {
    console.log("Fetching sitemap...");
    const { data } = await axios.get("https://listthemountain.org/sitemap.xml");
    const $ = cheerio.load(data, { xmlMode: true });

    const urls = [];
    $("loc").each((i, el) => urls.push($(el).text().trim()));

    console.log(`\nTotal URLs found: ${urls.length}`);

    console.log("\n--- SAMPLE URLs (First 50) ---");
    urls.slice(0, 50).forEach((u) => console.log(u));

    console.log("\n--- PATTERN CHECK (Looking for known articles) ---");
    const fern = urls.find((u) => u.toLowerCase().includes("fern"));
    const zigzag = urls.find((u) => u.toLowerCase().includes("zig"));
    const pinnacle = urls.find((u) => u.toLowerCase().includes("pinnacle"));

    console.log("Fern Gully URL match:", fern || "Not found");
    console.log("Zig Zag URL match:", zigzag || "Not found");
    console.log("Pinnacle URL match:", pinnacle || "Not found");
  } catch (e) {
    console.error(e);
  }
}

run();
