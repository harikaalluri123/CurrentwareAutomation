import { OnBoardingPage } from "@pages/onboardingJourney/onBoarding";
import { SignUpPage } from "@pages/onboardingJourney/signUp";
import { expect, test } from "@utils/baseTest";

test.describe("Onboarding Journey Test", () => {
    let onBoardingPage: OnBoardingPage;
    let signUpPage: SignUpPage;

    test.beforeEach(async ({ page }) => {
        onBoardingPage = new OnBoardingPage(page);
        signUpPage = new SignUpPage(page);
    });

    test(
        "[Journey003: Continue button is disabled when signup form has no data]",
        { tag: ["@journey003", "@regression"] },
        async ({ page }) => {

            await onBoardingPage.goto();
            await onBoardingPage.clickStartTrialButton();

            // 3. Do not enter any data in the signup form; wait for form to load
            await signUpPage.continueButton.waitFor({ state: "visible" });

            // Expect: Continue button is disabled
            await expect(signUpPage.continueButton).toBeDisabled();
        }
    );
});
