import { OperatorsPage } from "@pages/settings/operators/operators";
import { expect, test } from "@utils/baseTest";
import { LoginPage } from "@pages/login/loginPage";
import { DataUtils } from "@utils/dataUtils";

test.describe("Operators Page Tests", () => {
  let operatorUsername: string;
  let adminuser: string;
  let copyOperatorUsername: string;
  let password: string;
  let description: string;
  let operatorPage: OperatorsPage;
  let loginPage: LoginPage;

  test.beforeEach(async ({ page }) => {
    operatorUsername = DataUtils.randomName();
    adminuser = DataUtils.randomName();
    copyOperatorUsername = DataUtils.randomName();
    password = DataUtils.generatePassword();
    description = DataUtils.generateName();
    loginPage = new LoginPage(page);
    operatorPage = new OperatorsPage(page);
    await loginPage.loginAsAdmin();
  });

  test.beforeEach("Creating Operator", async () => {
    await operatorPage.goToSettings();
    await operatorPage.goToOperators();
    //creating local operator with user role
    await operatorPage.addLocalOperator(
      operatorUsername,
      password,
      password,
      description,
      false,
      false
    );
    //creating local operator with admin role
    await operatorPage.addLocalOperator(
      adminuser,
      password,
      password,
      description,
      true,
      false
    );
  });

  test(
    "[TC007: Verify Copy Operator Option and Functionality]",
    { tag: ["@TC007", "@regression"] },
    async () => {
      await operatorPage.goToSettings();
      await operatorPage.goToOperators();
      await operatorPage.selectOperator(adminuser);
      //Copy Operator option is disabled for admin operator.
      await expect(operatorPage.copyOperatorButton).toBeDisabled();
      await operatorPage.page.reload();
      //Select the user operator.
      await operatorPage.selectOperator(operatorUsername);
      //Copy Operator option is enabled for user operator.
      await expect(operatorPage.copyOperatorButton).toBeEnabled();
      await operatorPage.page.reload();
      await operatorPage.clickCopy(operatorUsername);
      await operatorPage.copyOperator(
        copyOperatorUsername,
        password,
        password,
        description,
      );
      // const getOperatorNameOnPage = await operatorPage.getOperatorByName(
      //   copyOperatorUsername,
      // );
      // //verifying the operator is deleted successfully
      // await expect(getOperatorNameOnPage).toBeVisible();
      const isCopied = await operatorPage.isOperatorPresent(copyOperatorUsername);
      expect(isCopied).toBeTruthy();
    }

  );

  test.afterEach(async () => {
    await operatorPage.removeOperator(adminuser);
    await operatorPage.removeOperator(operatorUsername);
  });
});