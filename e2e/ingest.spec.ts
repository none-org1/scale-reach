import { expect, test } from '@playwright/test';

test.describe('F01: Ingest & Process Video', () => {
  test('F01-H1: User submits a YouTube URL', async ({ page }) => {
    await page.goto('/dashboard');
    await page.getByRole('button', { name: /New Project/i }).click();
    await page.getByPlaceholder(/Paste YouTube/i).fill('https://www.youtube.com/watch?v=example');
    await page.getByRole('button', { name: /Process Video/i }).click();

    // Expect the dashboard to update (mock behavior)
    await expect(page.locator('text=Processing...')).toBeVisible();
  });
});
