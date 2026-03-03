import { OnBoardingPage } from "@pages/onboardingJourney/onBoarding";
import { expect, test } from "@utils/baseTest";
import { SIGNUP_URL } from "../../env";

test.describe("Onboarding Journey Test", () => {
    let onBoardingPage: OnBoardingPage;

    test.beforeEach(async ({ page }) => {
        onBoardingPage = new OnBoardingPage(page);
    });

    test(
        "[Journey002: Verify user is redirected to onboarding on clicking Start Free Trial]",
        { tag: ["@journey002", "@regression"] },
        async ({ page }) => {
            await onBoardingPage.goto();
            await onBoardingPage.clickStartTrialButton();
            await expect(page).toHaveURL(SIGNUP_URL);
        }
    );
});
