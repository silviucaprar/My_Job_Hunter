import { When } from "../../setup/fixtures";

When('LoginPage: Login with valid {string} and {string}', async ({ loginPage }, email: string, password: string) => {
    await loginPage.login(email, password);
});