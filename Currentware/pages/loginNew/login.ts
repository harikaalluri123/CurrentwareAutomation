import { Page, Locator } from '@playwright/test';
import { BrowserUtils } from '@utils/browser-utils';

export class LoginPageNew {
    readonly page: Page;
    readonly loginContainer: Locator;
    readonly companyName: Locator;
    readonly loginTitle: Locator;
    readonly loginSubtitle: Locator;
    readonly businessEmailInput: Locator;
    readonly passwordInput: Locator;
    readonly forgotPasswordLink: Locator;
    readonly passwordToggleButton: Locator;
    readonly signInButton: Locator;
    readonly orSeparator: Locator;
    readonly loginWithSsoButton: Locator;
    readonly helpText: Locator;
    readonly contactHelpdeskLink: Locator;
    readonly errorMessage: Locator;
    readonly logoutButton: Locator;

    constructor(page: Page) {
        this.page = page;
        this.loginContainer = page.locator('.login-container');
        this.companyName = page.locator('.company-name');
        this.loginTitle = page.locator('.login-title');
        this.loginSubtitle = page.locator('.login-subtitle');
        this.businessEmailInput = page.locator('input[formcontrolname="username"]');
        this.passwordInput = page.locator('input[formcontrolname="password"]');
        this.forgotPasswordLink = page.locator('a.forgot-password-link');
        this.passwordToggleButton = page.locator('button.password-toggle');
        this.signInButton = page.locator('button.btn-login-primary[type="submit"]');
        this.orSeparator = page.locator('.or-separator');
        this.loginWithSsoButton = page.locator('button.btn-login-sso');
        this.helpText = page.locator('.help-text');
        this.contactHelpdeskLink = page.locator('a.help-link-anchor[href*="support.currentware.com"]');
        this.errorMessage = page.locator('.alert.alert-danger').filter({ hasText: 'Incorrect username or password' });
        this.logoutButton = page.locator('button.btn-logout');
    }

    async goto(url: string): Promise<void> {
        await this.page.goto(url);
    }

    async fillBusinessEmail(email: string): Promise<void> {
        await BrowserUtils.fill(this.page, this.businessEmailInput, email);
    }

    async fillPassword(password: string): Promise<void> {
        await BrowserUtils.fill(this.page, this.passwordInput, password);
    }

    async clickSignIn(): Promise<void> {
        await BrowserUtils.click(this.page, this.signInButton);
    }

    async clickForgotPassword(): Promise<void> {
        await BrowserUtils.click(this.page, this.forgotPasswordLink);
    }

    async clickPasswordToggle(): Promise<void> {
        await BrowserUtils.click(this.page, this.passwordToggleButton);
    }

    async clickLoginWithSso(): Promise<void> {
        await BrowserUtils.click(this.page, this.loginWithSsoButton);
    }

    async login(email: string, password: string): Promise<boolean> {
        await this.fillBusinessEmail(email);
        await this.fillPassword(password);
        await this.clickSignIn();
        try {
            await BrowserUtils.performActionAndWaitForNavigation(
                this.page,
                async () => await this.clickSignIn()
            );
            return true;
        } catch {
            return false;
        }
    }

    async logout(): Promise<void> {
        await BrowserUtils.click(this.page, this.logoutButton);
    }
}
