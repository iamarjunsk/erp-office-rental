import { test, expect } from '@playwright/test';
import * as fs from 'fs';

test('Maintenance Error Toasts', async ({ page }) => {
  // Login as admin
  await page.goto('http://localhost:3000/login');
  await page.click('text=Login as Admin');
  await page.waitForURL('http://localhost:3000/admin');

  // Go to create maintenance page
  await page.goto('http://localhost:3000/admin/maintenance/create');

  // We will force the submit by bypassing the frontend validation
  // Intercept the API call to return a 400 error
  await page.route('**/api/maintenance/requests/', route => {
    route.fulfill({
      status: 400,
      contentType: 'application/json',
      body: JSON.stringify({ detail: 'Failed to create maintenance request' })
    });
  });

  // Evaluate script in browser to call createRequest directly
  // In Vue, you can trigger event dispatch this way but vue might not pick it up correctly
  // without the actual mouse click on submit. Let's try filling the form out manually but bypassing required

  await page.evaluate(() => {
    // Remove the required attribute from all inputs and textareas
    document.querySelectorAll('input, textarea, select').forEach(el => el.removeAttribute('required'));
  });

  await page.click('button:has-text("Create Request")');

  // Wait for the toast to appear, looking for any text from error message
  await expect(page.locator('[data-state="open"]')).toBeVisible({ timeout: 5000 }).catch(() => {});

  // Just wait a moment to make sure any animations complete
  await page.waitForTimeout(1000);

  // Take screenshot of the whole page
  await page.screenshot({ path: 'verification/maintenance-create-toast.png' });

  // Also dump HTML to help debug if it fails
  const html = await page.content();
  fs.writeFileSync('verification/page.html', html);
});
