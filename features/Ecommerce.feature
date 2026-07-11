Feature: Ecommerce Validations

@Regression

  Scenario: Placing the Order
    Given a login to Ecommerce applicatin with "niraj001@yopmail.com" and "Test@123"
    When Add "ZARA COAT 3" to cart
    Then Verify "ZARA COAT 3" is displayed in the Cart
    When Enter valid details and place the order
    Then Verify order is present in the OrderHistory 

