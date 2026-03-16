import { SignUpPage } from "@pages/onboardingJourney/signUp";
import { expect, test } from "@utils/baseTest";
import { DataUtils } from "@utils/dataUtils";

test.describe("Onboarding Journey Test", () => {
    let signUpPage: SignUpPage;
    const name = DataUtils.generateName();
    const businessEmail = DataUtils.randomEmail();
    const phoneMoreThan10 = DataUtils.randomPhoneNumber(11);
    const orgSize = "1-10 employees";

    test.beforeEach(async ({ page }) => {
        signUpPage = new SignUpPage(page);
    });

    test(
        "[Journey009:  Verify Phone Number Validation for More Than Allowed Digits]",
        { tag: ["@journey009", "@regression"] },
        async () => {
            await signUpPage.goto();

            await signUpPage.fillFullName(name);
            await signUpPage.fillEmail(businessEmail);
            await signUpPage.selectCountry("India");
            await signUpPage.fillPhoneNumber(phoneMoreThan10);
            await signUpPage.selectOrgSize(orgSize);
            await signUpPage.setTermsAccepted(true);
            await signUpPage.page.waitForTimeout(1000);

            const value = await signUpPage.phoneNumberInput.inputValue();
            expect(value.length).toBe(10);
        }
    );
});
