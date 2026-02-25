import { OperatorsPage } from "@pages/settings/operators/operators";
import { expect, test } from "@utils/baseTest";
import { LoginPage } from "@pages/login/loginPage";
import { DataUtils } from "@utils/dataUtils";

test.describe("Operators Page Tests", () => {
    let operatorUsername1: string;
    let operatorUsername2: string;
    let password: string;
    let description: string;
    let operatorPage: OperatorsPage;
    let loginPage: LoginPage;

    test.beforeEach(async ({ page }) => {
        operatorUsername1 = DataUtils.randomName();
        operatorUsername2 = DataUtils.randomName();
        password = DataUtils.generatePassword();
        description = DataUtils.generateName();
        loginPage = new LoginPage(page);
        operatorPage = new OperatorsPage(page);
        await loginPage.loginAsAdmin();
    });

    test.beforeEach("Creating Operator", async () => {
        await operatorPage.goToSettings();
        await operatorPage.goToOperators();
        await operatorPage.addLocalOperator(
            operatorUsername1,
            password,
            password,
            description,
            false,
            false
        );
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
        "[TC006: Verify Delete Operator Confirmation Popup and Dashboard Subscription Behavior]",
        { tag: ["@TC006", "@regression", "@failed"] },
        async () => {
            await operatorPage.page.reload();
            await operatorPage.removeOperator(operatorUsername1, true);
            // const getOperatorNameOnPage = await operatorPage.getOperatorByName(
            //     operatorUsername1,
            // );
            // //verifying the operator is deleted successfully
            // await expect(getOperatorNameOnPage).not.toBeVisible();
            const isDeleted = await operatorPage.isOperatorPresent(operatorUsername1);
            expect(isDeleted).toBeFalsy();
            //Click No on the confirmation popup.
            await operatorPage.clickRemove(operatorUsername2);
            await operatorPage.clickNoButton();
            // const getOperatorNameOnPage2 = await operatorPage.getOperatorByName(
            //     operatorUsername2,
            // );
            // expect(getOperatorNameOnPage2).toBeVisible();
            const isDeleted2 = await operatorPage.isOperatorPresent(operatorUsername2);
            expect(isDeleted2).toBeTruthy();

        }
    );

});