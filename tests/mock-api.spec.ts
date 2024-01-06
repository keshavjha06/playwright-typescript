import test, { expect } from "@playwright/test";

test('monitor-intercept-mock api demo', async ({ page }) => {

    // Mock API
    // await page.route('**/web/index.php/api/v2/dashboard/shortcuts',
    //     route => route.fulfill({
    //         status: 200,
    //         json: {
    //             "data": {
    //                 "leave.assign_leave": false,
    //                 "leave.leave_list": true,
    //                 "leave.apply_leave": true,
    //                 "leave.my_leave": true,
    //                 "time.employee_timesheet": true,
    //                 "time.my_timesheet": true
    //             },
    //             "meta": [],
    //             "rels": []
    //         }
    //     }));

    await page.route('**/web/index.php/api/v2/dashboard/shortcuts', async route => {
        const response = await route.fetch()
        const json = await response.json()
        json.data['time.my_timesheet'] = false
        console.log(json)
        return route.fulfill({
            status: 200,
            json
        })
    })
    await page.goto('https://opensource-demo.orangehrmlive.com/web/index.php/auth/login')
    await page.getByRole('textbox', { name: 'Username' }).fill('Admin')
    await page.getByPlaceholder('Password').fill('admin123')
    await page.getByRole('button', { name: /login/i }).click()
    await expect(page.getByTitle('My Timesheet').last()).not.toBeVisible()
    await expect(page.getByTitle('Leave List').last()).toBeVisible()
    await expect(page.getByTitle('My Timesheet').last()).toBeVisible()

})