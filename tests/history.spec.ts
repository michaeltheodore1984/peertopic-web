import { test, expect } from '@playwright/test';

test.skip('Visiting /history without login shows sign-in card', async ({ page }) => {
    // /tutor
    await page.goto('/history');

    // not signed in
    await expect(page.locator('[data-testid="history-pw"]')).toBeHidden();

    // enter email and password
    await page.click('input[name="email"]');
    await page.fill('input[name="email"]', 'mac@book.com');
    await page.click('input[name="password"]');
    await page.fill('input[name="password"]', 'test');
    await page.click('button[type="submit"]');

    // signed in
    await page.waitForSelector('[data-testid="history-pw"]', { state: 'visible' });
    await expect(page.locator('[data-testid="history-pw"]')).toBeVisible();
})
