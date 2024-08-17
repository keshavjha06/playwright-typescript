import { test, expect } from '@playwright/test';

test('test', async ({ page }) => {
    await page.goto('https://stage.forge.gg/');
    await page.getByRole('button', { name: 'Log In' }).click();
    await page.getByRole('textbox', { name: 'jon@doe.com' }).click();
    await page.getByRole('textbox', { name: 'jon@doe.com' }).fill('qa-user-00050@forge.internal');
    await page.locator('#loginPassword').click();
    await page.locator('#loginPassword').fill('forge');
    await page.getByRole('button', { name: 'Log in', exact: true }).click();
    await page.locator('svg').nth(3).click();
    await page.getByRole('link', { name: 'SETTINGS' }).click();
    await page.getByRole('tab', { name: 'Support' }).click();
    const page1Promise = page.waitForEvent('popup');
    await page.getByRole('link', { name: 'Visit FAQ' }).click();
    const page1 = await page1Promise;
    const visitURL = page1.url();
    console.log("************The visit FAQ page URL is************* " + visitURL)
    const visitTitle = await page1.title()
    console.log("************The visit FAQ page title is*********** " + visitTitle)
    const page2Promise = page.waitForEvent('popup');
    await page.getByText('Visit discord support center').click();
    const page2 = await page2Promise;
    const pageURL = page2.url();
    console.log("**********The page URL is*********** " + pageURL)
    const pageTitle = await page2.title()
    console.log("***********The page title is********* " + pageTitle)
});