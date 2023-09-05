const puppeteer = require('puppeteer');
const fs = require('fs');

// Import the array of file links from links.js
const fileLinks = require('./links');

async function downloadFiles(links) {
  const browser = await puppeteer.launch();
  const page = await browser.newPage();

  for (let i = 0; i < links.length; i++) {
    const link = links[i];
    await page.goto(link, { waitUntil: 'networkidle2' });

    // Get the current URL after any redirects
    const currentUrl = page.url();

    // Use the current URL to generate a unique file name
    const fileName = `file_${i}_${Date.now()}`;

    // Capture a screenshot of the current page
    await page.screenshot({ path: `./downloaded_files/${fileName}.png` });

    console.log(`Downloaded ${fileName}.png from ${currentUrl}`);
  }

  await browser.close();
}

// Create a directory to store downloaded files
if (!fs.existsSync('./downloaded_files')) {
  fs.mkdirSync('./downloaded_files');
}

// Download each file
downloadFiles(fileLinks);
