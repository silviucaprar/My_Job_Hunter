import { When } from "../../setup/fixtures";

When('LoginPage: Save session', async ({ loginPage }) => {
    await loginPage.login();
});