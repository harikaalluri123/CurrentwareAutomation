import { SignUpPage } from "@pages/onboardingJourney/signUp";
import { expect, test } from "@utils/baseTest";

test.describe("Onboarding Journey Test", () => {
    let signUpPage: SignUpPage;

    test.beforeEach(async ({ page }) => {
        signUpPage = new SignUpPage(page);
    });

    test(
        "[Journey011: Verify Mandatory Fields Validation Message and Red Asterisk Indicator on the Form]",
        { tag: ["@journey011", "@regression"] },
        async () => {
            await signUpPage.goto();

            await expect(signUpPage.allFieldsRequiredText).toContainText("All fields are required");
            await expect(signUpPage.allFieldsRequiredText).toBeVisible();

            await expect(signUpPage.fullNameRequiredLabel).toBeVisible();
            await expect(signUpPage.emailRequiredLabel).toBeVisible();
            await expect(signUpPage.companyNameRequiredLabel).toBeVisible();
            await expect(signUpPage.phoneNumberRequiredLabel).toBeVisible();
            await expect(signUpPage.orgSizeRequiredLabel).toBeVisible();
        }
    );
});
