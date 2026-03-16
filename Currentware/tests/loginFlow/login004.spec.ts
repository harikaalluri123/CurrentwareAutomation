import { LeftSidePanel } from "@pages/leftSidePanel";
import { LoginPageNew } from "@pages/loginNew/login";
import { expect, test } from "@utils/baseTest";
import { CONSOLE_LOGIN_URL, USER_NAME, USER_PASSWORD } from "../../env";

test.describe("Login Flow", () => {
    let loginPage: LoginPageNew;
    let leftSidePanel: LeftSidePanel;

    test.beforeEach(async ({ page }) => {
        loginPage = new LoginPageNew(page);
        leftSidePanel = new LeftSidePanel(page);
        await loginPage.goto(CONSOLE_LOGIN_URL);
        await loginPage.login(USER_NAME, USER_PASSWORD);
    });

    test(
        "[Login004: Verify user is redirected back to login page after logout]",
        { tag: ["@login004", "@regression"] },
        async ({ page }) => {
            await leftSidePanel.clickProfileInfo();
            await leftSidePanel.clickSignOut();
            await expect(page).toHaveURL(/\/login/);
        }
    );
});
