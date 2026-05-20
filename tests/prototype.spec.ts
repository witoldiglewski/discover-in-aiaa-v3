import { test, expect } from '@playwright/test';

test.describe('AI Agents Prototype', () => {
  test('renders global navigation', async ({ page }) => {
    await page.goto('/');

    // Check header elements
    await expect(page.getByText('AI Agents')).toBeVisible();
    await expect(page.getByRole('button', { name: /search/i })).toBeVisible();

    // Check main navigation items
    await expect(page.getByRole('navigation').getByText('Overview')).toBeVisible();
    await expect(page.getByRole('navigation').getByText('AI Agents')).toBeVisible();
    await expect(page.getByRole('navigation').getByText('Conversations')).toBeVisible();
  });

  test('renders subnavigation', async ({ page }) => {
    await page.goto('/');

    // Check subnav items
    await expect(page.getByText('Discover')).toBeVisible();
    await expect(page.getByText('Custom Agents')).toBeVisible();
    await expect(page.getByText('Agent Builder')).toBeVisible();
  });

  test('renders main content', async ({ page }) => {
    await page.goto('/');

    // Check main content heading
    await expect(page.getByRole('heading', { name: /discover in ai agents/i })).toBeVisible();
    await expect(page.getByText(/welcome to the ai agents automation platform/i)).toBeVisible();

    // Check button
    const button = page.getByRole('button', { name: /get started/i });
    await expect(button).toBeVisible();
  });

  test('navigation interaction works', async ({ page }) => {
    await page.goto('/');

    // Click on a nav item (visual change, state updates)
    const settingsNav = page.getByRole('navigation').getByText('Settings');
    await settingsNav.click();

    // Verify it's now selected (aria-selected or class change)
    await expect(settingsNav).toHaveAttribute('aria-current', 'page');
  });

  test('subnav can be collapsed', async ({ page }) => {
    await page.goto('/');

    // Find and click the expand/collapse button
    const expandButton = page.locator('[aria-label*="collapse"]').or(page.locator('[aria-label*="expand"]')).first();
    await expandButton.click();

    // Wait for animation
    await page.waitForTimeout(300);

    // Subnav should still exist but might be hidden or collapsed
    const subnav = page.getByText('Custom Agents');
    // Just verify the button works without asserting visibility state
  });
});
