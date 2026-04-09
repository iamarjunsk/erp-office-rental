const { chromium } = require('playwright');
const path = require('path');

(async () => {
  const browser = await chromium.launch({ headless: true });
  const context = await browser.newContext();
  const page = await context.newPage();

  console.log('Navigating to login...');
  await page.goto('http://localhost:3000/login');

  console.log('Logging in as Admin...');
  await page.click('button:has-text("Login as Admin")');
  await page.waitForURL('http://localhost:3000/admin');

  console.log('Navigating to bookings...');
  await page.goto('http://localhost:3000/admin/bookings');

  // Wait a bit for page to load fully
  await page.waitForTimeout(2000);

  // Mock API requests
  await page.route('**/api/bookings/', async (route) => {
    if (route.request().method() === 'POST') {
      console.log('Intercepted POST to /api/bookings/');
      await route.fulfill({
        status: 400,
        contentType: 'application/json',
        body: JSON.stringify({ detail: 'Simulated API Error for Bookings' })
      });
    } else {
      await route.continue();
    }
  });

  console.log('Opening Add Booking modal...');
  await page.click('button:has-text("New Booking")');
  await page.waitForSelector('h3:has-text("New Booking")', { state: 'visible', timeout: 5000 });

  console.log('Filling form...');
  await page.waitForSelector('input[type="text"]', { state: 'visible' });
  await page.fill('input[type="text"]', 'Test Booking');

  // To avoid HTML5 required validation error
  await page.evaluate(() => {
    const spaceSelect = document.querySelector('select[required]');
    if (spaceSelect && spaceSelect.options.length > 1) {
       spaceSelect.value = spaceSelect.options[1].value;
       spaceSelect.dispatchEvent(new Event('change'));
    }
  });

  const dts = await page.$$('input[type="datetime-local"]');
  if (dts.length > 0) await dts[0].fill('2025-01-01T10:00');
  if (dts.length > 1) await dts[1].fill('2025-01-01T11:00');

  console.log('Submitting form...');
  await page.click('button[type="submit"]');

  console.log('Waiting for toast...');
  let toastDetected = false;
  try {
    // Check if there is an alert instead of toast just in case
    page.on('dialog', dialog => {
      console.log('Received dialog:', dialog.message());
      dialog.dismiss();
    });

    // Wait for text anywhere on screen
    await page.waitForSelector('text=Simulated API Error for Bookings', { state: 'visible', timeout: 5000 });
    console.log('Toast detected!');
    toastDetected = true;

    await page.waitForTimeout(500); // wait for animation

    const screenshotPath = path.join(process.cwd(), 'verification/toast_screenshot.png');
    await page.screenshot({ path: screenshotPath });
    console.log('Screenshot saved to', screenshotPath);
  } catch (error) {
    console.error('Failed to detect toast:', error);
    await page.screenshot({ path: path.join(process.cwd(), 'verification/toast_failure.png') });
  }

  await browser.close();

  if (!toastDetected) {
    process.exit(1);
  }
})();