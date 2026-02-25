import { Page, Locator } from '@playwright/test';
import { BrowserUtils } from '@utils/browser-utils';
import Pagination from '@utils/pagination';

export class OperatorsPage {
    readonly page: Page;
    readonly settingsButton: Locator;
    readonly operatorsButton: Locator;
    readonly addOperatorButton: Locator;
    readonly operatorUsername: Locator;
    readonly password: Locator;
    readonly confirmPassword: Locator;
    readonly Description: Locator;
    readonly roleDropdown: Locator;
    readonly addButton: Locator;
    readonly adminRole: Locator;
    readonly twoFactorAuthCheckbox: Locator;
    readonly removeButton: Locator;
    readonly yesButton: Locator;
    readonly operatorRows: Locator;
    readonly deleteErrorMsg: Locator;
    readonly copyOperatorButton: Locator;
    readonly copyOperatorUsername: Locator;
    readonly copyOperatorPassword: Locator;
    readonly copyOperatorConfirmPassword: Locator;
    readonly copyOperatorDescription: Locator;
    readonly addUserOperatorButton: Locator;
    readonly copyDescription: Locator;
    readonly editOperatorButton: Locator;
    readonly updateButton: Locator;
    readonly cancelButton: Locator;
    readonly cancelEditButton: Locator;
    readonly operatorUsernameError: Locator;
    readonly spaceOperatorUsernameError: Locator;
    readonly subscriptionCheckbox: Locator;
    readonly noButton: Locator;
    readonly passwordError: Locator;
    readonly userRole: Locator;
    readonly editPermissionButton: Locator;
    readonly roleSelect: Locator;
    readonly userRoleDefault: Locator;
    readonly paginationNextBtn: Locator;
    readonly paginationPrevBtn: Locator;

    constructor(page: Page) {
        this.page = page;
        this.settingsButton = page.getByRole('link', { name: 'Settings' });
        this.operatorsButton = page.getByText('Operators');
        this.addOperatorButton = page.locator(
            "text=ADD OPERATOR");
        this.operatorUsername = page.locator('mat-form-field input[type="text"]').first();
        this.password = page.locator('input[type="password"]').first();
        this.confirmPassword = page.locator('input[type="password"]').nth(1);
        this.Description = page.locator('input[type="text"]').nth(1);
        this.roleDropdown = page.locator("div.mat-mdc-select-value").nth(1);
        this.addButton = page.getByText('ADD', { exact: true })
        this.adminRole = page.locator('.mdc-list-item__primary-text', { hasText: 'Administrator' });
        this.twoFactorAuthCheckbox = page.getByRole('checkbox', { name: 'Enable Two-Factor Authentication' });
        this.removeButton = page.locator("//span[normalize-space()='REMOVE']");
        this.yesButton = page.locator("//span[normalize-space()='YES']");
        this.operatorRows = page.locator("//td[contains(@class,'cdk-column-OPERATOR_NAME')]");
        this.deleteErrorMsg = this.page.locator('text=cannot be deleted because the user has been logged on');
        this.copyOperatorButton = page.locator("//span[normalize-space()='COPY OPERATOR']");
        this.copyOperatorUsername = page.locator("//input[@placeholder='Enter Operator Username']");
        this.copyOperatorPassword = page.locator("//input[@placeholder='Enter New Password']");
        this.copyOperatorConfirmPassword = page.locator("//input[@placeholder='Enter Confirm Password']");
        this.copyOperatorDescription = page.locator("//input[@placeholder='Enter Description']");
        this.addUserOperatorButton = page.getByText('ADD USER OPERATOR');
        this.copyDescription = page.locator("//input[@placeholder='Enter Description']");
        this.editOperatorButton = page.locator("//span[normalize-space()='EDIT OPERATOR']");
        this.updateButton = page.getByText('UPDATE', { exact: true });
        this.cancelButton = page.getByText('CANCEL', { exact: true });
        this.cancelEditButton = page.getByText('CANCEL EDIT', { exact: true });
        this.operatorUsernameError = page.locator('text=Please enter Operator Username');
        this.passwordError = page.locator('text=Please enter Password');
        this.spaceOperatorUsernameError = page.locator('text=The Operator Username should not contain spaces.');
        this.noButton = page.getByText('NO', { exact: true });
        this.roleSelect = page.locator("mat-select").nth(1);
        this.subscriptionCheckbox = page.getByRole('checkbox', { name: 'Transfer existing dashboard subscriptions to me.' });
        this.userRoleDefault = page.locator('//mat-select//span[normalize-space()="User"]').first();
        this.userRole = page.locator('mat-option:has-text("User")')
        this.editPermissionButton = page.locator('span').filter({ hasText: 'EDIT PERMISSIONS' });
        this.paginationNextBtn = page.getByRole('button', { name: 'Next page' });
        this.paginationPrevBtn = page.getByRole('button', { name: 'Previous page' });

    }

