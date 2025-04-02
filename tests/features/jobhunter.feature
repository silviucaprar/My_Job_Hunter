Feature: My LinkedIn Job Hunter

@savesession
Scenario: Save LinkedIn session
    Given HomePage: Navigate to LinkedIn website
    When HomePage: Click on "Reject" cookies button
    And HomePage: Click on "Sign in" button to enter Loginpage
    And LinkedInStoragePage: Save session
    Then HomePage: Verify user is logged in

Scenario Outline: Apply for QA Automation Jobs
    Given HomePage: Navigate to LinkedIn website
    # When HomePage: Click on "Reject" cookies button
    # And HomePage: Click on "Sign in" button to enter Loginpage
    # And LoginPage: Login with valid "<email>" and "<password>"
    # And LinkedInStoragePage: Load saved session
    Then HomePage: Verify user is logged in
    When HomePage: Click on "Jobs" tab
    And JobsPage: Search for "<role>" in "<location>"
    And JobsPage: Click on the "Easy Apply" and "Remote" filters
    And JobsPage: Click the "Easy Apply" button on every job listing that matches qa automation role
    And JobsPage: Go to "My Jobs" page
    Then JobsPage: I should see the exact number of recently applied jobs in My Jobs page
    And JobsPage: Send me an email with the title and description of each job I just applied

    @mytest
    Examples:
    |  email   |   password  |         role         | location  |
    |EMAIL_USER|LINKEDIN_PASS|qa automation engineer|Cluj-Napoca|