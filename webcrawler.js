const puppeteer = require('puppeteer-core');

async function run() {
    let browser = await puppeteer.launch({ headless: false });
    let page = await browser.newPage();
    await page.setViewport({ width: 1920, height: 1080 });
    await page.setRequestInterception(true);
    
    page.on('request', (req) => {
        if(req.resourceType() == 'stylesheet' || req.resourceType() == 'font' || req.resourceType() == 'image'){
            req.abort();
        }
        else {
            req.continue();
        }
    });
    // await page.goto('https://www.ebay.com/');
    // await page.click('xpath///*[@id="s0-1-0-39-1-3-4-0[1]-2-@match-media-0-@ebay-carousel-list"]/li[1]/div/a/div/div[1]/div');
    await page.goto('./web.html');
}
run();