    async goToSettings(): Promise<void> {
        await BrowserUtils.click(this.page, this.settingsButton);
    }

    async goToOperators(): Promise<void> {
        await BrowserUtils.click(this.page, this.operatorsButton);
    }

    async clickAddOperatorButton(): Promise<void> {
        await BrowserUtils.click(this.page, this.addOperatorButton);
    }

    async clickAddButton(): Promise<void> {
        await BrowserUtils.click(this.page, this.addButton);
    }

    async fillOperatorUsername(username: string): Promise<void> {
        await BrowserUtils.fill(this.page, this.operatorUsername, username);
    }

    async fillPassword(password: string): Promise<void> {
        await BrowserUtils.fill(this.page, this.password, password);
    }

    async fillConfirmPassword(confirmPassword: string): Promise<void> {
        await BrowserUtils.fill(this.page, this.confirmPassword, confirmPassword);
    }


    async addLocalOperator(username: string,
        password: string,
        confirmPassword: string,
        description: string,
        adminRole: boolean,
        twoFactorAuth: boolean
    ): Promise<void> {
        await this.clickAddOperatorButton();
        await this.fillOperatorUsername(username);
        await this.fillPassword(password);
        await BrowserUtils.fill(this.page, this.confirmPassword, confirmPassword);
        await BrowserUtils.fill(this.page, this.Description, description);
        if (adminRole) {
            await BrowserUtils.click(this.page, this.roleDropdown);
            await BrowserUtils.click(this.page, this.adminRole);
        }
        await this.setTwoFactorAuthCheckbox(twoFactorAuth);
        await BrowserUtils.click(this.page, this.addButton);
    }

    async removeOperator(username: string, transferSubscription?: boolean): Promise<void> {
        await this.goToSettings();
        await this.goToOperators();
        await this.clickRemove(username);
        if (transferSubscription === true) {
            await this.clickSubscriptionCheckbox();
        }
        await BrowserUtils.click(this.page, this.yesButton);
    }

    async clickRemove(username: string): Promise<void> {
        const operatorLocator = this.page.getByText(username, { exact: true });
        const isVisible = await operatorLocator.isVisible().catch(() => false);
        if (!isVisible) {
            const found = await this.findOperatorInPagination(username);
            if (!found) {
                throw new Error(`Operator "${username}" not found on any page`);
            }
            await operatorLocator.waitFor({ state: 'visible', timeout: 500 });
        }
        await operatorLocator.click();
        await BrowserUtils.click(this.page, this.removeButton);
    }

    async clickNoButton(): Promise<void> {
        await BrowserUtils.click(this.page, this.noButton);
    }

    async clickSubscriptionCheckbox(): Promise<void> {
        await BrowserUtils.click(this.page, this.subscriptionCheckbox);
    }

    async clickCopy(username: string): Promise<void> {
        await this.selectOperator(username);
        await BrowserUtils.click(this.page, this.copyOperatorButton);
    }

    async selectOperator(username: string): Promise<void> {
        const operatorLocator = this.page.getByText(username, { exact: true });
        const isVisible = await operatorLocator.isVisible().catch(() => false);
        if (!isVisible) {
            const found = await this.findOperatorInPagination(username);
            if (!found) {
                throw new Error(`Operator "${username}" not found on any page`);
            }
        }
        await this.page.getByText(username, { exact: true }).click();
    }

    async setTwoFactorAuthCheckbox(enable: boolean) {
        await BrowserUtils.setCheckbox(this.page, this.twoFactorAuthCheckbox, enable);
    }

    async getOperatorByName(operatorName: string): Promise<Locator> {
        //add pagination concept
        const operatorLocator = this.page.getByText(operatorName, { exact: true });
        const isVisible = await operatorLocator.isVisible().catch(() => false);
        if (!isVisible) {
            const found = await this.findOperatorInPagination(operatorName);
            if (!found) {
                return operatorLocator;
            }
            return this.page.getByText(operatorName, { exact: true });
        }
        return operatorLocator;
    }

