import { Page, Locator } from "@playwright/test";
import { BrowserUtils } from "@utils/browser-utils";
/**
 * Return the element that matches the locator
 * @param itemText The dropdown element visible text
 * @param locatorPrefix Xpath locator prefix
 */

class Dropdown {
  private page: Page;
  private activator: Locator;
  private resultElementLocatorPrefix?: string;
  private selectSearchInput: Locator;

  constructor(
    page: Page,
    activator: Locator,
    options: { resultElementLocatorPrefix?: string } = {}
  ) {
    this.page = page;
    this.activator = activator;
    this.resultElementLocatorPrefix = options.resultElementLocatorPrefix;
    this.selectSearchInput = page.locator(
      "#select2-drop .select2-search input"
    );
  }

  private itemLocatorByText(
    itemText: string,
    locatorPrefix: string = "//div[@class='select2-result-label' and text()="
  ): Locator {
    return this.page.locator(`${locatorPrefix}'${itemText}']`);
  }

  private async itemsWithSelector(selector: string): Promise<string[]> {
    return await this.page.evaluate((value) => {
      return Array.from(document.querySelectorAll(value)).map(
        (elm) => (elm as HTMLElement).innerText
      );
    }, selector);
  }

  private allItems(fetchItems: (value: string) => Promise<string[]>) {
    return async (value: string): Promise<string[]> => {
      await BrowserUtils.click(this.page, this.activator);
      const items = await fetchItems(value);
      await BrowserUtils.click(this.page, this.activator);
      return items;
    };
  }

  /**
   * Select item from drop down
   * @param itemLocator Locator (LocatorByXPath or LocatorBySelector) to locate menu item
   */
  async selectItem(itemLocator: Locator): Promise<void> {
    await BrowserUtils.click(this.page, this.activator, false, {timeout:3000});
    await BrowserUtils.click(this.page, itemLocator, false, {timeout:3000});
  }

  /**
   * Searches for an item in a dropdown and selects it.
   *
   * By default the item is what's used for searching it unless you provide `options.query`
   *
   * @param options Options.
   * @param options.itemText Item to search & select.
   * @param [options.searchText] If provided, this is what's used to search.
   */
  async searchItem({
    itemText,
    searchText,
  }: {
    itemText: string;
    searchText?: string;
  }): Promise<void> {
    searchText = searchText || itemText;
    await BrowserUtils.click(this.page, this.activator);
    await BrowserUtils.fill(this.page, this.selectSearchInput, searchText);
    await BrowserUtils.click(this.page, this.itemLocatorByText(itemText));
  }

  /**
   * Return the list of all searched items
   */

  async getAllSearchItems(searchText: string): Promise<string[]> {
    await BrowserUtils.click(this.page, this.activator);
    await BrowserUtils.fill(this.page, this.selectSearchInput, searchText);
    const listItemsLocator = this.page.locator("ul.select2-results > li");
    const listItemsCount = await listItemsLocator.count();
    // Iterate over each element and extract the text content
    const listItems: string[] = [];
    for (let i = 0; i < listItemsCount; i++) {
      const text = await listItemsLocator.nth(i).textContent();
      listItems.push(text?.trim() || "");
    }
    return listItems;
  }

  /**
   * Selects the item in drop down with the given text. Does nothing if passed value is null.
   * @param itemText Text of the item to select.
   */
  async selectItemByText(itemText?: string): Promise<void> {
    if (itemText) {
      const itemLocator = this.itemLocatorByText(itemText);
      await this.selectItem(itemLocator);
    }
  }

  /**
   * Get all options from drop down menu
   * @param selector Query selector to query DOM
   * @returns items
   */
  async getItemsBySelector(selector: string): Promise<string[]> {
    return this.allItems(this.itemsWithSelector)(selector);
  }
  static async getSelectedValue(
    page: Page,
    dropdown: Dropdown
  ): Promise<string> {
    const selectedElement = dropdown.activator; // or another property that points to a Locator
    return (await selectedElement.textContent()) ?? ""; // Return the text content or empty string if not found
  }
}

export { Dropdown };
