import { test, expect, Page } from '@playwright/test';
import path from 'path';

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

test.skip('Visiting /profile without login shows sign-in card', async ({ page }) => {
    // /profile
    await page.goto('/profile');

    // not signed in
    await expect(page.locator('[data-testid="profile-pw"]')).toBeHidden();

    // enter email and password
    await page.click('input[name="email"]');
    await page.fill('input[name="email"]', 'mac@book.com');
    await page.click('input[name="password"]');
    await page.fill('input[name="password"]', 'test');
    await page.click('button[type="submit"]');

    // signed in
    await page.waitForSelector('[data-testid="profile-pw"]', { state: 'visible' });
    await expect(page.locator('[data-testid="profile-pw"]')).toBeVisible();
})

test.skip('Visiting /profile/edit without login shows sign-in card', async ({ page }) => {
    // /profile
    await page.goto('/profile/edit');

    // not signed in
    await expect(page.locator('[data-testid="profile-edit-pw"]')).toBeHidden();

    // enter email and password
    await page.click('input[name="email"]');
    await page.fill('input[name="email"]', 'mac@book.com');
    await page.click('input[name="password"]');
    await page.fill('input[name="password"]', 'test');
    await page.click('button[type="submit"]');

    // signed in
    await page.waitForSelector('[data-testid="profile-edit-pw"]', { state: 'visible' });
    await expect(page.locator('[data-testid="profile-edit-pw"]')).toBeVisible();
})

test.skip('Profile update persists after refresh', async ({ browser }) => {
    // Create isolated context
    const context = await browser.newContext();
    const page = await context.newPage();

    // 1️⃣ Log in
    await login(page, 'mac@book.com', 'test');

    await page.click('[data-testid="edit-profile-button-pw"]');

    // 3️⃣ Fill profile fields
    await page.click('input[name="firstName"]');
    await page.fill('input[name="firstName"]', 'Mac');
    await page.click('input[name="lastName"]');
    await page.fill('input[name="lastName"]', 'Donald');
    await page.click('input[name="email"]');
    await page.fill('input[name="email"]', 'mac@book.com');

    // 5️⃣ Submit the form
    await page.click('[data-testid="save-profile-button-pw"]');

    // 7️⃣ Refresh the page
    await page.reload();
    await page.waitForSelector('input[name="firstName"]', { state: 'visible' });

    // 8️⃣ Verify updated profile
    await expect(page.locator('input[name="firstName"]')).toHaveValue('Mac');
    await expect(page.locator('input[name="lastName"]')).toHaveValue('Donald');
    await expect(page.locator('input[name="email"]')).toHaveValue('mac@book.com');
    // await expect(page.locator('[data-testid="avatar-img"]')).toHaveAttribute('src', /avatar\.png$/);
});
