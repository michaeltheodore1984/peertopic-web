import { test, expect } from '@playwright/test';

// check skips

test.skip('user can sign up', async ({ page }) => {
  // Sign up
  await page.goto('/signup');

  // Fill first name, email and password

  // check
  await page.fill('input[name="firstName"]', 'Mac');
  await page.fill('input[name="email"]', 'mac@book.com');
  await page.fill('input[name="password"]', 'test');
  await page.click('button[type="submit"]');

  await expect(page).toHaveURL('/signin');
})

test.skip('user can sign in and sign out', async ({ page }) => {
  // Sign in
  await page.goto('/signin');

  await page.click('input[name="email"]');
  await page.fill('input[name="email"]', 'mac@book.com');
  await page.click('input[name="password"]');
  await page.fill('input[name="password"]', 'test');
  await page.click('button[type="submit"]');

  await page.waitForURL('/profile');
  await expect(page).toHaveURL('/profile');

  // Show dropdown
  await page.click('[data-testid="avatar-dropdown-toggle-desktop"]');

  await page.waitForSelector('[data-testid="signout-button-desktop"]', { state: 'visible' });

  // Sign out
  await page.click('[data-testid="signout-button-desktop"]');
  await expect(page).toHaveURL('/signin');
});