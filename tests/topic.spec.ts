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

test.skip('add and remove topic', async ({ browser }) => {
    // Create isolated context
    const context = await browser.newContext();
    const page = await context.newPage();

    // 1️⃣ Log in
    await login(page, 'mac@book.com', 'test');

    await page.click('[data-testid="tutor-dashboard-button-pw"]');

    await page.click('[data-testid="edit-tutor-profile-button-pw"]');

    // Wait for managed topics button to appear
    await page.waitForSelector('[data-testid="manage-topics-pw"]', { state: 'visible' });
    await page.click('[data-testid="manage-topics-pw"]');

    // // Pick the very first topic chip
    await page.getByText('Animation', { exact: true }).click();

    // Assert the list contains the picked topic
    await expect(page.locator('[data-testid="selected-topics-pw"]')).toContainText('Animation');

    await page.getByText('Ceramics', { exact: true }).click();

    await expect(page.locator('[data-testid="selected-topics-pw"]')).toContainText('Ceramics');

    await page.locator('[data-testid="selected-topic-pw"]').first().click();

    await expect(page.locator('[data-testid="selected-topics-pw"]')).toContainText('Ceramics');

    await page.locator('[data-testid="selected-topic-pw"]').first().click();

    // Assert the the picked topic has been removed from the list
    await expect(page.locator('[data-testid="selected-topics-pw"]')).toBeHidden();
});