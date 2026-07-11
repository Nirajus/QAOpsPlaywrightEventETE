Feature: Ecommerce Validations

  @Validation

  Scenario Outline: Placing the Order
    Given a login to Ecommerce2 applicatin with "<username>" and "<password>"
    Then Verify Error messgae is displayed

    Examples:
      | username             | password |
      | niraj001@yopmail.com | Test@123 |
      | hello@123.com        | IamHello |

