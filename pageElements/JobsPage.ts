import { Page, Locator, expect } from '@playwright/test';
import dotenv from 'dotenv';
// import nodemailer from 'nodemailer';

dotenv.config();

export class JobsPage {
    readonly page: Page;
    readonly appliedJobs: { count: number };
    readonly roleSearchbox: Locator;
    readonly locationSearchbox: Locator;
    readonly applyEasyApplyFilter: Locator;
    readonly applyRemoteFilter: Locator;
    readonly cbRemoteOption: Locator;
    readonly cbHybridOption: Locator;
    readonly btnShowResults: Locator;
    readonly btnEasyApply: Locator;
    readonly jobListings: Locator;
    readonly btnSubmitApplication: Locator;
    readonly btnDone: Locator;
    readonly btnClose: Locator;
    readonly btnNextStep: Locator;
    readonly btnUploadResume: Locator;
    readonly inputAdditionalQuestion1: Locator;
    readonly inputAdditionalQuestion2: Locator;
    readonly btnReview: Locator;
    readonly btnDiscard: Locator;
    readonly lnkMyjobs: Locator;

    constructor(page: Page, appliedJobs: { count: number }) {
        this.page = page;
        this.appliedJobs = appliedJobs;
        this.roleSearchbox = page.getByRole('combobox', { name: 'Search by title, skill, or' });
        this.locationSearchbox = page.getByRole('combobox', { name: 'City, state, or zip code' });
        this.applyEasyApplyFilter = page.locator('#searchFilter_applyWithLinkedin');
        this.applyRemoteFilter = page.locator('#searchFilter_workplaceType');
        this.cbRemoteOption = page.locator('[for="workplaceType-2"]');
        this.cbHybridOption = page.locator('[for="workplaceType-3"]');
        this.btnShowResults = page.getByRole('button', { name: 'results' });
        this.btnEasyApply = page.locator('.jobs-apply-button').nth(0);
        this.jobListings = page.locator('.job-card-container--clickable');
        this.btnSubmitApplication = page.getByRole('button', { name: 'Submit application' });
        this.btnDone = page.getByRole('button', { name: 'Done' });
        this.btnClose = page.locator('.artdeco-modal__dismiss');
        this.btnNextStep = page.locator('[aria-label="Continue to next step"]');
        this.btnUploadResume = page.getByRole('button', { name: 'Upload resume'});
        this.inputAdditionalQuestion1 = page.locator('.artdeco-text-input--label').nth(0);
        this.inputAdditionalQuestion2 = page.locator('.artdeco-text-input--label').nth(1);
        this.btnReview = page.locator('[aria-label="Review your application"]');
        this.btnDiscard = page.getByRole('button', { name: 'Discard' });
        this.lnkMyjobs = page.getByRole('link', { name: "My jobs" });
    }

    async fillRoleSearchbox(role: string): Promise<void> {
        await this.roleSearchbox.fill(role);
        await this.roleSearchbox.press('Enter');
    }

    async fillLocationSearchbox(location: string): Promise<void> {
        await this.locationSearchbox.fill(location);
        await this.locationSearchbox.press('Enter');
    }

    async clickOnEasyApplyFilter(): Promise<void> {
        await this.applyEasyApplyFilter.click();
        await this.page.waitForTimeout(1000);
    }

    async clickOnRemoteFilter(): Promise<void> {
        await this.applyRemoteFilter.click();
        await this.page.waitForTimeout(1000);
        await this.cbRemoteOption.click();
        await this.page.waitForTimeout(1000);
        await this.cbHybridOption.click();
        await this.page.waitForTimeout(1000);
        await this.btnShowResults.click();
    }

    async clickOnEasyApplyButton(): Promise<void> {
        await this.btnEasyApply.click();
    }

    async abortApplication(): Promise<void> {  
        await this.btnClose.click();
        await this.btnDiscard.click();
    }

    async submitApplication() {
        await this.btnSubmitApplication.click();
        if (await this.btnDone.isVisible()) {
            await this.btnDone.click();
        } else {
            await this.btnClose.click();
        }
    }

    async reviewAndSubmit() {
        await this.btnReview.click();
        await this.page.waitForTimeout(1000);
        await this.submitApplication();
    }

