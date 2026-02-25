import { Page, Locator } from '@playwright/test';
import { BrowserUtils } from '@utils/browser-utils';

export class LoginPage {
    readonly page: Page;
    readonly operatorUsername: Locator;
    readonly addOperatorButton: Locator;
    readonly downIcon: Locator;
    readonly signOutButton: Locator;
    //readonly yesButton: Locator;

    constructor(page: Page) {
        this.page = page;
        this.addOperatorButton = page.locator(
            "text=ADD OPERATOR");
        this.operatorUsername = page.locator('mat-form-field:has-text("Operator Username") input[matinput]');
        this.downIcon = page.locator("//down-icon[@class='pointer']");
        this.signOutButton = page.locator("//li[normalize-space()='Sign Out']");
        //this.yesButton = page.locator("(//span[@class='mat-mdc-button-touch-target'])[2]");
    }

    async loginAsAdmin(): Promise<void> {
        await this.page.goto('https://40.90.236.38:8998/login');
        //wait for the page to load
        await this.page.waitForTimeout(5000);
        await this.page.getByRole('textbox', { name: 'Enter Operator Username' }).click();
        await this.page.getByRole('textbox', { name: 'Enter Operator Username' }).fill('currentware');
        await this.page.getByRole('textbox', { name: 'Enter Password' }).click();
        await this.page.getByRole('textbox', { name: 'Enter Password' }).fill('Currentware1234!');
        await this.page.getByRole('button', { name: 'SIGN IN' }).click();
        await this.page.waitForTimeout(5000);
    }

    async login(username: string, password: string): Promise<void> {
        await this.page.goto('https://40.90.236.38:8998/login');
        await this.page.waitForTimeout(2000);
        await this.page.getByRole('textbox', { name: 'Enter Operator Username' }).fill(username);
        await this.page.getByRole('textbox', { name: 'Enter Password' }).fill(password);
        await this.page.getByRole('button', { name: 'SIGN IN' }).click();
        // Wait for navigation with fallback
        try {
            await this.page.waitForURL('**/home', { waitUntil: 'networkidle', timeout: 30000 });
        } catch {
            // Fallback: wait for URL to contain /home
            await this.page.waitForURL(/\/(home|dashboard)/, { timeout: 30000 }).catch(() => {
                // If URL doesn't change, wait for network idle
                return this.page.waitForLoadState('networkidle', { timeout: 10000 });
            });
        }
    }

    async reLogin(username: string, password: string): Promise<void> {
        await this.page.waitForTimeout(2000);
        await this.page.getByRole('textbox', { name: 'Enter Operator Username' }).fill(username);
        await this.page.getByRole('textbox', { name: 'Enter Password' }).fill(password);
        await this.page.getByRole('button', { name: 'SIGN IN' }).click();
        // Wait for navigation with fallback
        try {
            await this.page.waitForURL('**/home', { waitUntil: 'networkidle', timeout: 30000 });
        } catch {
            // Fallback: wait for URL to contain /home
            await this.page.waitForURL(/\/(home|dashboard)/, { timeout: 30000 }).catch(() => {
                // If URL doesn't change, wait for network idle
                return this.page.waitForLoadState('networkidle', { timeout: 10000 });
            });
        }
    }

    async logout(): Promise<void> {
        // Wait for page to be ready before logout
        await this.page.waitForLoadState('networkidle', { timeout: 5000 }).catch(() => {});
        try {
            await BrowserUtils.hover(this.page, this.downIcon);
            await this.page.waitForTimeout(1000);
            await BrowserUtils.click(this.page, this.signOutButton);
            const dialog = this.page.getByRole('dialog');
            const yesButton = dialog.getByRole('button', { name: 'Yes' });
            await yesButton.click();
            // Wait for logout to complete
            await this.page.waitForURL('**/login', { timeout: 10000 }).catch(() => {
                return this.page.waitForLoadState('networkidle', { timeout: 5000 });
            });
        } catch (error) {
            // If logout fails, wait a bit and continue
            await this.page.waitForTimeout(2000);
        }
    }


}