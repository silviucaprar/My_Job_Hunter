import { When } from "../../setup/fixtures"

When('JobsPage: Search for {string}', async ({ jobsPage }, role: string) => {
    await jobsPage.fillRoleSearchbox(role);
});

When('JobsPage: Click on the "Easy Apply" and "Remote" filters', async ({ jobsPage }) => {
    await jobsPage.clickOnEasyApplyFilter();
    await jobsPage.clickOnRemoteFilter();
});

When('JobsPage: Click the "Easy Apply" button on every job listing that matches qa automation role', async ({ jobsPage }) => {
    await jobsPage.applyAllMatchingJobs();
});
