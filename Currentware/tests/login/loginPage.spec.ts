import { test, expect } from '@playwright/test';

test.use({
  ignoreHTTPSErrors: true
});

test.skip('test', async ({ page }) => {
  await page.goto('https://40.90.236.38:8998/login');
  await page.getByRole('textbox', { name: 'Enter Operator Username' }).click();
  await page.getByRole('textbox', { name: 'Enter Operator Username' }).fill("currentware");
  await page.getByRole('textbox', { name: 'Enter Password' }).click();
  await page.getByRole('textbox', { name: 'Enter Password' }).fill('Currentware1234!');
  await page.getByRole('button', { name: 'SIGN IN' }).click();
});