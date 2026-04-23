import puppeteer from 'puppeteer';

(async () => {
  const browser = await puppeteer.launch({ 
    headless: "new",
    args: ['--no-sandbox'] 
  });
  const page = await browser.newPage();
  
  page.on('console', msg => console.log('BROWSER_CONSOLE:', msg.type(), msg.text()));
  page.on('pageerror', err => console.log('BROWSER_ERROR:', err.toString()));
  page.on('requestfailed', req => console.log('REQUEST_FAILED:', req.url()));

  try {
    await page.goto('http://localhost:5173', { waitUntil: 'networkidle0', timeout: 5000 });
  } catch(e) {
    console.log('Navigation timeout or error:', e);
  }
  
  await new Promise(r => setTimeout(r, 2000));
  await browser.close();
})();
