import { Page, Locator } from '@playwright/test'

export class HomePage {

    readonly page: Page;
    readonly btnSignin: Locator;
    readonly btnRejectCookies: Locator;
    readonly lnkjobsTab: Locator;
    readonly userName: Locator;
     
    constructor(page: Page) {
        this.page = page;
        this.btnSignin = page.getByRole('link', {name: 'Sign in', exact: true });
        this.btnRejectCookies = page.getByRole('button', {name: 'Reject'});
        this.lnkjobsTab = page.getByRole('link', {name: 'Jobs', exact: true});
        this.userName = page.locator('.t-16.t-black.t-bold').nth(0);
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
        await this.page.waitForURL(/linkedin\.com\/feed/);
        return this.page.url();
    }
    
    async clickOnJobsTab(): Promise<void> {
        await this.lnkjobsTab.waitFor({ state: 'visible' });
        await this.lnkjobsTab.click();
    }
}