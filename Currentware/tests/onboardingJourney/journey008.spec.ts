import { SignUpPage } from "@pages/onboardingJourney/signUp";
import { expect, test } from "@utils/baseTest";
import { DataUtils } from "@utils/dataUtils";

test.describe("Onboarding Journey Test", () => {
    let signUpPage: SignUpPage;
    const alphabeticInput = DataUtils.randomName();
    test.beforeEach(async ({ page }) => {
        signUpPage = new SignUpPage(page);
    });

    test(
        "[Journey008: Phone Number field does not accept alphabetic characters]",
        { tag: ["@journey008", "@regression"] },
        async () => {
            // Navigate to signup page (page with Phone Number field)
            await signUpPage.goto();

            // 5. Enter alphabetic characters in the Phone Number field (it won't enter itself - field rejects letters)
            await signUpPage.fillPhoneNumber(alphabeticInput);

            // Field should not contain the letters (numeric-only input)
            const value = await signUpPage.phoneNumberInput.inputValue();
            await signUpPage.page.click('body');
            //Verify Phone Number field does not accept alphabetic characters 
            await expect(signUpPage.phoneNumberInput).toHaveValue("");
        }
    );
});
