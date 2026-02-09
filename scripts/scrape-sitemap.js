const axios = require('axios');
const cheerio = require('cheerio');
const fs = require('fs');
const path = require('path');

// MAPPING: Live URL Segment -> Our Project Folder
const CATEGORY_MAP = {
  'natural-features': 'natural-features-head',
  'destinations': 'tourist-destinations', // Live site uses 'destinations'
  'indigenous': 'indigenous-head',
  'work-places': 'work-sites',
  'science': 'science-head', // Live site uses 'science'
  'adventures': 'adventure-point',
  'tracks': 'walking-tracks', // Live site uses 'tracks'
  'mountain-huts': 'mountain-huts-head',
  'shelters': 'shelters-head',
  'political-flashpoints': 'political-flashpoints-head',
  'ceremonial-grounds': 'ceremonial-grounds-head',
  'water-features': 'pure-springs-head', // Guessing based on content
  'artistic': 'landscapes', // Guessing based on content
  'living-wonders': 'living-wonders-head',
  'mind-fields': 'mind-fields-head',
  'geoheritage': 'new-page' // Mapped to New Page
};

async function run() {
  console.log('Fetching sitemap...');
  try {
    const { data: xml } = await axios.get('https://listthemountain.org/sitemap.xml');
    const $ = cheerio.load(xml, { xmlMode: true });

    const urls = [];
    $('loc').each((i, el) => urls.push($(el).text()));
    console.log(`Found ${urls.length} URLs in sitemap.`);

    let successCount = 0;

    for (const url of urls) {
      // Find which category this URL belongs to
      let projectFolder = null;

      // Check against our map
      for (const [urlSegment, folderName] of Object.entries(CATEGORY_MAP)) {
        if (url.includes(`/${urlSegment}/`) && !url.endsWith(`/${urlSegment}`)) {
          projectFolder = folderName;
          break;
        }
      }

      if (projectFolder) {
        const slug = url.split('/').pop();
        const savePath = path.join(__dirname, '..', 'scraped-content', projectFolder, `${slug}.json`);

        try {
          const { data: html } = await axios.get(url);
          const $page = cheerio.load(html);

          const title = $page('h1').first().text().trim();
          const paragraphs = [];
          $page('.sqs-block-html p').each((i, el) => {
            const text = $page(el).text().trim();
            if (text) paragraphs.push(text);
          });

          const images = [];
          $page('img').each((i, el) => {
            const src = $page(el).attr('data-src') || $page(el).attr('src');
            if (src) images.push({ src });
          });

          if (title && paragraphs.length > 0) {
            const data = { url, title, paragraphs, images };
            const dir = path.dirname(savePath);
            if (!fs.existsSync(dir)) fs.mkdirSync(dir, { recursive: true });
            fs.writeFileSync(savePath, JSON.stringify(data, null, 2));
            process.stdout.write('.'); // Progress dot
            successCount++;
          }
        } catch (e) {
          // Silent fail for individual pages
        }
      }
    }
    console.log(`\n\nSuccess! Scraped ${successCount} real articles with text.`);

  } catch (e) {
    console.error("Critical Sitemap Error:", e.message);
  }
}

run();
