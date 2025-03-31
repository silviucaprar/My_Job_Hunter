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

    async fillEmailAddress(email: string): Promise<void> {
        await this.labelEmail.fill(email);
    }

    async fillPassword(password: string): Promise<void> {
        await this.labelPass.fill(password);
    }

    async waitForTimeOut(): Promise<void> {
        await this.page.waitForTimeout(2000);
    }

    async clickOnSignInButton(): Promise<void> {
        await this.btnLoginSignin.click({timeout: 40000});
    }

    async login(email: string, password: string): Promise<void> {
        const emailValue: string | undefined = process.env[email]; 
        const passwordValue: string | undefined = process.env[password]; 
    
        if (!emailValue || !passwordValue) {
            throw new Error(`Missing environment variables: ${email} or ${password}`);
        }
    
        await this.fillEmailAddress(emailValue);
        await this.page.waitForTimeout(2000);
        await this.fillPassword(passwordValue);
        await this.page.waitForTimeout(2000);
        await this.clickOnSignInButton();
    }
    
}