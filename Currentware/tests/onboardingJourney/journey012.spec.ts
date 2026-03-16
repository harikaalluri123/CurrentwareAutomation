import { SignUpPage } from "@pages/onboardingJourney/signUp";
import { expect, test } from "@utils/baseTest";
import { DataUtils } from "@utils/dataUtils";

test.describe("Onboarding Journey Test", () => {
    let signUpPage: SignUpPage;
    const fullName = DataUtils.generateName();
    const businessEmail = DataUtils.randomEmail();
    const companyName = DataUtils.randomAlphaNumericName();
    const phone = DataUtils.randomPhoneNumber(10);
    const orgSize = "51-200 employees";

    test.beforeEach(async ({ page }) => {
        signUpPage = new SignUpPage(page);
    });

    test(
        "[Journey012: Verify navigation to Confirm your email page after clicking Continue with valid data]",
        { tag: ["@journey012", "@regression"] },
        async () => {
            await signUpPage.goto();
            await signUpPage.fillForm(fullName, businessEmail, companyName, phone, "Canada", orgSize);
            await signUpPage.clickContinue();
            await expect(signUpPage.confirmEmailHeading).toBeVisible();
        }
    );
});
