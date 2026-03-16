import { SignUpPage } from "@pages/onboardingJourney/signUp";
import { expect, test } from "@utils/baseTest";

test.describe("Onboarding Journey Test", () => {
    let signUpPage: SignUpPage;
    const invalidEmail = "user@";

    test.beforeEach(async ({ page }) => {
        signUpPage = new SignUpPage(page);
    });

    test(
        "[Journey006: Verify Business Email field validation without Domain]",
        { tag: ["@journey006", "@regression"] },
        async () => {
            // Navigate to signup page
            await signUpPage.goto();

            // Enter an email address without domain
            await signUpPage.fillEmail(invalidEmail);
              //click outside the email field
              await signUpPage.page.click('body');

            // Expect error message
            await expect(signUpPage.invalidEmailFormatError).toBeVisible();
        }
    );
});
