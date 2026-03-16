import { Page, Locator } from '@playwright/test';
import { BrowserUtils } from '@utils/browser-utils';
import { saasPageURL } from '../../env';

export class SaasPage {
    readonly page: Page;
    readonly startTrialButton: Locator;
    readonly bookDemoButton: Locator;

    constructor(page: Page) {
        this.page = page;
        this.startTrialButton = page.locator('[data-testid="start-trial-button"]');
        this.bookDemoButton = page.locator('[data-testid="book-demo-button"]');
    }

    async goto(): Promise<void> {
        await this.page.goto(saasPageURL);
    }

    async clickStartTrialButton(): Promise<void> {
        await BrowserUtils.click(this.page, this.startTrialButton);
    }

    async clickBookDemoButton(): Promise<void> {
        await BrowserUtils.click(this.page, this.bookDemoButton);
    }
}

