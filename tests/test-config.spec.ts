import test from "@playwright/test";

test.use({
    video: 'on'
})


test('test-config demo', async ({ page }) => {
    await page.goto('https://playwright.dev/docs/intro')
})

// file level (test config )> projects level > global level