import { LoginPageNew } from "@pages/loginNew/login";
import { expect, test } from "@utils/baseTest";
import { CONSOLE_LOGIN_URL, USER_NAME, USER_PASSWORD } from "../../env";

test.describe("Login Flow", () => {
    let loginPage: LoginPageNew;

    test.beforeEach(async ({ page }) => {
        loginPage = new LoginPageNew(page);
    });

    test(
        "[Login003: Verify Sign In button is disabled when Email or Password is empty]",
        { tag: ["@login003", "@regression"] },
        async () => {
            await loginPage.goto(CONSOLE_LOGIN_URL);

            await loginPage.fillPassword(USER_PASSWORD);
            await expect(loginPage.signInButton).toBeDisabled();

            await loginPage.businessEmailInput.clear();
            await loginPage.fillBusinessEmail(USER_NAME);
            await loginPage.passwordInput.clear();
            await expect(loginPage.signInButton).toBeDisabled();

            await loginPage.businessEmailInput.clear();
            await expect(loginPage.signInButton).toBeDisabled();
        }
    );
});
