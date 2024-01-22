import { test, expect } from '@playwright/test';

test('visual test full page', async ({ page }) => {
    await page.goto('https://www.flipkart.com/');
    await expect(page).toHaveScreenshot('landing-fullpage.png', { fullPage: true });
});

test('full page with dynamic elements hidden', async ({ page }) => {
    await page.goto('https://www.flipkart.com/');
    await expect(page).toHaveScreenshot('landing-fullpage-mask.png', { fullPage: true, mask: [page.locator("[class='_1yQHx8 _2UnIQ_ _3ak8Rd _1kAmyc']")] });
});

test('just a table screenshot in whole page', async ({ page }) => {
    await page.goto('https://www.commitquality.com/');
    await expect(page.locator('.product-list-table')).toHaveScreenshot(
        'computers-table-list-with-mask.png',
        {
            mask: [page.getByTestId("name")]
        });
});

test.only('pixel ratio', async ({ page }) => {
    await page.goto('https://www.commitquality.com/');
    await expect(page.locator('.product-list-table')).toHaveScreenshot(
        'computers-table-list-with-small-difference.png',
        {
            // maxDiffPixelRatio: 0.02,
            maxDiffPixels: 100
        }
    )
});