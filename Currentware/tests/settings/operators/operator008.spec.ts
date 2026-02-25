import { OperatorsPage } from "@pages/settings/operators/operators";
import { expect, test } from "@utils/baseTest";
import { LoginPage } from "@pages/login/loginPage";
import { DataUtils } from "@utils/dataUtils";

test.describe("Operators Page Tests", () => {
  let operatorUsername: string;
  let copyOperatorUsername: string;
  let password: string;
  let description: string;
  let operatorPage: OperatorsPage;
  let loginPage: LoginPage;

  test.beforeEach(async ({ page }) => {
    operatorUsername = DataUtils.randomName();
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
  });

  test(
    "[TC008: Verify Copied Operator Has No Permissions]",
    { tag: ["@TC008", "@regression"] },
    async () => {
      await operatorPage.goToSettings();
      await operatorPage.goToOperators();
      await operatorPage.clickCopy(operatorUsername);
      await operatorPage.copyOperator(
        copyOperatorUsername,
        password,
        password,
        description,
      );
      await operatorPage.goToSettings();
      await operatorPage.goToOperators();
      const operatorPermissions = await operatorPage.getOperatorPermissions(copyOperatorUsername);
      await expect(operatorPermissions).toBe('No Permissions');

    }
  );

  test.afterEach(async () => {
    await operatorPage.removeOperator(operatorUsername);
    await operatorPage.removeOperator(copyOperatorUsername);
  });
});

