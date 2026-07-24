import { test, expect, Page } from '@playwright/test';

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

test.skip('Visiting /tutor without login shows sign-in card', async ({ page }) => {
    // /tutor
    await page.goto('/tutor');

    // not signed in
    await expect(page.locator('[data-testid="tutor-pw"]')).toBeHidden();

    // enter email and password
    await page.click('input[name="email"]');
    await page.fill('input[name="email"]', 'mac@book.com');
    await page.click('input[name="password"]');
    await page.fill('input[name="password"]', 'test');
    await page.click('button[type="submit"]');

    // signed in
    await page.waitForSelector('[data-testid="tutor-pw"]', { state: 'visible' });
    await expect(page.locator('[data-testid="tutor-pw"]')).toBeVisible();
})

test.skip('Visiting /tutor/edit without login shows sign-in card', async ({ page }) => {
    // /tutor
    await page.goto('/tutor/edit');

    // not signed in
    await expect(page.locator('[data-testid="tutor-edit-pw"]')).toBeHidden();

    // enter email and password
    await page.click('input[name="email"]');
    await page.fill('input[name="email"]', 'mac@book.com');
    await page.click('input[name="password"]');
    await page.fill('input[name="password"]', 'test');
    await page.click('button[type="submit"]');

    // signed in
    await page.waitForSelector('[data-testid="tutor-edit-pw"]', { state: 'visible' });
    await expect(page.locator('[data-testid="tutor-edit-pw"]')).toBeVisible();
})

test.skip('Tutor Profile update persists after refresh', async ({ browser }) => {
    // Create isolated context
    const context = await browser.newContext();
    const page = await context.newPage();

    // 1️⃣ Log in
    await login(page, 'mac@book.com', 'test');

    await page.click('[data-testid="tutor-dashboard-button-pw"]');

    await page.click('[data-testid="edit-tutor-profile-button-pw"]');

    // 3️⃣ Fill profile fields
    await page.click('input[name="hourlyRate"]');
    await page.fill('input[name="hourlyRate"]', '40');
    await page.click('textarea[name="bio"]');
    await page.fill('textarea[name="bio"]', 'My tutor bio.');

    // 5️⃣ Submit the form
    await page.click('[data-testid="save-tutor-profile-button-pw"]');

    // 7️⃣ Refresh the page
    await page.reload();
    await page.waitForSelector('input[name="hourlyRate"]', { state: 'visible' });

    // 8️⃣ Verify updated tutor profile
    await expect(page.locator('input[name="hourlyRate"]')).toHaveValue('40');
    await expect(page.locator('textarea[name="bio"]')).toHaveValue('My tutor bio.');
});