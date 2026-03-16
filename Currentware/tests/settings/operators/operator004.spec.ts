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
      false,
      false
    );
  });

  test(
    "[TC004: Verify Delete Operator Functionality]",
    { tag: ["@TC004", "@regression"] },
    async () => {
      await operatorPage.goToSettings();
      await operatorPage.goToOperators();
      await operatorPage.removeOperator(operatorUsername);
      await operatorPage.page.reload();
      const isOperatorPresentOnPage = await operatorPage.isOperatorPresent(operatorUsername);
      expect(isOperatorPresentOnPage).toBeFalsy();
    }
  );

});