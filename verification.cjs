const { chromium } = require('playwright');
const path = require('path');

(async () => {
  const browser = await chromium.launch({ headless: true });
  const page = await browser.newPage();

  // Mock the API response to simulate an error during company creation
  await page.route('**/api/companies', async (route) => {
    if (route.request().method() === 'POST') {
      await route.fulfill({
        status: 400,
        contentType: 'application/json',
        body: JSON.stringify({ name: ['Company with this Name already exists.'] })
      });
    } else {
      await route.continue();
    }
  });

  // Mock login and auth
  await page.route('**/api/auth/me', async (route) => {
    await route.fulfill({
      status: 200,
      contentType: 'application/json',
      body: JSON.stringify({ id: 1, email: 'admin@example.com', role: 'admin' })
    });
  });

  // Navigate to the company creation page
  await page.goto('http://localhost:3000/admin/companies/create');

  // Wait for the page to load
  await page.waitForSelector('h1:has-text("Add Company")');

  // Fill out the form
  await page.fill('input[type="text"]', 'Duplicate Company Name');
  await page.fill('input[type="email"]', 'test@test.com');
  await page.fill('input[type="tel"]', '1234567890');

  // Submit the form
  await page.click('button:has-text("Create Company")');

  // Wait for the toast to appear
  // shadcn-vue toast typically has role="status" or class containing 'toast'
  await page.waitForSelector('.group.pointer-events-auto', { timeout: 5000 }).catch(() => console.log('Timeout waiting for toast'));

  // Take a screenshot of the resulting page showing the toast
  await page.screenshot({ path: '/home/jules/verification/toast-error.png' });

  await browser.close();
})();
