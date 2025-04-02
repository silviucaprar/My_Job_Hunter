import { Page, Locator } from "@playwright/test";
import path from "path";

export class LinkedInStoragePage {
    private page: Page;
    private homeActiveLocator: Locator;
    private storagePath: string;

    constructor(page: Page) {
        this.page = page;
        this.homeActiveLocator = this.page.locator('img[alt="Me"]');
        this.storagePath = path.resolve(__dirname, "../../storageState.json");
    }

    async login(): Promise<void> {
        const email = process.env.EMAIL_USER;
        const password = process.env.LINKEDIN_PASS;

        if (!email || !password) {
            throw new Error("Missing EMAIL_USER or LINKEDIN_PASS in environment variables!");
        }

        await this.page.goto("https://www.linkedin.com/login");
        await this.page.fill("#username", email);
        await this.page.fill("#password", password);
        await this.page.click("[type='submit']");
        await this.homeActiveLocator.waitFor({ state: 'visible', timeout: 10000 });

        await this.page.context().storageState({ path: this.storagePath });
    }

    // async loadSession(): Promise<void> {
    //     try {
    //         await this.page.context().setStorageState({ path: this.storagePath });
    //         await this.page.goto("https://www.linkedin.com/feed");
    //     } catch (error) {
    //         console.error("⚠ Session loading error", error);
    //     }
    // }
}