import { test, expect, Browser, Page } from '@playwright/test';

async function login(page: Page, email: string, password: string): Promise<void> {
    await page.goto('/signin');

    await page.click('input[name="email"]');
    await page.fill('input[name="email"]', email);
    await page.click('input[name="password"]');
    await page.fill('input[name="password"]', password);
    await page.click('button[type="submit"]');

    // Wait for profile page
    await page.waitForSelector('[data-testid="profile-pw"]', { state: 'visible' });
    await expect(page.locator('[data-testid="profile-pw"]')).toBeVisible();
}

test.skip('Real-time chat works with Socket.IO between two users', async ({ browser }) => {
    // Create two independent sessions (separate cookies + separate Socket.IO connections)
    const userAContext = await browser.newContext();
    const userBContext = await browser.newContext();

    const userA = await userAContext.newPage();
    const userB = await userBContext.newPage();

    // Login each user
    await login(userA, 'mac@book.com', 'test');      // User A
    await login(userB, 'juan@phone.com', 'test');  // User B

    // Both users open the same chat page (example chatId = 10)
    const chatId = 4;
    await userA.goto(`/chat/${chatId}`);
    await userB.goto(`/chat/${chatId}`);

    // User A sends a message
    const messageText = 'New test message.';

    await userA.click('[data-testid="chat-input-pw"]');
    await userA.fill('[data-testid="chat-input-pw"]', messageText);
    await userA.click('[data-testid="send-button-pw"]');

    // Confirm User A sees their own message
    await expect(
        userA.locator('[data-testid="chat-message-pw"]').last()
    ).toContainText(messageText);

    // Confirm User B receives the message via Socket.IO in real time
    await expect(
        userB.locator('[data-testid="chat-message-pw"]').last()
    ).toContainText(messageText);
});
