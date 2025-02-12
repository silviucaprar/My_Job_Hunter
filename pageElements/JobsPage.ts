import { Page, Locator } from '@playwright/test'

export class JobsPage {

    readonly page: Page;
    readonly roleSearchbox: Locator;
    readonly applyEasyApplyFilter: Locator;
    readonly applyRemoteFilter: Locator;
    readonly cbRemoteOption: Locator;
    readonly btnShowResults: Locator;
    readonly btnEasyApply: Locator;
    readonly jobListings: Locator;
    readonly btnSubmitApplication: Locator;
    readonly btnDone: Locator;
    readonly btnClose: Locator;
    readonly btnDiscard: Locator;

    constructor(page: Page) {
        this.page = page;
        this.roleSearchbox = page.getByRole('combobox', { name: 'Search by title, skill, or' });
        this.applyEasyApplyFilter = page.locator('#searchFilter_applyWithLinkedin');
        this.applyRemoteFilter = page.locator('#searchFilter_workplaceType');
        this.cbRemoteOption = page.locator('[for="workplaceType-2"]');
        this.btnShowResults = page.locator('[aria-label*="Apply current filter"]').nth(3);
        this.btnEasyApply = page.locator('.jobs-apply-button').nth(0);
        this.jobListings = page.locator('.job-card-container--clickable');
        this.btnSubmitApplication = page.getByRole('button', { name: 'Submit application'});
        this.btnDone = page.getByRole('button', { name: 'Done' });
        this.btnClose = page.locator('.artdeco-modal__dismiss');
        this.btnDiscard = page.getByRole('button', { name: 'Discard' });
    }

    async fillRoleSearchbox(role) {
        await this.roleSearchbox.fill(role);
        await this.roleSearchbox.press('Enter');
    }

    async clickOnEasyApplyFilter() {
        await this.applyEasyApplyFilter.click();
    }

    async clickOnRemoteFilter() {
        if(await this.applyRemoteFilter.isVisible()) {
            await this.applyRemoteFilter.click();
            await this.cbRemoteOption.click();
            await this.btnShowResults.click();
        }
    }

    async clickOnEasyApplyButton() {
        await this.btnEasyApply.click();
    }

    async abort_application() {
        await this.btnClose.click();
        await this.btnDiscard.click();
    }

    async applyAllMatchingJobs() {
        let jobIndex = 0;
        let jobCount = await this.jobListings.count();
        let appliedJobs = 0;
    
        while (jobIndex < jobCount) {
            const job = this.jobListings.nth(jobIndex);
    
            await job.scrollIntoViewIfNeeded();
            await job.waitFor({ state: 'visible' });
    
            const jobTitle = await job.locator('strong:visible').textContent();
    
            if (jobTitle && jobTitle.includes("Automat")) {
                console.log(`Found matching job: ${jobTitle}`);
    
                await job.click();
                await this.page.waitForTimeout(2000);
    
                if (await this.btnEasyApply.isVisible()) {
                    await this.btnEasyApply.click();
                    await this.page.waitForTimeout(2000);
    
                    if (await this.btnSubmitApplication.isVisible()) {
                        await this.btnSubmitApplication.click();
                        if (await this.btnDone.isVisible()) {
                            await this.btnDone.click();
                        } else {
                            await this.btnClose.click();
                        }
                        console.log('Application submitted successfully');
                        appliedJobs++;
                    } else {
                        console.log('Submit button not visible, aborting application');
                        await this.abort_application();
                    }
                } else {
                    console.log('Easy Apply button not found, skipping job');
                }
            } else {
                console.log(`Skipping job: ${jobTitle}`);
            }
            jobIndex++;
    
            if (jobIndex >= jobCount) {
                console.log("Checked all jobs on the page. Scrolling down...");
                console.log(`Index: ${jobIndex}`);
                console.log(`JobListings: ${jobCount}`);
                await this.page.mouse.wheel(0, 500);
                await this.page.waitForTimeout(3000);
    
                jobCount = await this.jobListings.count();
            }
        }
        console.log(`Finished applying. Total jobs applied: ${appliedJobs}`);
    }
}