import { test, expect } from "@playwright/test";

test('wait demo', async ({ page }) => {
    await page.goto('https://opensource-demo.orangehrmlive.com/web/index.php/auth/login')
    /*  await page.waitForURL(/login/)
     await page.waitForTimeout(3000)  // Thread.sleep */
    const response = await page.waitForResponse(/ohrm_logo.png/) // wait till request is triggered
    console.log(response.request().url())
    await expect(page.getByAltText('orangehrm-logo').last()).toBeVisible({ timeout: 5_000 })
    await page.waitForSelector("//input[@name='username']")
    await page.waitForFunction(() => {
        window.scrollBy(0, 600);
        return true;
    })
    await page.getByPlaceholder('Username').fill('abcdefgh')
})