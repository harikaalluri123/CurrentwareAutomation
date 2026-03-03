import { Page, Locator } from '@playwright/test';
import { BrowserUtils } from '@utils/browser-utils';
import { LandingPageURL } from '../../env';

export class OnBoardingPage {
    readonly page: Page;
    readonly mainContent: Locator;
    readonly contentContainer: Locator;
    readonly landingBadge: Locator;
    readonly landingBadgeDot: Locator;
    readonly badgeText: Locator;
    readonly heroHeading: Locator;
    readonly gradientTextSpans: Locator;
    readonly blackTextSpans: Locator;
    readonly heroSubheading: Locator;
    readonly startTrialButton: Locator;
    readonly bookDemoButton: Locator;
    readonly signInButton: Locator;
    readonly logo: Locator;
    readonly footerCopyright: Locator;

    constructor(page: Page) {
        this.page = page;
        this.mainContent = page.locator('main.cw-content-main');
        this.contentContainer = this.mainContent.locator('.cw-content-container.container');
        this.landingBadge = this.mainContent.locator('.landing-badge');
        this.landingBadgeDot = this.mainContent.locator('.landing-badge-dot');
        this.badgeText = this.mainContent.locator('.landing-badge .cw-red');
        this.heroHeading = this.mainContent.locator('h1.landing-hero-heading');
        this.gradientTextSpans = this.mainContent.locator('.landing-hero-heading .gradient-text');
        this.blackTextSpans = this.mainContent.locator('.landing-hero-heading .cw-black');
        this.heroSubheading = this.mainContent.locator('p.landing-hero-subheading');
        this.startTrialButton = page.locator('[data-testid="start-trial-button"]');
        this.bookDemoButton = page.locator('[data-testid="book-demo-button"]');
        this.signInButton = page.getByRole('button', { name: 'Sign-in' }).or(page.getByRole('link', { name: 'Sign-in' }));
        this.logo = page.locator('a[href*="#"]').filter({ has: page.locator('img') }).first().or(page.locator('.logo, [class*="logo"]').first());
        this.footerCopyright = page.locator('text=© 2026 CurrentWare. All rights reserved.');
    }

    async goto(): Promise<void> {
        await this.page.goto(LandingPageURL);
    }

    async clickStartTrialButton(): Promise<void> {
        await BrowserUtils.click(this.page, this.startTrialButton);
    }

    async clickBookDemoButton(): Promise<void> {
        await BrowserUtils.click(this.page, this.bookDemoButton);
    }

    async clickSignInButton(): Promise<void> {
        await BrowserUtils.click(this.page, this.signInButton);
    }

    async getBadgeText(): Promise<string> {
        return (await this.badgeText.textContent())?.trim() ?? '';
    }

    async getHeroHeadingText(): Promise<string> {
        return (await this.heroHeading.textContent())?.trim() ?? '';
    }

    async getHeroSubheadingText(): Promise<string> {
        return (await this.heroSubheading.textContent())?.trim() ?? '';
    }

    async getFooterCopyrightText(): Promise<string> {
        return (await this.footerCopyright.textContent())?.trim() ?? '';
    }

    async expectLandingPageVisible(): Promise<void> {
        await this.mainContent.waitFor({ state: 'visible' });
        await this.heroHeading.waitFor({ state: 'visible' });
        await this.startTrialButton.waitFor({ state: 'visible' });
    }
}
