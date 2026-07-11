const {test, expect, request} = require('@playwright/test');
const LoginPayload = { email: "niraj001@yopmail.com", password: "Test@123" };
let token;

test.beforeAll(async () =>{

    const apiContext = await request.newContext();
    const LoginResponse = await apiContext.post("https://api.eventhub.rahulshettyacademy.com/api/auth/login",
        {
        data:LoginPayload
    });
    expect(LoginResponse.ok()).toBeTruthy();
    const LoginResponseJson = await LoginResponse.json();
    token = LoginResponseJson.token;
    console.log(token);
});

test('Login to Event API', async({page}) =>{

    await page.addInitScript(value =>{

        window.localStorage.setItem('token', value);
    }, token);
    await page.goto("https://eventhub.rahulshettyacademy.com/");
});