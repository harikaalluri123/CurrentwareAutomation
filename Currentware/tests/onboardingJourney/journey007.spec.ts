import { SignUpPage } from "@pages/onboardingJourney/signUp";
import { expect, test } from "@utils/baseTest";
import { DataUtils } from "@utils/dataUtils";

test.describe("Onboarding Journey Test", () => {
    let signUpPage: SignUpPage;
    const name = DataUtils.randomName();
    const emailWithTwoAt = "user@@company.com";
    const phone = DataUtils.randomPhoneNumber();
    const orgSize = "11-50 employees";

    test.beforeEach(async ({ page }) => {
        signUpPage = new SignUpPage(page);
    });

    test(
        "[Journey007: Continue disabled when email has two @ symbols]",
        { tag: ["@journey007", "@regression"] },
        async () => {
            // Navigate to signup page
            await signUpPage.goto();

            // 3. Enter Name in the name field
            await signUpPage.fillFullName(name);

            // 4. Enter a business email address containing two '@' symbols
            await signUpPage.fillEmail(emailWithTwoAt);
            await signUpPage.emailInput.blur();

            // 5. Enter a valid phone number
            await signUpPage.fillPhoneNumber(phone);

            // 6. Select a valid Organization Size
            await signUpPage.selectOrgSize(orgSize);

            // 7. Accept the Terms of Service and Privacy Policy
            await signUpPage.setTermsAccepted(true);

            // Check: continue is disabled and error message
            await expect(signUpPage.continueButton).toBeDisabled();
            await expect(signUpPage.invalidEmailFormatError).toBeVisible();
        }
    );
});
