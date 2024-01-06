import test, { expect } from "@playwright/test";

test.skip('locators demo', async ({ page }) => {
    await page.goto('https://opensource-demo.orangehrmlive.com/web/index.php/auth/login')
    // await page.getByRole('textbox', { name: 'Username' }).fill('Admin')
    // await page.getByPlaceholder('Username').fill('Admin')
    await page.getByPlaceholder(/username/i).fill('Admin') // for case senstive - regex
    await page.getByRole('button', { name: /login/i })
    await page.getByText(/Forgot your password/i).click()
    await expect(page.getByAltText('company-branding')).toBeVisible()
    await page.locator("input[placeholder='Username']") // CSS locator
    await page.locator("//input[@placeholder='Username']") // XPath
    await page.locator('input:below(:text("Username"))').first().fill('value')
    await page.waitForTimeout(3_000)
})

test('aria label', async ({ page }) => {
    await page.goto('https://www.google.co.in')
    await page.getByLabel('Search for Images (opens a new tab)').click()
    await page.waitForTimeout(3_000)
})