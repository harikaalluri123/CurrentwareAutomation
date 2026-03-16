import { SignUpPage } from "@pages/onboardingJourney/signUp";
import { expect, test } from "@utils/baseTest";
import { DataUtils } from "@utils/dataUtils";

test.describe("Onboarding Journey Test", () => {
    let signUpPage: SignUpPage;
    const shortName = DataUtils.randomName(2);
    const businessEmail = DataUtils.randomEmail();
    const companyName = DataUtils.randomAlphaNumericName();
    const phone = DataUtils.randomPhoneNumber(10);
    const orgSize = "51-200 employees";

    test.beforeEach(async ({ page }) => {
        signUpPage = new SignUpPage(page);
    });

    test(
        "[Journey010: Verify Name Field with Minimum Character Limit",
        { tag: ["@journey010", "@regression"] },
        async () => {
            await signUpPage.goto();
            await signUpPage.fillForm(shortName, businessEmail, companyName, phone, "Canada", orgSize);
            await signUpPage.fullNameInput.blur();
            await expect(signUpPage.fullNameMinLengthError).toBeVisible();
        }
    );
});
