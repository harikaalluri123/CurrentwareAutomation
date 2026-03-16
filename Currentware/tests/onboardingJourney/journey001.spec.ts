import { SaasPage } from "@pages/onboardingJourney/saasPage";
import { expect, test } from "@utils/baseTest";

test.describe("Onboarding Journey Test", () => {
    let saasPage: SaasPage;

    test.beforeEach(async ({ page }) => {
        saasPage = new SaasPage(page);
    });

    test(
        '[Journey001: Verify user is navigated to Request Demo page on clicking "Book a Demo"]',
        { tag: ["@journey001", "@regression"] },
        async ({ page, context }) => {
            // Open CurrentWare Landing page
            await saasPage.goto();
            const [newPage] = await Promise.all([
                context.waitForEvent("page"),
                saasPage.clickBookDemoButton()
            ]);     
            await newPage.waitForLoadState("domcontentloaded");
            
            await expect(newPage).toHaveURL("https://www.currentware.com/request-demo/");
        }
    );
});
