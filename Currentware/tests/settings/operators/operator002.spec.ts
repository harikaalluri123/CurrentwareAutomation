import { OperatorsPage } from "@pages/settings/operators/operators";
import { expect, test } from "@utils/baseTest";
import { LoginPage } from "@pages/login/loginPage";
import { DataUtils } from "@utils/dataUtils";

test.describe("Operators Page Tests", () => {
  let operatorUsername: string;
  let password: string;
  let description: string;
  let operatorPage: OperatorsPage;
  let loginPage: LoginPage;

  test.beforeEach(async ({ page }) => {
    operatorUsername = DataUtils.randomName();
    password = DataUtils.generatePassword();
    description = DataUtils.generateName();
    loginPage = new LoginPage(page);
    operatorPage = new OperatorsPage(page);
    await loginPage.loginAsAdmin();
  });

  test(
    "[TC002 Verify Add Local Operator Functionality]",
    { tag: ["@TC001", "@regression"] },
    async ({ page }) => {
      await operatorPage.goToSettings();
      await operatorPage.goToOperators();
      await operatorPage.addLocalOperator(
        operatorUsername,
        password,
        password,
        description,
        false,
        false
      );
      await page.reload();
      const isAdded = await operatorPage.isOperatorPresent(operatorUsername);
      expect(isAdded).toBeTruthy();
      await loginPage.logout();
      await loginPage.reLogin(operatorUsername, password);
      //verifying the operator is logged in successfully
      await expect(page).toHaveURL(/.*\/home/);
    }
  );


  test.afterEach(async () => {
    await loginPage.logout();
    await loginPage.loginAsAdmin();
    await operatorPage.goToSettings();
    await operatorPage.goToOperators();
    await operatorPage.removeOperator(operatorUsername);
  });
});