import { SignUpPage } from "@pages/onboardingJourney/signUp";
import { expect, test } from "@utils/baseTest";

test.describe("Onboarding Journey Test", () => {
    let signUpPage: SignUpPage;
    const invalidEmailwithoutAt = "userexample.com";
    const invalidEmail2withoutDotCom = "user@example";

    test.beforeEach(async ({ page }) => {
        signUpPage = new SignUpPage(page);
    });

    test(
        '[Journey005: Verify Business Email Field Validation Without "@" and ".com"]',
        { tag: ["@journey005", "@regression"] },
        async () => {
            await signUpPage.goto();
            //Enter an email address without "@" in the Business Email field
            await signUpPage.fillEmail(invalidEmailwithoutAt);
            //click outside the email field
            await signUpPage.page.click('body');
            // expect: "Invalid email format" error should display
            await expect(signUpPage.invalidEmailFormatError).toBeVisible();

            // 4. Clear the field
            await signUpPage.emailInput.clear();

            // 5. Enter an email address without ".com" in the Business Email field
            await signUpPage.fillEmail(invalidEmail2withoutDotCom);
            await signUpPage.page.click('body');
            // expect: Verify the error message
            await expect(signUpPage.invalidEmailFormatError).toBeVisible();
        }
    );
});
