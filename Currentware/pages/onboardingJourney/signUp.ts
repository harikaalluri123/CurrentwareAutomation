import { Page, Locator } from '@playwright/test';
import { BrowserUtils } from '@utils/browser-utils';
import { SIGNUP_URL } from '../../env';

export class SignUpPage {
    readonly page: Page;
    readonly heading: Locator;
    readonly subheading: Locator;
    readonly allFieldsRequiredText: Locator;
    readonly fullNameInput: Locator;
    readonly emailInput: Locator;
    readonly companyNameInput: Locator;
    readonly phoneNumberInput: Locator;
    readonly countrySelectButton: Locator;
    readonly orgSizeSelect: Locator;
    readonly termsCheckbox: Locator;
    readonly continueButton: Locator;
    readonly termsOfServiceLink: Locator;
    readonly privacyPolicyLink: Locator;
    readonly cookieDeclineButton: Locator;
    readonly cookieAcceptButton: Locator;
    readonly cookieLearnMoreLink: Locator;
    readonly startFreeTrialButton: Locator;
    readonly allFieldsRequiredMessage: Locator;
    readonly requiredFieldAsterisks: Locator;
    readonly businessEmailError: Locator;
    readonly invalidEmailFormatError: Locator;
    readonly fullNameMinLengthError: Locator;
    readonly fullNameRequiredLabel: Locator;
    readonly emailRequiredLabel: Locator;
    readonly companyNameRequiredLabel: Locator;
    readonly phoneNumberRequiredLabel: Locator;
    readonly orgSizeRequiredLabel: Locator;
    readonly confirmEmailHeading: Locator;
    readonly confirmEmailInstructionText: Locator;
    readonly confirmEmailContinueButton: Locator;
    readonly confirmEmailResendLink: Locator;

    constructor(page: Page) {
        this.page = page;
        this.heading = page.locator('h1.cw-h1');
        this.subheading = page.locator('p.subheading');
        this.allFieldsRequiredText = page.locator('p.label-required.tooltip-req.tooltip-italics');
        this.fullNameInput = page.locator('input[formcontrolname="fullName"]');
        this.emailInput = page.locator('input[formcontrolname="email"]');
        this.companyNameInput = page.locator('input[formcontrolname="companyName"]');
        this.phoneNumberInput = page.locator('input[formcontrolname="phoneNumber"]');
        this.countrySelectButton = page.locator('button.country-select-btn');
        this.orgSizeSelect = page.locator('select[formcontrolname="orgSize"]');
        this.termsCheckbox = page.locator('input#terms[formcontrolname="termsAccepted"]');
        this.continueButton = page.locator('button.btn-cw-primary[type="submit"]');
        this.termsOfServiceLink = page.locator('a.terms-link[href*="terms-of-service"]');
        this.privacyPolicyLink = page.locator('a.terms-link[href*="privacy-policy"]');
        this.cookieDeclineButton = page.getByRole('button', { name: 'Decline' });
        this.cookieAcceptButton = page.getByRole('button', { name: 'I Accept' });
        this.cookieLearnMoreLink = page.locator('text=Learn more');
        this.startFreeTrialButton = page.getByRole('button', { name: /Start Free Trial/i }).or(page.locator('button.btn-cw-primary[type="submit"]'));
        this.allFieldsRequiredMessage = page.locator('p.label-required.tooltip-req.tooltip-italics').or(page.getByText(/All fields are required/i));
        this.requiredFieldAsterisks = page.locator('label').filter({ hasText: '*' })
            .or(page.locator('.mat-form-field-required-marker, [class*="required-marker"], .label-required'));
        this.businessEmailError = page.getByText('Please use a business email address', { exact: false });
        this.invalidEmailFormatError = page.getByText('Invalid email format', { exact: false });
        this.fullNameMinLengthError = page.getByText('Please enter your full name (at least 2 characters)', { exact: false });
        this.fullNameRequiredLabel = page.locator('.label-required').filter({ hasText: 'Your Name' });
        this.emailRequiredLabel = page.locator('.label-required').filter({ hasText: 'Your Email Address' });
        this.companyNameRequiredLabel = page.locator('.label-required').filter({ hasText: 'Company Name' });
        this.phoneNumberRequiredLabel = page.locator('.label-required').filter({ hasText: 'Your Phone Number' });
        this.orgSizeRequiredLabel = page.locator('.label-required').filter({ hasText: 'Your Organization Size' });
        this.confirmEmailHeading = page.getByRole('heading', { name: /Confirm your email/i }).or(page.locator('h1, h2').filter({ hasText: 'Confirm your email' }));
        this.confirmEmailInstructionText = page.getByText(/6-digit verification code/i);
        this.confirmEmailContinueButton = page.getByRole('button', { name: /Continue/i });
        this.confirmEmailResendLink = page.getByText(/Re-send/i);
    }

    async goto(): Promise<void> {
        await this.page.goto(SIGNUP_URL);
    }
    
    async fillFullName(name: string): Promise<void> {
        await BrowserUtils.fill(this.page, this.fullNameInput, name);
    }

    async fillEmail(email: string): Promise<void> {
        await BrowserUtils.fill(this.page, this.emailInput, email);
    }

    async fillCompanyName(companyName: string): Promise<void> {
        await BrowserUtils.fill(this.page, this.companyNameInput, companyName);
    }

    async fillPhoneNumber(phone: string): Promise<void> {
        await BrowserUtils.fill(this.page, this.phoneNumberInput, phone);
    }

    async selectCountry(countryName: string): Promise<void> {
        await BrowserUtils.selectCustomDropdown(
            this.page,
            this.countrySelectButton,
            countryName,
            { optionSelector: "button.country-option" }
        );
    }

    async selectOrgSize(option: string): Promise<void> {
        try {
            await this.orgSizeSelect.selectOption({ label: option });
        } catch {
            await this.orgSizeSelect.selectOption(option);
        }
    }

    async setTermsAccepted(accepted: boolean): Promise<void> {
        await BrowserUtils.setCheckbox(this.page, this.termsCheckbox, accepted);
    }

    async clickContinue(): Promise<void> {
        await BrowserUtils.click(this.page, this.continueButton);
    }

    async acceptCookies(): Promise<void> {
        await BrowserUtils.click(this.page, this.cookieAcceptButton);
    }

    async declineCookies(): Promise<void> {
        await BrowserUtils.click(this.page, this.cookieDeclineButton);
    }

    async fillForm(name: string, email: string, companyName: string, phone: string, country: string, orgSize: string): Promise<void> {
        await this.fillFullName(name);
        await this.fillEmail(email);
        await this.fillCompanyName(companyName);
        await this.fillPhoneNumber(phone);
        await this.selectCountry(country);
        await this.selectOrgSize(orgSize);
        await this.setTermsAccepted(true);
    }

    async expectConfirmEmailPageVisible(): Promise<void> {
        await this.confirmEmailHeading.waitFor({ state: 'visible' });
    }

}
