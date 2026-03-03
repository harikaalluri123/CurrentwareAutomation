import { OnBoardingPage } from "@pages/onboardingJourney/onBoarding";
import { expect, test } from "@utils/baseTest";

test.describe("Onboarding Journey Test", () => {
    let onBoardingPage: OnBoardingPage;

    test.beforeEach(async ({ page }) => {
        onBoardingPage = new OnBoardingPage(page);
    });

    test(
        "[Journey001: Verify user is navigated to Request Demo page on clicking “Book a Demo”]",
        { tag: ["@journey001", "@regression"] },
        async ({ page, context }) => {
            // Open CurrentWare Landing page
            await onBoardingPage.goto();
            const [newPage] = await Promise.all([
                context.waitForEvent("page"),
                onBoardingPage.clickBookDemoButton()
            ]);     
            await newPage.waitForLoadState("domcontentloaded");
            
            await expect(newPage).toHaveURL("https://www.currentware.com/request-demo/");
        }
    );
});
