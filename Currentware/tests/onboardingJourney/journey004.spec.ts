import { SaasPage } from "@pages/onboardingJourney/saasPage";
import { SignUpPage } from "@pages/onboardingJourney/signUp";
import { expect, test } from "@utils/baseTest";

test.describe("Onboarding Journey Test", () => {
    let saasPage: SaasPage;
    let signUpPage: SignUpPage;
    const freeEmail = "user@gmail.com";

    test.beforeEach(async ({ page }) => {
        saasPage = new SaasPage(page);
        signUpPage = new SignUpPage(page);
    });

    test(
        "[Journey004: Verify registration is blocked for free and temporary email providers]",
        { tag: ["@journey004", "@regression"] },
        async () => {
            await signUpPage.goto();

            //Enter a free or temporary email in the Business Email field
            await signUpPage.fillEmail(freeEmail);
            await signUpPage.emailInput.blur();

            // Expect: "Please use a business email address" should display
            await expect(signUpPage.businessEmailError).toContainText("Please use a business email address");
        }
    );
});
