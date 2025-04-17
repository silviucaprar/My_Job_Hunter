import { When } from "../../setup/fixtures";

When('LinkedInStoragePage: Save session', async ({ loginPage }) => {
    await loginPage.login();
});