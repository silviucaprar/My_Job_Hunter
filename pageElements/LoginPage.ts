import { Page, Locator } from '@playwright/test'

export class LoginPage {

    readonly page: Page;
    readonly labelEmail: Locator;
    readonly labelPass: Locator;
    readonly btnLoginSignin: Locator;
    
    constructor(page: Page) {
        this.page = page;
        this.labelEmail = page.getByRole('textbox', {name: 'Email'});
        this.labelPass = page.getByRole('textbox', {name: 'Password'});
        this.btnLoginSignin = page.getByRole('button', {name: 'Sign in', exact: true});
    }

    async fillEmailAddress(email) {
        await this.labelEmail.fill(email);
    }

    async fillPassword(password) {
        await this.labelPass.fill(password);
    }

    async waitForTimeOut() {
        await this.page.waitForTimeout(2000);
    }

    async clickOnSignInButton() {
        await this.btnLoginSignin.click();
    }

    async login(email: string, password: string) {
        await this.fillEmailAddress(process.env[email]);
        await this.page.waitForTimeout(2000);
        await this.fillPassword(process.env[password]);
        await this.page.waitForTimeout(2000);
        await this.clickOnSignInButton();
    }
}