import { test, expect } from '@playwright/test';

// Uses https://the-internet.herokuapp.com (open-source practice app: github.com/saucelabs/the-internet)
test('switch tab demo', async ({ page, context }) => {
    await page.goto('https://the-internet.herokuapp.com/windows');
    await expect(page.getByRole('heading', { name: 'Opening a new window' })).toBeVisible();

    // First new tab: start waiting for the popup before clicking the link that opens it
    const page1Promise = page.waitForEvent('popup');
    await page.getByRole('link', { name: 'Click Here' }).click();
    const page1 = await page1Promise;
    await page1.waitForLoadState();
    console.log("************The new window page URL is************* " + page1.url())
    console.log("************The new window page title is*********** " + await page1.title())
    await expect(page1).toHaveURL(/\/windows\/new/);
    await expect(page1.getByRole('heading', { name: 'New Window' })).toBeVisible();

    // Switch back to the original tab and open a second one
    await page.bringToFront();
    const page2Promise = page.waitForEvent('popup');
    await page.getByRole('link', { name: 'Elemental Selenium' }).click();
    const page2 = await page2Promise;
    await page2.waitForLoadState();
    console.log("**********The page URL is*********** " + page2.url())
    console.log("***********The page title is********* " + await page2.title())
    await expect(page2).toHaveURL(/elementalselenium\.com/);

    // All three tabs belong to the same browser context
    expect(context.pages()).toHaveLength(3);
});
