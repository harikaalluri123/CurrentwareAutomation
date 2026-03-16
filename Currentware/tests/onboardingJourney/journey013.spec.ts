import { SignUpPage } from "@pages/onboardingJourney/signUp";
import { expect, test } from "@utils/baseTest";

test.describe("Onboarding Journey Test", () => {
    let signUpPage: SignUpPage;

    test.beforeEach(async ({ page }) => {
        signUpPage = new SignUpPage(page);
    });

    test(
        "[Journey013: Verify Phone Country Code and Number Format Update on Country Selection]",
        { tag: ["@journey013", "@regression"] },
        async () => {
            await signUpPage.goto();

            await signUpPage.selectCountry("United States");
            await expect(signUpPage.countrySelectButton).toContainText("+1");
            await expect(signUpPage.phoneNumberInput).toHaveAttribute("placeholder", "(000) 000-0000");

            await signUpPage.selectCountry("United Kingdom");
            await expect(signUpPage.countrySelectButton).toContainText("+44");
            await expect(signUpPage.phoneNumberInput).toHaveAttribute("placeholder", "00000 000000");

            await signUpPage.selectCountry("India");
            await expect(signUpPage.countrySelectButton).toContainText("+91");
            await expect(signUpPage.phoneNumberInput).toHaveAttribute("placeholder", "00000 00000");

            await signUpPage.selectCountry("China");
            await expect(signUpPage.countrySelectButton).toContainText("+86");
            await expect(signUpPage.phoneNumberInput).toHaveAttribute("placeholder", "000 0000 0000");
        }
    );
});
