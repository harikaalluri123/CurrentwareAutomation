import { LoginPageNew } from "@pages/loginNew/login";
import { expect, test } from "@utils/baseTest";
import { CONSOLE_LOGIN_URL, USER_PASSWORD } from "../../env";

test.describe("Login Flow", () => {
    let loginPage: LoginPageNew;

    test.beforeEach(async ({ page }) => {
        loginPage = new LoginPageNew(page);
    });

    test(
        "[Login005: Verify password is masked when entered]",
        { tag: [ "@login005", "@regression" ] },
        async () => {
            await loginPage.goto(CONSOLE_LOGIN_URL);
            await loginPage.fillPassword(USER_PASSWORD);
            await expect(loginPage.passwordInput).toHaveAttribute("type", "password");
        }
    );
});
