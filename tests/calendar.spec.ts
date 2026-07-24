import test, { expect, Page } from "@playwright/test";

async function login(page: Page, email: string, password: string) {
    await page.goto('/signin');
    await page.click('input[name="email"]');
    await page.fill('input[name="email"]', email);
    await page.click('input[name="password"]');
    await page.fill('input[name="password"]', password);
    await page.click('button[type="submit"]');

    await page.waitForSelector('[data-testid="profile-pw"]', { state: 'visible' });
    await expect(page.locator('[data-testid="profile-pw"]')).toBeVisible();
}

test.skip('selects a date on the calendar', async ({ browser }) => {
    // Create isolated context
    const context = await browser.newContext();
    const page = await context.newPage();

    // 1️⃣ Log in
    await login(page, 'mac@book.com', 'test');

    await page.click('[data-testid="tutor-dashboard-button-pw"]');

    await page.click('[data-testid="edit-tutor-profile-button-pw"]');

    // Wait for calendar to appear
    await page.waitForSelector('[data-testid="calendar-root-pw"]', { state: 'visible' });

    // // Pick a specific date, e.g., 2025-12-05
    await page.click('[aria-label="December 5, 2025"]');

    // Wait for the selected dates list to render
    await page.waitForSelector('[data-testid="selected-dates-pw"]', { state: 'visible' });

    // Assert the list contains the picked date
    await expect(page.locator('[data-testid="selected-dates-pw"]')).toContainText('2025-12-05');
});