import { OperatorsPage } from "@pages/settings/operators/operators";
import { expect, test } from "@utils/baseTest";
import { LoginPage } from "@pages/login/loginPage";
import { DataUtils } from "@utils/dataUtils";

test.describe("Operators Page Tests - Edit Operator Role", () => {
    let adminOperator = DataUtils.randomName();
    let userOperator = "a-Nprh8";
    let operatorPage: OperatorsPage;
    let loginPage: LoginPage;

    test.beforeEach(async ({ page }) => {
        loginPage = new LoginPage(page);
        operatorPage = new OperatorsPage(page);
        await loginPage.loginAsAdmin();
    });


    test(
        "[TC010: Verify Edit Local Operator – Role Change Rules]",
        { tag: ["@TC010", "@regression"] },
        async () => {
            await operatorPage.goToSettings();
            await operatorPage.goToOperators();
            //Select a user Operator and click Edit Operator
            await operatorPage.selectOperator(userOperator);
            await operatorPage.clickEditOperatorButton();
            //Role change from User to Administrator is not allowed - the entire role dropdown should be disabled
            await expect(operatorPage.roleSelect).toBeDisabled();
        }
    );

});

