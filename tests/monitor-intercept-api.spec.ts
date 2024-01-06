import test, { expect } from "@playwright/test";

test('monitor-intercept api demo', async ({ page }) => {
    // page.on('request', request => console.log(request.url(), request.method()))
    // page.on('response', response => console.log(response.status()))

    await page.route(/png/, route => route.abort())
    await page.route('**/*', route => {
        const headers = {
            ...route.request().headers(),
            'test-header': 'test-value'
        }
        route.continue({ headers })
        // console.log(route.request().method, route.request().url())
        // route.continue()
    })
    await page.goto('https://opensource-demo.orangehrmlive.com/web/index.php/auth/login')
    await page.getByRole('textbox', { name: 'Username' }).fill('Admin')
    await page.getByPlaceholder('Password').fill('admin123')
    await page.getByRole('button', { name: /login/i }).click()
    await expect(page.getByTitle('Assign Leave').last()).not.toBeVisible()
})