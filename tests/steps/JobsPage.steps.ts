import { When, Then } from "../../setup/fixtures"

When('JobsPage: Search for {string} in {string}', async ({ jobsPage }, role: string, location: string) => {
    await jobsPage.fillRoleSearchbox(role);
    await jobsPage.fillLocationSearchbox(location);
});

When('JobsPage: Click on the "Easy Apply" and "Remote" filters', async ({ jobsPage }) => {
    await jobsPage.clickOnEasyApplyFilter();
    await jobsPage.clickOnRemoteFilter();
    console.log('Filters applied');
});

When('JobsPage: Click the "Easy Apply" button on every job listing that matches qa automation role', async ({ jobsPage }) => {
    await jobsPage.applyAllMatchingJobs();
    console.log('Jobs search done');
});

When('JobsPage: Go to "My Jobs" page', async ({ homePage, jobsPage }) => {
    await homePage.clickOnJobsTab();
    await jobsPage.page.waitForLoadState('domcontentloaded');
    await jobsPage.clickOnMyjobs();
    
});

Then('JobsPage: I should see the exact number of recently applied jobs in My Jobs page', async ({ jobsPage }) => {
    await jobsPage.checkAppliedJobsCount();
    console.log('Applied jobs checked');
});

Then('JobsPage: Send me an email with the title and description of each job I just applied', async ({ jobsPage }) => {
    await jobsPage.sendAppliedJobsEmail();
    console.log('Email sent');
});