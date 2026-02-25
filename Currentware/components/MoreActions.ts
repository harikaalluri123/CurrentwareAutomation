import { Page, Locator } from '@playwright/test';
import { BrowserUtils } from '@utils/browser-utils';

class MoreActions {
  private page: Page;
  private moreActions: Locator;
  private redirect: string[];

  constructor(page: Page) {
    this.page = page;
    this.moreActions = page.locator("a#more-actions");
    this.redirect = ["Create New Sub User", "Assume Account Owner"];
  }

  private async enableMoreActions(): Promise<void> {
    await BrowserUtils.hover(this.page, this.moreActions);
  }

  private actionLocatorByText(text: string): Locator {
    return this.page.locator(`//ul[@class='dropdown-menu']/li/a[text()="${text}"]`);
  }

  async selectAction(actionLocator: Locator): Promise<void> {
    await this.enableMoreActions();
    await BrowserUtils.click(this.page, actionLocator);
  }

  async selectActionByText(optionText: string): Promise<void> {
    await this.enableMoreActions();
    if(this.redirect.includes(optionText)){
      await BrowserUtils.clickAndRedirectToPage(this.page, this.actionLocatorByText(optionText));
    }else{
      await BrowserUtils.click(this.page, this.actionLocatorByText(optionText));
    }
  }

  async actionExists(optionText: string): Promise<boolean> {
    await BrowserUtils.hover(this.page, this.moreActions);

    const option = this.actionLocatorByText(optionText);
    return await BrowserUtils.isVisible(this.page, option);
  }
}

export default MoreActions;