    async copyOperator(username: string,
        password: string,
        confirmPassword: string,
        description: string,
    ): Promise<void> {
        await BrowserUtils.fill(this.page, this.copyOperatorUsername, username);
        await BrowserUtils.fill(this.page, this.copyOperatorPassword, password);
        await BrowserUtils.fill(this.page, this.copyOperatorConfirmPassword, confirmPassword);
        await BrowserUtils.fill(this.page, this.copyDescription, description);
        await BrowserUtils.click(this.page, this.addUserOperatorButton);
    }

    async editOperator(username: string, password: string, confirmPassword: string, description: string): Promise<void> {
        await BrowserUtils.fill(this.page, this.operatorUsername, username);
        await BrowserUtils.fill(this.page, this.password, password);
        await BrowserUtils.fill(this.page, this.confirmPassword, confirmPassword);
        await BrowserUtils.fill(this.page, this.Description, description);
        await BrowserUtils.click(this.page, this.updateButton);
    }


    async clickEditOperatorButton(): Promise<void> {
        await BrowserUtils.click(this.page, this.editOperatorButton);
    }

    async clickAddUserOperatorButton(): Promise<void> {
        await BrowserUtils.click(this.page, this.addUserOperatorButton);
    }

    async editOperatorUsername(username: string): Promise<void> {
        await BrowserUtils.fill(this.page, this.operatorUsername, username);
    }

    async clickUpdateButton(): Promise<void> {
        await BrowserUtils.click(this.page, this.updateButton);
    }

    async clickCancelEditButton(): Promise<void> {
        await BrowserUtils.click(this.page, this.cancelEditButton);
    }

    async clickRoleDropdown(): Promise<void> {
        await BrowserUtils.click(this.page, this.roleDropdown);
    }

    async selectRole(role: 'admin' | 'user'): Promise<void> {
        await BrowserUtils.click(this.page, this.roleDropdown);
        if (role === 'admin') {
            await BrowserUtils.click(this.page, this.adminRole);
        } else {
            await BrowserUtils.click(this.page, this.userRole);
        }
    }


    async getOperatorPermissions(operatorName: string): Promise<string | null> {
        const operatorLocator = this.page.getByText(operatorName, { exact: true });
        const isVisible = await operatorLocator.isVisible().catch(() => false);
        if (!isVisible) {
            const found = await this.findOperatorInPagination(operatorName);
            if (!found) {
                return null;
            }
        }
        const permissionsText = await this.page.locator(`//tr[td[contains(., "${operatorName}")]]//span`).textContent();
        return permissionsText;
    }

    async getRole(operatorName: string): Promise<string | null> {
        const operatorLocator = this.page.getByText(operatorName, { exact: true });
        const isVisible = await operatorLocator.isVisible().catch(() => false);
        if (!isVisible) {
            const found = await this.findOperatorInPagination(operatorName);
            if (!found) {
                throw new Error(`Operator "${operatorName}" not found on any page`);
            }
        }
        const roleText = await this.page.locator(`//tr[td[contains(., '${operatorName}')]]//span`).textContent();
        return roleText?.trim() || null;
    }

    async findOperatorInPagination(name: string): Promise<boolean> {
        const cell = this.operatorRows.filter({ hasText: name }).first();
        const pagination = new Pagination(this.page, {
            nextButton: this.paginationNextBtn,
            previousButton: this.paginationPrevBtn,
        });
        // First, try to find on current page with short timeout
        try {
            await BrowserUtils.waitForSelector(this.page, cell, { timeout: 2000 });
            return true;
        } catch {
            // Not on current page, navigate to first page and search from there
            await this.navigateToFirstPage();
            await this.page.waitForTimeout(500);
            return await pagination.iterateToFindElement(cell);
        }
    }

    async navigateToFirstPage(): Promise<void> {
        // Keep clicking previous until we're on the first page (Previous button is disabled)
        let isFirstPage = await this.paginationPrevBtn.isDisabled().catch(() => true);
        while (!isFirstPage) {
            const clicked = await this.paginationPrevBtn.click().then(() => true).catch(() => false);
            if (!clicked) {
                break;
            }
            await this.page.waitForTimeout(500);
            isFirstPage = await this.paginationPrevBtn.isDisabled().catch(() => true);
        }
    }

}