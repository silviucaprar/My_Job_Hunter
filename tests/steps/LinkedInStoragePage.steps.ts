import { When } from "../../setup/fixtures";

When('LinkedInStoragePage: Save session', async ({ linkedinstoragePage }) => {
    await linkedinstoragePage.login();
});

// When('LinkedInStoragePage: Load saved session', async ({ linkedinstoragePage }) => {
//     await linkedinstoragePage.loadSession();
// });
