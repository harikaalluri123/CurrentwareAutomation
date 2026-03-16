import { SaasPage } from "@pages/onboardingJourney/saasPage";
import { expect, test } from "@utils/baseTest";
import { SIGNUP_URL } from "../../env";

test.describe("Onboarding Journey Test", () => {
    let saasPage: SaasPage;

    test.beforeEach(async ({ page }) => {
        saasPage = new SaasPage(page);
    });

    test(
        "[Journey002: Verify user is redirected to onboarding on clicking Start Free Trial]",
        { tag: ["@journey002", "@regression"] },
        async ({ page }) => {
            await saasPage.goto();
            await saasPage.clickStartTrialButton();
            await expect(page).toHaveURL(SIGNUP_URL);
        }
    );
});
