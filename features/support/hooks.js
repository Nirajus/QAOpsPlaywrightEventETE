const { chromium } = require('playwright');
const { POManager } = require('../../pageobjects/POManager');
const { Before, After, BeforeStep, AfterStep,Status } = require('@cucumber/cucumber');
const path = require('node:path');

Before(async function () {
    const browser = await chromium.launch({
        headless: false
    });
    const context = await browser.newContext();
    this.page = await context.newPage();

    this.poManager = new POManager(this.page);
});

BeforeStep({ tags: "@foo" }, function () {
    // This hook will be executed before all steps in a scenario with tag @foo
});

AfterStep(async function ({ result }) {
    // This hook will be executed after all steps, and take a screenshot on step failure
    if (result.status === Status.FAILED) {
        await this.page.screenshot({ path: 'screenshot1.png' });
    }
});




After(function () {

    console.log("I am the last to execute");
});