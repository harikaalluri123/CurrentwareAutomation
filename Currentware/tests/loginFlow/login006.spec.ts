import { LeftSidePanel } from "@pages/leftSidePanel";
import { LoginPageNew } from "@pages/loginNew/login";
import { expect, test } from "@utils/baseTest";
import { DataUtils } from "@utils/dataUtils";
import { CONSOLE_LOGIN_URL, USER_NAME, USER_PASSWORD } from "../../env";

test.describe("Login Flow", () => {
    let loginPage: LoginPageNew;
    let leftSidePanel: LeftSidePanel;
    const invalidPassword = DataUtils.generatePassword();

    test.beforeEach(async ({ page }) => {
        loginPage = new LoginPageNew(page);
        leftSidePanel = new LeftSidePanel(page);
        await loginPage.goto(CONSOLE_LOGIN_URL);
        await loginPage.login(USER_NAME, invalidPassword);
    });

    test(
        "[Login006: Verify user is redirected back to login page after logout]",
        { tag: [ "@login006", "@regression" ] },
        async ({ page }) => {
            await expect(loginPage.errorMessage).toBeVisible();
            await loginPage.login(USER_NAME, USER_PASSWORD);
            await expect(loginPage.errorMessage).not.toBeVisible();
            await expect(page).toHaveURL(/\/tools\/deploy-clients/);
        }
    );
});
