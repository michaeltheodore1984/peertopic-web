import { test, expect } from '@playwright/test';

test.skip('Visiting /messages without login shows sign-in card', async ({ page }) => {
    // /tutor
    await page.goto('/messages');
  
    // not signed in
    await expect(page.locator('[data-testid="messages-pw"]')).toBeHidden();
  
    // enter email and password
    await page.click('input[name="email"]');
    await page.fill('input[name="email"]', 'mac@book.com');
    await page.click('input[name="password"]');
    await page.fill('input[name="password"]', 'test');
    await page.click('button[type="submit"]');
  
    // signed in
    await page.waitForSelector('[data-testid="messages-pw"]', { state: 'visible' });
    await expect(page.locator('[data-testid="messages-pw"]')).toBeVisible();
  })