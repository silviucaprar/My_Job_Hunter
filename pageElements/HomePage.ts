import { Page, Locator } from '@playwright/test'

export class HomePage {

    readonly page: Page;
    readonly btnSignin: Locator;
    readonly btnRejectCookies: Locator;
    readonly lnkjobsTab: Locator;
    readonly userName: Locator;
    readonly homeActiveLocator: Locator;
     
    constructor(page: Page) {
        this.page = page;
        this.btnSignin = page.getByRole('link', {name: 'Sign in', exact: true });
        this.btnRejectCookies = page.getByRole('button', {name: 'Reject'});
        this.lnkjobsTab = page.getByRole('link', {name: 'Jobs', exact: true});
        this.userName = page.locator('.t-16.t-black.t-bold').nth(0);
        this.homeActiveLocator = this.page.locator('[type="home-active"]');
    }

    async openHomepage(): Promise<void> {
        await this.page.goto('/');
    }
    
    async clickOnRejectCookiesButton(): Promise<void> {
        await this.btnRejectCookies.click();
    }
    
    async clickOnSigninButton(): Promise<void> {
        await this.btnSignin.click();
    }
    
    async userIsLoggedIn(): Promise<string> {
        try {
            await this.homeActiveLocator.waitFor({ state: 'visible', timeout: 10000 });
            return this.page.url();
        } catch (error) {
            console.error("User is not logged in or page did not load properly:", error);
            throw error;
        }
    }
    
    async clickOnJobsTab(): Promise<void> {
        await this.lnkjobsTab.waitFor({ state: 'visible' });
        await this.lnkjobsTab.click();
    }
}