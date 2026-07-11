const { test, expect } = require('@playwright/test');
const { text } = require('node:stream/consumers');

test('@Web Client Shoppin App', async ({ page }) => {
 
   //js file- Login js, DashboardPage
   const email = "niraj001@yopmail.com";
   const productName = 'ZARA COAT 3';
   const products = page.locator(".card-body");

   await page.goto("https://rahulshettyacademy.com/client");

 await page.getByPlaceholder("email@example.com").fill(email);
   await page.getByPlaceholder("enter your passsword").fill("Test@123");
   await page.getByRole('button',{name:"Login"}).click();
   await page.waitForLoadState('networkidle');
   await page.locator(".card-body b").first().waitFor();
   
   await page.locator(".card-body").filter({hasText:"ZARA COAT 3"})
   .getByRole("button",{name:"Add to Cart"}).click();
 
   await page.getByRole("listitem").getByRole('button',{name:"Cart"}).click();
 
   //await page.pause();
   await page.locator("div li").first().waitFor();
   await expect(page.getByText("ZARA COAT 3")).toBeVisible();
 
   await page.getByRole("button",{name :"Checkout"}).click();
 
   await page.getByPlaceholder("Select Country").pressSequentially("ind");
 
   await page.getByRole("button",{name :"India"}).nth(1).click();
   await page.getByText("PLACE ORDER").click();
 
   await expect(page.getByText("Thankyou for the order.")).toBeVisible();


   await page.getByRole("button",{name:"  ORDERS"}).click();
   
   await page.locator("tbody").waitFor();

   await page.getByRole('cell', {name: "orderId"}).first().click();
   const orderId = await page.locator(".col-text").textContent();
   console.log(orderId);
   expect(orderId.includes(orderIdDetails)).toBeTruthy();
 
});
 