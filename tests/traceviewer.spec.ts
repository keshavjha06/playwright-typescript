import test from "@playwright/test";

test('traceviewer demo', async ({ page }) => {
    await page.goto('https://opensource-demo.orangehrmlive.com/web/index.php/auth/login')
    await page.getByRole('textbox', { name: 'Username' }).fill('Admin')
    await page.getByPlaceholder('Password').fill('admin123')
    await page.getByRole('button', { name: /login/i }).click()
    await page.getByRole('button', { name: "check" }).click()

})

