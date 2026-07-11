const { test, expect, request } = require('@playwright/test');
const loginPayload = { userEmail: "niraj001@yopmail.com", userPassword: "Test@123" };
const orderPayload = { orders: [{ country: "India", productOrderedId: "6960eac0c941646b7a8b3e68" }] };
const fakePayloadOrders = {message:"No Product in Cart"};

const { APIUtils } = require('../utils/APIUtils');
let response;

test.beforeAll(async () => {

    //Login API
    const apiContext = await request.newContext();
    const apiUtils = new APIUtils(apiContext, loginPayload);
    response = await apiUtils.createOrder(orderPayload);
});

test('Place the order', async ({ page }) => {

    await page.addInitScript(value => {

        window.localStorage.setItem('token', value);
    }, response.token);

    await page.goto("https://rahulshettyacademy.com/client");
    await page.route("https://rahulshettyacademy.com/api/ecom/order/get-orders-for-customer/*",
       async route =>{
            const response = await page.request.fetch(route.request());
            let body = JSON.stringify(fakePayloadOrders);
            await route.fulfill({
                response,
                body,
            });
            // //intercepting response -APi response-> { playwright fakeresponse}->browser->render data on front end
        }
    )
    await page.locator("button[routerlink*='myorders']").click();
    await page.waitForResponse("https://rahulshettyacademy.com/api/ecom/order/get-orders-for-customer/*");
   
    console.log(await page.locator(".mt-4").textContent());

});