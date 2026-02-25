import { OperatorsPage } from "@pages/settings/operators/operators";
import { expect, test } from "@utils/baseTest";
import { LoginPage } from "@pages/login/loginPage";
import { DataUtils } from "@utils/dataUtils";

test.describe("Operators Page Tests - Edit Operator Role", () => {
    let adminOperator: string;
    let userOperator: string;
    let password: string;
    let description: string;
    let operatorPage: OperatorsPage;
    let loginPage: LoginPage;

    test.beforeEach(async ({ page }) => {
        adminOperator = DataUtils.randomName();
        userOperator = DataUtils.randomName();
        password = DataUtils.generatePassword();
        description = DataUtils.generateName();
        loginPage = new LoginPage(page);
        operatorPage = new OperatorsPage(page);
        await loginPage.loginAsAdmin();
    });

    test.beforeEach("Creating Operators for Role Edit Tests", async () => {
        await operatorPage.goToSettings();
        await operatorPage.goToOperators();
        // Creating local operator with Administrator role
        await operatorPage.addLocalOperator(
            adminOperator,
            password,
            password,
            description,
            true,
            false
        );
        // Creating local operator with User role
        await operatorPage.addLocalOperator(
            userOperator,
            password,
            password,
            description,
            false,
            false
        );
    });

    test(
        "[TC010: Verify Edit Local Operator – Role Change Rules]",
        { tag: ["@TC010", "@regression", "@failed"] },
        async () => {
            await operatorPage.goToSettings();
            await operatorPage.goToOperators();
            await operatorPage.selectOperator(adminOperator);
            await operatorPage.clickEditOperatorButton();

            //Change the role from Administrator to User
            await operatorPage.selectRole('user');

            //Click Update
            await operatorPage.clickUpdateButton();

            // Verify the role was changed to User
            await operatorPage.page.reload();
            const updatedRole = await operatorPage.getRole(adminOperator);
            await expect(updatedRole).toBe('No Permissions');

            //Select a user Operator and click Edit Operator
            await operatorPage.selectOperator(userOperator);
            await operatorPage.clickEditOperatorButton();

            //Role change from User to Administrator is not allowed 
            await expect(operatorPage.roleSelect).toBeDisabled();
        }
    );

    test.afterEach("Cleanup Operators", async () => {
        await operatorPage.goToSettings();
        await operatorPage.goToOperators();
        await operatorPage.removeOperator(adminOperator);
        await operatorPage.removeOperator(userOperator);
    });
});

