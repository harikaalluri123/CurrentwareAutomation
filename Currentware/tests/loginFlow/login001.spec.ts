import { LoginPageNew } from "@pages/loginNew/login";
import { expect, test } from "@utils/baseTest";
import { CONSOLE_LOGIN_URL, USER_NAME, USER_PASSWORD } from "../../env";

test.describe("Login Flow", () => {
    let loginPage: LoginPageNew;

    test.beforeEach(async ({ page }) => {
        loginPage = new LoginPageNew(page);
    });

    test(
        "[Login001: Verify second time login with valid email and password is successful",
        { tag: ["@login001", "@regression"] },
        async ({ page }) => {
            await loginPage.goto(CONSOLE_LOGIN_URL);
            await loginPage.login(USER_NAME, USER_PASSWORD);
            await expect(page).toHaveURL(/\/tools\/deploy-clients/);          
        }
    );
});
