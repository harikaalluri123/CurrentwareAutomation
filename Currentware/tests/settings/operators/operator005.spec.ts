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

  test.beforeEach("Creating Operator", async () => {
    await operatorPage.goToSettings();
    await operatorPage.goToOperators();
    await operatorPage.addLocalOperator(
      operatorUsername,
      password,
      password,
      description,
      true,
      false
    );
    await loginPage.logout();
    await loginPage.reLogin(operatorUsername, password);
  });

  test(
    "TC005: Verify Current Logged-in Operator Cannot Be Deleted",
    { tag: ["@TC005", "@regression"] },
    async () => {
      await operatorPage.goToSettings();
      await operatorPage.goToOperators();
      await operatorPage.clickRemove(operatorUsername);
      //Delete Operators will not be possible for the current logged-in Operator.
      await expect(operatorPage.deleteErrorMsg).toBeVisible();
    }
  );


  test.afterEach("Cleanup Operators", async () => {
    await loginPage.logout();
    await loginPage.loginAsAdmin();
    await operatorPage.goToSettings();
    await operatorPage.goToOperators();
    await operatorPage.removeOperator(operatorUsername);
  });
});