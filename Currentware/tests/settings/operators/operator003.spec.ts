import { OperatorsPage } from "@pages/settings/operators/operators";
import { expect, test } from "@utils/baseTest";
import { LoginPage } from "@pages/login/loginPage";

test.describe("Operators Page Tests - Edit Permission Button Visibility", () => {
    let operatorPage: OperatorsPage;
    let loginPage: LoginPage;

    test.beforeEach(async ({ page }) => {
        loginPage = new LoginPage(page);
        operatorPage = new OperatorsPage(page);
        await loginPage.loginAsAdmin();
    });

    test(
        "[TC003] Validate Roles and Permissions for Add Local Operator",
        { tag: ["@TC003", "@regression"] },
        async ({ page }) => {
            await operatorPage.goToSettings();
            await operatorPage.goToOperators();
            await operatorPage.clickAddOperatorButton();
            // Verify Edit Permission button visibility when role is User
            await expect(operatorPage.editPermissionButton).toBeVisible();
            // Change Role to Administrator
            await operatorPage.selectRole('admin');
            // Verify Edit Permission button visibility when role is Administrator
            await expect(operatorPage.editPermissionButton).not.toBeVisible();
        }
    );

});

