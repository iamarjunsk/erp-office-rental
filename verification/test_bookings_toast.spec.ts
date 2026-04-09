import { test, expect } from '@playwright/test';
import * as path from 'path';
import { fileURLToPath } from 'url';

test('verify error toast in bookings', async ({ page }) => {
  // Pre-authenticate
  await page.goto('http://localhost:3000/login');
  await page.click('button:has-text("Login as Admin")');
  await page.waitForURL('http://localhost:3000/admin');

  // Go to bookings page
  await page.goto('http://localhost:3000/admin/bookings');

  // Mock the creation endpoint to fail
  await page.route('**/api/bookings/', async (route) => {
    if (route.request().method() === 'POST') {
      await route.fulfill({
        status: 400,
        contentType: 'application/json',
        body: JSON.stringify({ detail: 'Simulated API Error for Bookings' })
      });
    } else {
      await route.continue();
    }
  });

  // Open modal
  await page.click('button:has-text("New Booking")');
  await page.waitForSelector('text=New Booking', { state: 'visible' });

  // Fill out form
  await page.fill('input[type="text"]', 'Test Booking');

  // Need to evaluate to set values correctly to pass HTML5 validation
  await page.evaluate(() => {
    const selects = document.querySelectorAll('select');
    if (selects.length > 0 && selects[0].options.length > 1) {
       selects[0].value = selects[0].options[1].value;
       selects[0].dispatchEvent(new Event('change'));
    }
  });

  await page.fill('input[type="datetime-local"]', '2025-01-01T10:00');
  const dts = await page.$$('input[type="datetime-local"]');
  if (dts.length > 1) {
    await dts[1].fill('2025-01-01T11:00');
  }

  // Submit form
  await page.click('button[type="submit"]');

  // Wait for toast and screenshot
  await page.waitForSelector('text=Simulated API Error for Bookings', { state: 'visible', timeout: 5000 });

  // Wait a moment for animation
  await page.waitForTimeout(500);

  await page.screenshot({ path: path.join(process.cwd(), 'verification/toast_screenshot.png') });
});
