import { test, expect, Page } from '@playwright/test';

// Flipkart's homepage rotates banners and product images on every load, so these tests
// screenshot only the visible viewport (not the full page) and mask the parts that change.
async function openFlipkart(page: Page) {
    await page.goto('https://www.flipkart.com/');
    await page.waitForLoadState('domcontentloaded');
}

test('visual test visible area', async ({ page }) => {
    await openFlipkart(page);
    await expect(page).toHaveScreenshot('landing-viewport.png', {
        fullPage: false,
        // the rotating hero banner carousel is rendered with <picture> elements
        mask: [page.locator('picture')],
        maxDiffPixelRatio: 0.02,
    });
});

test('visible area with changing banners masked', async ({ page }) => {
    await openFlipkart(page);
    await expect(page).toHaveScreenshot('landing-viewport-mask.png', {
        fullPage: false,
        mask: [page.locator('img, picture, video, iframe')],
        maxDiffPixelRatio: 0.02,
    });
});

test('just a table screenshot in whole page', async ({ page }) => {
    await page.goto('https://www.commitquality.com/');
    await expect(page.locator('.product-list-table')).toHaveScreenshot(
        'computers-table-list-with-mask.png',
        {
            mask: [page.getByTestId("name")]
        });
});

test('pixel ratio', async ({ page }) => {
    await page.goto('https://www.commitquality.com/');
    await expect(page.locator('.product-list-table')).toHaveScreenshot(
        'computers-table-list-with-small-difference.png',
        {
            // maxDiffPixelRatio: 0.02,
            maxDiffPixels: 100
        }
    )
});
