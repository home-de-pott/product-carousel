import '@babel/polyfill';
const puppeteer = require('puppeteer');

describe('Everything', () => {
  let browser, page;
  beforeAll(async () => {
    jest.setTimeout(30000);

    // puppeteer options
    const opts = {
      headless: false,
      slowMo: 100,
      timeout: 10000,
    };

    browser = await puppeteer.launch(opts);
    page = await browser.newPage();
    await page.goto('http://localhost:3000/products/202057391');
  });

  afterAll(() => {
    page.close();
    browser.close();
  });

  it('should work', async () => {
    console.log(await browser.version());
    expect(true).toBe(true);
  });

  it('should render a carousel', async () => {
    await page.waitFor('#carousel');
    const carousel = await page.$('#carousel');
    expect(carousel).toBeTruthy();
  });

  it('should render a carousel item', async () => {
    await page.waitFor('.carousel-item');
    const item = await page.$('.carousel-item');
    expect(item).toBeTruthy();
  });
});
