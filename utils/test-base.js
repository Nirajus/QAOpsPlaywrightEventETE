const base = require("@playwright/test");

exports.customtest = base.test.extend({
    testDataForOrder:
    {
        username: "niraj001@yopmail.com",
        password: "Test@123",
        productName: "ZARA COAT 3"
    }
});