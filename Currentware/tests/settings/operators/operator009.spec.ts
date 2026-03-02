import { OperatorsPage } from "@pages/settings/operators/operators";
import { expect, test } from "@utils/baseTest";
import { LoginPage } from "@pages/login/loginPage";
import { DataUtils } from "@utils/dataUtils";

test.describe("Operators Page Tests - Edit Operator Functionality", () => {
    let operatorUsername1: string;
    let operatorUsername2: string;
    let emailAsUsername: string;
    let password: string;
    let newPassword: string;
    let description: string;
    let operatorPage: OperatorsPage;
    let loginPage: LoginPage;

    test.beforeEach(async ({ page }) => {
        operatorUsername1 = DataUtils.randomName();
        operatorUsername2 = DataUtils.randomName();
        emailAsUsername = `${DataUtils.randomName()}@test.com`;
        password = DataUtils.generatePassword();
        newPassword = DataUtils.generatePassword();
        description = DataUtils.generateName();
        loginPage = new LoginPage(page);
        operatorPage = new OperatorsPage(page);
        await loginPage.loginAsAdmin();
    });

    test.beforeEach("Creating Operators for Edit Tests", async () => {
        await operatorPage.goToSettings();
        await operatorPage.goToOperators();
        // Creating first local operator with user role
        await operatorPage.addLocalOperator(
            operatorUsername1,
            password,
            password,
            description,
            false,
            false
        );
        // Creating second local operator with user role for multiple selection test
        await operatorPage.addLocalOperator(
            operatorUsername2,
            password,
            password,
            description,
            false,
            false
        );
    });

    test(
        "[TC009: Verify Edit Operator Functionality]",
        { tag: ["@TC009", "@regression"] },
        async () => {
            await operatorPage.goToSettings();
            await operatorPage.goToOperators();
            await operatorPage.selectOperator(operatorUsername1);
            // Verify the Edit Operator button is enabled
            await expect(operatorPage.editOperatorButton).toBeEnabled();
            await operatorPage.goToSettings();
            await operatorPage.goToOperators();
            //select multiple operators from the table
            await operatorPage.selectOperator(operatorUsername1);
            await operatorPage.selectOperator(operatorUsername2);
            //Verify the Edit Operator button is disabled
            await expect(operatorPage.editOperatorButton).not.toBeVisible();
            await operatorPage.page.reload();

            //Select Local Operator and click Edit Operator
            await operatorPage.selectOperator(operatorUsername1);
            await operatorPage.clickEditOperatorButton();

            // 9. Enter a valid details and click Cancel
            await operatorPage.editOperatorUsername(emailAsUsername);
            await operatorPage.fillPassword(newPassword);
            await operatorPage.fillConfirmPassword(newPassword);
            await operatorPage.clickCancelEditButton();

            //Verify the operator username was not updated
            await operatorPage.page.reload();
            const isUpdated = await operatorPage.isOperatorPresent(emailAsUsername);
            expect(isUpdated).toBeFalsy();

            //Edit Operator
            await operatorPage.selectOperator(operatorUsername1);
            await operatorPage.clickEditOperatorButton();
            await operatorPage.editOperator(emailAsUsername, newPassword, newPassword, description);

            // Verify the operator username was updated
            await operatorPage.page.reload();
            const isUpdated1 = await operatorPage.isOperatorPresent(emailAsUsername);
            expect(isUpdated1).toBeTruthy();
        }
    );

    test.afterEach("Cleanup Operators", async () => {
        await operatorPage.goToSettings();
        await operatorPage.goToOperators();
        await operatorPage.removeOperator(emailAsUsername);
        await operatorPage.removeOperator(operatorUsername2);
    });
});

