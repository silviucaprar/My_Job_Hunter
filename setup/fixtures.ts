import { test as base } from 'playwright-bdd';
import { createBdd } from 'playwright-bdd';
import { HomePage } from '../pageElements/HomePage';
import { JobsPage } from '../pageElements/JobsPage';
import { LoginPage } from '../pageElements/LoginPage';

type Fixtures = {
    homePage: HomePage;
    jobsPage: JobsPage;
    loginPage: LoginPage;
    appliedJobs: { count: number }; // Store applied jobs count
};

export const test = base.extend<Fixtures>({
    page: async ({ browser }, use) => {
        const context = await browser.newContext({
            userAgent: 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36',
            permissions: ['geolocation'],
        });

        const page = await context.newPage();

        // Apply stealth techniques safely
        await page.addInitScript(() => {
            Object.defineProperty(navigator, 'webdriver', { get: () => false });

            if ('mediaDevices' in navigator) {
                Object.defineProperty(navigator.mediaDevices, 'enumerateDevices', {
                    get: () => async () => [],
                });
            }

            (window as any).chrome = { runtime: {} };
        });

        await use(page);
        await context.close();
    },
    homePage: async ({ page }, use) => {
        await use(new HomePage(page));
    },
    appliedJobs: async ({}, use) => {
        let count = 0;
        await use({ count });
    },
    jobsPage: async ({ page, appliedJobs }, use) => { 
        await use(new JobsPage(page, appliedJobs));
    },

    loginPage: async ({ page }, use) => {
        await use(new LoginPage(page));
    }
});

export const { Given, When, Then } = createBdd(test);
