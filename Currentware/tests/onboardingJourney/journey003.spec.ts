import { SaasPage } from "@pages/onboardingJourney/saasPage";
import { SignUpPage } from "@pages/onboardingJourney/signUp";
import { expect, test } from "@utils/baseTest";

test.describe("Onboarding Journey Test", () => {
   
    let signUpPage: SignUpPage;
    let saasPage: SaasPage;
    test.beforeEach(async ({ page }) => {
        saasPage = new SaasPage(page);
        signUpPage = new SignUpPage(page);
    });

    test(
        "[Journey003: Continue button is disabled when mandatory fields are left empty]",
        { tag: ["@journey003", "@regression"] },
        async ({ page }) => {

            await saasPage.goto();
            await saasPage.clickStartTrialButton();

            //Do not enter any data in the signup form; wait for form to load
            await signUpPage.continueButton.waitFor({ state: "visible" });

            //Continue button is disabled
            await expect(signUpPage.continueButton).toBeDisabled();
        }
    );
});
