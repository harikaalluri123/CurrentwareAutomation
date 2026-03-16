import { LoginPageNew } from "@pages/loginNew/login";
import { expect, test } from "@utils/baseTest";
import { CONSOLE_LOGIN_URL, USER_NAME, USER_PASSWORD } from "../../env";
import { DataUtils } from "@utils/dataUtils"; 

test.describe("Login Flow", () => {
    let loginPage: LoginPageNew;
    const invalidPassword = DataUtils.randomName();

    test.beforeEach(async ({ page }) => {
        loginPage = new LoginPageNew(page);
    });

    test(
        "[Login002: Verify login fails when email or password is incorrect]",
        { tag: ["@login002", "@regression"] },
        async ({ page }) => {
            await loginPage.goto(CONSOLE_LOGIN_URL);
            await loginPage.login(USER_NAME, invalidPassword);
            await expect(loginPage.errorMessage).toBeVisible();         
        }
    );
});
