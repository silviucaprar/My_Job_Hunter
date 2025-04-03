import { Given, When, Then } from "../../setup/fixtures"
import { expect } from "@playwright/test";

Given("HomePage: Navigate to LinkedIn website", async ({ homePage }) => {
    await homePage.openHomepage();
});

When('HomePage: Click on "Reject" cookies button', async ({ homePage }) => {
    await homePage.clickOnRejectCookiesButton();
});

When('HomePage: Click on "Sign in" button to enter Loginpage', async ({ homePage }) => {
    await homePage.clickOnSigninButton();
});

Then('HomePage: Verify user is logged in', async ({ homePage }) => {
    const currentURL: string = await homePage.userIsLoggedIn();
    expect(currentURL).toContain('linkedin.com/feed')
    console.log('Login process completed')
});

When('HomePage: Click on "Jobs" tab', async ({ homePage }) => {
    await homePage.clickOnJobsTab();
})