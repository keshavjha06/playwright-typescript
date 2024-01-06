import test, { expect } from "@playwright/test";
import exp from "constants";

test('get api demo', async ({ request }) => {
    const response = await request.get('https://reqres.in/api/users/2')
    expect(response.status()).toBe(200)
    console.log(await response.json());
    const responseBody = await response.json()
    expect(responseBody.data.email).toBe('janet.weaver@reqres.in')
    expect(responseBody.data.id).toBe(2)
    expect(responseBody.data.avatar).toBe('https://reqres.in/img/faces/2-image.jpg')
})

test('post api demo', async ({ request }) => {
    const response = await request.post('https://reqres.in/api/users', {
        data: {
            name: 'morpheus',
            job: 'leader'
        },
        timeout: 10000,
        headers: {
            'Content-Type': 'application/json'
        }

    })
    expect(response.status()).toBe(201)
    const json = await response.json()
    expect(json).toStrictEqual(expect.objectContaining({
        name: 'morpheus',
        job: 'leader',
        id: expect.any(String),
        createdAt: expect.any(String)

    }))
})