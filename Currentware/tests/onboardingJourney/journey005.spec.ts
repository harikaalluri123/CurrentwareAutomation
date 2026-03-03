import { OnBoardingPage } from "@pages/onboardingJourney/onBoarding";
import { SignUpPage } from "@pages/onboardingJourney/signUp";
import { expect, test } from "@utils/baseTest";

test.describe("Onboarding Journey Test", () => {
    let onBoardingPage: OnBoardingPage;
    let signUpPage: SignUpPage;
    const invalidEmail = "userexample.com";
    const invalidEmail2 = "user@example";

    test.beforeEach(async ({ page }) => {
        onBoardingPage = new OnBoardingPage(page);
        signUpPage = new SignUpPage(page);
    });

    test(
        "[Journey005: Business Email - invalid format validation]",
        { tag: ["@journey005", "@regression"] },
        async () => {
            await signUpPage.goto();
            //Enter an email address without "@" in the Business Email field
            await signUpPage.fillEmail(invalidEmail);
            //click outside the email field
            await signUpPage.page.click('body');
            // expect: "Invalid email format" error should display
            await expect(signUpPage.invalidEmailFormatError).toBeVisible();

            // 4. Clear the field
            await signUpPage.emailInput.clear();

            // 5. Enter an email address without ".com" in the Business Email field
            await signUpPage.fillEmail(invalidEmail2);
            await signUpPage.page.click('body');
            // expect: Verify the error message
            await expect(signUpPage.invalidEmailFormatError).toBeVisible();
        }
    );
});
