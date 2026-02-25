
import { OperatorsPage } from "@pages/settings/operators/operators";
import { expect, test } from "@utils/baseTest";
import { LoginPage } from "@pages/login/loginPage";
import { DataUtils } from "@utils/dataUtils";

test.describe("Operators Page Tests", () => {
  let operatorUsername: string;
  let operatorUsernameWithSpaces: string;
  let operatorPage: OperatorsPage;
  let loginPage: LoginPage;

  test.beforeEach(async ({ page }) => {
    operatorUsername = DataUtils.randomName();
    operatorUsernameWithSpaces = DataUtils.randomName() + " " + DataUtils.randomName();
    loginPage = new LoginPage(page);
    operatorPage = new OperatorsPage(page);
    await loginPage.loginAsAdmin();
  });

  test(
    "[TC001 Verify Add Local Operator Mandatory Field Validation]",
    { tag: ["@TC001", "@regression"] },
    async ({ page }) => {
      await operatorPage.goToSettings();
      await operatorPage.goToOperators();
      await operatorPage.clickAddOperatorButton();
      await operatorPage.clickAddButton();
      //System displays a validation message indicating Operator Username is required.
      await expect(operatorPage.operatorUsernameError).toBeVisible();
      //Enter spaces in the Operator Username field.
      await operatorPage.fillOperatorUsername(operatorUsernameWithSpaces);
      await operatorPage.clickAddButton();
      //System displays a validation message indicating Should not contain spaces
      await expect(operatorPage.spaceOperatorUsernameError).toBeVisible();
      await operatorPage.fillOperatorUsername(operatorUsername);
      await operatorPage.clickAddButton();
      //System displays a validation message indicating Password is mandatory.
      await expect(operatorPage.passwordError).toBeVisible();
      // default role is set to User.
      await expect(operatorPage.userRoleDefault).toBeVisible();
    }
  );

});