    async applyAllMatchingJobs(): Promise<void> {
        let jobIndex = 0;
        let jobCount = await this.jobListings.count();
        this.appliedJobs.count = 0;
    
        while (jobIndex < jobCount) {
            const job = this.jobListings.nth(jobIndex);
    
            await job.scrollIntoViewIfNeeded();
            await job.waitFor({ state: 'attached' });
    
            const jobTitle = await job.locator('strong:visible').nth(0).textContent();
    
            if (jobTitle && /automat/i.test(jobTitle)) {
                console.log(`Found matching job: ${jobTitle}`);
    
                await job.click();
                await this.page.waitForTimeout(1000); // Allow UI to load
    
                if (await this.btnEasyApply.isVisible()) {
                    await this.btnEasyApply.click();
                    await this.page.waitForTimeout(1000);
    
                    if (await this.btnSubmitApplication.isVisible()) {
                        await this.submitApplication();
                        console.log('Application submitted successfully');
                        this.appliedJobs.count++;
                    } else {
                        console.log('Submit button not visible, aborting application');
                        await this.abortApplication();
                    }
                } else {
                    console.log('Easy Apply button not found, skipping job');
                }
            } else {
                console.log(`Skipping job: ${jobTitle}`);
            }
    
            jobIndex++;
    
            // If all jobs checked, try loading more
            if (jobIndex >= jobCount) {
                console.log("Checked all jobs on the page. Scrolling down...");
                
                await this.page.evaluate(() => {
                    window.scrollBy(0, window.innerHeight);
                });
    
                await this.page.waitForTimeout(3000); // Allow jobs to load
    
                let newJobCount = await this.jobListings.count();
                let retryCount = 0;
    
                // Wait until new jobs are detected (to avoid skipping)
                while (newJobCount === jobCount && retryCount < 5) {
                    console.log("Waiting for new jobs to load...");
                    await this.page.waitForTimeout(2000);
                    newJobCount = await this.jobListings.count();
                    retryCount++;
                }
    
                if (newJobCount > jobCount) {
                    console.log(`Loaded ${newJobCount - jobCount} new jobs.`);
                } else {
                    console.log("No more jobs loaded, might be the last page.");
                    break; // Exit loop if no new jobs appear
                }
    
                jobCount = newJobCount; // Update job count after scroll
            }
        }
    
        console.log(`Finished applying. Total jobs applied: ${this.appliedJobs.count}`);
    }
    
    

    async clickOnMyjobs() {
        await this.lnkMyjobs.click();
        await this.page.waitForTimeout(3000);
    }

    async checkAppliedJobsCount(): Promise<void> {
    // Locate all job cards in the "Applied Jobs" section
    const jobCards = await this.page.getByRole('listitem'); // ✅ Get all job listings

    // Count how many job cards contain the text "Applied Now"
    let appliedNowCount = 0;
    for (const job of await jobCards.all()) {
        if (await job.getByText("Applied Now").isVisible()) {
            appliedNowCount++;
        }
    }

    console.log(`Applied now count: ${appliedNowCount}, Expected: ${this.appliedJobs.count}`);

    expect(appliedNowCount).toBe(this.appliedJobs.count);
    };

    async sendAppliedJobsEmail(): Promise<void> {
        const jobCards = await this.page.getByRole('listitem');
        const appliedJobsDetails: { title: string; link: string }[] = [];
    
        for (const job of await jobCards.all()) {
            
          if (await job.getByText("Applied Now").isVisible()) {
            const jobLinkLocator = job.getByRole('link').nth(0);
            const jobTitle = await jobLinkLocator.textContent();
            const jobLink = await jobLinkLocator.getAttribute('href');
    
            appliedJobsDetails.push({
              title: jobTitle?.trim() || 'No Title',
              link: jobLink || 'No Link',
            });
          }
        }
    
        await this.sendEmail(appliedJobsDetails);
    }
    
    private async sendEmail(appliedJobsDetails: { title: string; link: string }[]): Promise<void> {
        const nodemailer = require('nodemailer');
        const transporter = nodemailer.createTransport({
          service: 'gmail',
          auth: {
            user: process.env.EMAIL_USER,
            pass: process.env.EMAIL_PASS,
          },
        });
    
        const emailContent = appliedJobsDetails
          .map(
            (job) => `
            <h3>${job.title}</h3>
            <p><a href="${job.link}">${job.link}</a></p>
            <hr/>
          `
          )
          .join('');
    
        const mailOptions = {
          from: process.env.EMAIL_USER,
          to: process.env.EMAIL_USER,
          subject: 'Applied Jobs Details',
          html: emailContent,
        };
    
        try {
          await transporter.sendMail(mailOptions);
          console.log('Applied jobs details email sent successfully.');
        } catch (error) {
          console.error('Error sending applied jobs details email:', error);
        }
    }
}
