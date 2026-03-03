import { OnBoardingPage } from "@pages/onboardingJourney/onBoarding";
import { SignUpPage } from "@pages/onboardingJourney/signUp";
import { expect, test } from "@utils/baseTest";

test.describe("Onboarding Journey Test", () => {
    let onBoardingPage: OnBoardingPage;
    let signUpPage: SignUpPage;
    const freeEmail = "user@gmail.com";

    test.beforeEach(async ({ page }) => {
        onBoardingPage = new OnBoardingPage(page);
        signUpPage = new SignUpPage(page);
    });

    test(
        "[Journey004: Business email validation - free/temporary email shows error]",
        { tag: ["@journey004", "@regression"] },
        async ({ page }) => {
            await signUpPage.goto();

            //Enter a free or temporary email in the Business Email field
            await signUpPage.fillEmail(freeEmail);
            await signUpPage.emailInput.blur();

            // Expect: "Please use a business email address" should display
            await expect(signUpPage.businessEmailError).toContainText("Please use a business email address");
        }
    );
});
