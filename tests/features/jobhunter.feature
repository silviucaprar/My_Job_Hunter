Feature: My LinkedIn Job Hunter

Scenario Outline: Apply for QA Automation Jobs
    Given HomePage: Navigate to LinkedIn website
    When HomePage: Click on "Reject" cookies button
    And HomePage: Click on "Sign in" button to enter Loginpage
    And LoginPage: Login with valid "<email>" and "<password>"
    Then HomePage: Verify user is logged in
    When HomePage: Click on "Jobs" tab
    And JobsPage: Search for "<role>"
    And JobsPage: Click on the "Easy Apply" and "Remote" filters
    And JobsPage: Click the "Easy Apply" button on every job listing that matches qa automation role

    @mytest
    Examples:
    | email | password |         role         |
    |MYEMAIL|MYPASSWORD|qa automation engineer|