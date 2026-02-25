import { Page, Locator, ElementHandle } from "playwright";
import { makeLogger } from "./logger";
import path from "path";

const log = makeLogger("BrowserUtils");

export class BrowserUtils {
  static async check(page: Page, appCheckbox: Locator) {
    const resolvedSelector = await this.resolveSelector(page, appCheckbox);
    resolvedSelector.check();
  }
  // Helper to resolve a selector (string or Locator)
  private static async resolveSelector(
    page: Page,
    selector: string | Locator,
    options: {
      timeout?: number;
      state?: "attached" | "detached" | "visible" | "hidden";
    } = { state: "visible", timeout: 20000 } // default wait for locator 30 seconds
  ): Promise<Locator> {
    const locator =
      typeof selector === "string" ? page.locator(selector) : selector;
    await locator.waitFor(options);
    return locator;
  }

  // Navigate to a URL
  static async goto(
    page: Page,
    url: string,
    options?: {
      timeout?: number;
      waitUntil?: "load" | "domcontentloaded" | "networkidle";
    }
  ): Promise<void> {
    log.info(`Navigating to URL: ${url}`);
    await page.goto(url, options);
    log.info(`Navigation to ${url} completed.`);
  }

  // Click an element
  static async click(
    page: Page,
    selector: string | Locator,
    force = false,
    options: {
      timeout?: number;
      state?: "attached" | "detached" | "visible" | "hidden";
    } = { state: "visible", timeout: 20000 }
  ): Promise<void> {
    log.info(`Clicking on element: ${selector}`);
    const resolvedSelector = await this.resolveSelector(
      page,
      selector,
      options
    );
    await resolvedSelector.click({
      force
    });
    log.info(`Clicked on element: ${selector}`);
  }

  // Click page redirection
  static async clickAndRedirectToPage(
    page: Page,
    selector: string | Locator,
    force = false,
    options: {
      timeout?: number;
      state?: "attached" | "detached" | "visible" | "hidden";
    } = { state: "visible", timeout: 20000 }
  ): Promise<void> {
    log.info(`Clicking on element: ${selector}`);
    const resolvedSelector = await this.resolveSelector(
      page,
      selector,
      options
    );
    await Promise.all([
      resolvedSelector.click({ force }),
      page.waitForNavigation({ waitUntil: "networkidle" , timeout: 20000})
      //await page.waitForLoadState('networkidle')
    ]);

    log.info(`Clicked on element: ${selector}`);
  }

  // Click page redirection
  static async clickAndLoadPage(
    page: Page,
    selector: string | Locator,
    force = false,
    options: {
      timeout?: number;
      state?: "attached" | "detached" | "visible" | "hidden";
    } = { state: "visible", timeout: 20000 }
  ): Promise<void> {
    log.info(`Clicking on element: ${selector}`);
    const resolvedSelector = await this.resolveSelector(
      page,
      selector,
      options
    );
    await Promise.all([
      resolvedSelector.click({ force }),
      page.waitForLoadState("load")
      //await page.waitForLoadState('networkidle')
    ]);

    log.info(`Clicked on element: ${selector}`);
  }

  // Fill an input field
  static async fill(
    page: Page,
    selector: string | Locator,
    text?: string,
    options: {
      timeout?: number;
      state?: "attached" | "detached" | "visible" | "hidden";
    } = { state: "visible", timeout: 20000 }
  ): Promise<void> {
    if (text === undefined) {
      log.info(`No text provided for input field: ${selector}. Skipping fill.`);
      return;
    }
    log.info(`Filling input field: ${selector} with text: "${text}"`);
    const resolvedSelector = await this.resolveSelector(
      page,
      selector,
      options
    );
    await resolvedSelector.fill(text);
    log.info(`Input field: ${selector} filled with text: "${text}"`);
  }

  // Wait for an element to be visible
  static async waitForSelector(
    page: Page,
    selector: string | Locator,
    options: {
      timeout?: number;
      state?: "attached" | "detached" | "visible" | "hidden";
    } = { state: "visible", timeout: 10000 } // // Default wait for selector 10 seconds if an element is visible
  ): Promise<void> {
    log.info(`Waiting for selector: ${selector} to be visible.`);
    await this.resolveSelector(page, selector, options);
    log.info(`Selector: ${selector} is now visible.`);
  }

  // Check if an element is visible
  static async isVisible(
    page: Page,
    selector: string | Locator,
    options: {
      timeout?: number;
      state?: "attached" | "detached" | "visible" | "hidden";
    } = { state: "visible", timeout: 20000 }
  ): Promise<boolean> {
    try {
      await this.resolveSelector(page, selector, options);
      log.info(`Element visibility for selector: ${selector} is visible.`);
      return true;
    } catch (error) {
      log.info(`Element visibility for selector false`);
      log.info(`error ${error}`);
      return false;
    }
  }

  // Take a screenshot
  static async takeScreenshot(page: Page, filePath: string): Promise<void> {
    log.info(`Taking a screenshot and saving to: ${filePath}`);
    await page.screenshot({ path: filePath });
    log.info(`Screenshot saved to: ${filePath}`);
  }

  // Scroll to an element
  static async scrollTo(
    page: Page,
    selector: string | Locator,
    options: {
      timeout?: number;
      state?: "attached" | "detached" | "visible" | "hidden";
    } = { state: "visible", timeout: 20000 }
  ): Promise<void> {
    log.info(`Scrolling to element: ${selector}`);
    const resolvedSelector = await this.resolveSelector(
      page,
      selector,
      options
    );
    await resolvedSelector.scrollIntoViewIfNeeded();
    log.info(`Scrolled to element: ${selector}`);
  }

  // Hover over an element
  static async hover(
    page: Page,
    selector: string | Locator,
    options: {
      timeout?: number;
      state?: "attached" | "detached" | "visible" | "hidden";
    } = { state: "visible", timeout: 20000 }
  ): Promise<void> {
    log.info(`Hovering over element: ${selector}`);
    const resolvedSelector = await this.resolveSelector(
      page,
      selector,
      options
    );
    await resolvedSelector.hover();
    log.info(`Hovered over element: ${selector}`);
  }

  // Select an option from a dropdown
  static async selectOption(
    page: Page,
    selector: string | Locator,
    value: string | undefined,
    options: {
      timeout?: number;
      state?: "attached" | "detached" | "visible" | "hidden";
    } = { state: "visible", timeout: 20000 }
  ): Promise<void> {
    if (value === undefined) {
      log.info(
        `No option selected from dropdown: ${selector}. Skipping selection.`
      );
      return;
    }
    log.info(`Selecting option: "${value}" from dropdown: ${selector}`);
    const resolvedSelector = await this.resolveSelector(
      page,
      selector,
      options
    );
    await resolvedSelector.selectOption(value);
    log.info(`Option: "${value}" selected from dropdown: ${selector}`);
  }

  static async setCheckbox(
    page: Page,
    selector: string | Locator,
    isChecked: boolean | undefined,
    config: {
      skipIfDisabled: boolean;
      force: boolean;
      skipIfInvisible: boolean;
    } = { skipIfDisabled: true, force: true, skipIfInvisible: true },
    options: {
      timeout?: number;
      state?: "attached" | "detached" | "visible" | "hidden";
    } = { state: "visible", timeout: 20000 }
  ): Promise<void> {
    if (isChecked === undefined) {
      log.info(
        `Checkbox: ${selector} is not checked or unchecked. Skipping state change.`
      );
      return;
    }
    log.info(`${isChecked ? "Checking" : "Unchecking"} checkbox: ${selector}`);
    const resolvedSelector = await this.resolveSelector(
      page,
      selector,
      options
    );
    const isCurrentlyChecked = await resolvedSelector.isChecked();
    const isEnabled = await resolvedSelector.isEnabled();

    const { skipIfDisabled, force } = config;
    if (!isEnabled && skipIfDisabled) {
      log.info(`Checkbox: ${selector} is disabled. Skipping state change.`);
      return;
    }

    const isVisible = await resolvedSelector.isVisible();
    if (!isVisible && config.skipIfInvisible) {
      log.info(`Checkbox: ${selector} is not visible. Skipping state change.`);
      return;
    }

    if (isCurrentlyChecked !== isChecked) {
      await resolvedSelector.click({ force });
    }
    log.info(
      `Checkbox: ${selector} is now ${isChecked ? "checked" : "unchecked"}.`
    );
  }

  /**
   * Selects all text in an input field.
   * @param page - The Playwright Page instance.
   * @param selector - The selector for the input field, can be a string or Locator.
   */
  static async selectAll(
    page: Page,
    selector: string | Locator
  ): Promise<void> {
    const elementHandle =
      typeof selector === "string" ? page.locator(selector) : selector;
    log.info(`Selecting all text in field: ${selector}`);

    // Select all text in the input field
    await elementHandle.evaluate((input: HTMLInputElement) => input.select());

    log.info(`All text selected in field: ${selector}`);
  }

  /**
   * Types text sequentially in a given input field after selecting and clearing existing text.
   * @param page - The Playwright Page instance.
   * @param selector - The selector for the input field, can be a string or Locator.
   * @param text - The text to type into the field.
   */
  static async replaceTextSequentially(
    page: Page,
    selector: string | Locator,
    text: string,
    options: {
      timeout?: number;
      state?: "attached" | "detached" | "visible" | "hidden";
    } = { state: "visible", timeout: 20000 }
  ): Promise<void> {
    log.info(`Typing text sequentially into field: ${selector}`);

    // Use the selectAll method to select existing text
    await this.selectAll(page, selector);

    // Type the new text character by character
    // await page.keyboard.type(text);
    const resolvedSelector = await this.resolveSelector(
      page,
      selector,
      options
    );
    await resolvedSelector.pressSequentially(text);

    log.info(`Typed text: "${text}" into field: ${selector}`);
  }

  // Type text with delay
  static async type(
    page: Page,
    selector: string | Locator,
    text: string,
    options: {
      timeout?: number;
      state?: "attached" | "detached" | "visible" | "hidden";
    } = { state: "visible", timeout: 20000 }
  ): Promise<void> {
    log.info(`Typing text: "${text}" into selector: ${selector}`);
    const resolvedSelector = await this.resolveSelector(
      page,
      selector,
      options
    );
    await resolvedSelector.pressSequentially(text);
    log.info(`Typed text: "${text}" into selector: ${selector}`);
  }

  // Type text with delay
  static async typeWithDelay(
    page: Page,
    selector: string | Locator,
    text: string,
    delay: number = 100,
    options: {
      timeout?: number;
      state?: "attached" | "detached" | "visible" | "hidden";
    } = { state: "visible", timeout: 20000 }
  ): Promise<void> {
    log.info(
      `Typing text: "${text}" into selector: ${selector} with delay: ${delay}ms`
    );
    const resolvedSelector = await this.resolveSelector(
      page,
      selector,
      options
    );
    await resolvedSelector.type(text, { delay });
    log.info(`Typed text: "${text}" into selector: ${selector}`);
  }

  // Wait for navigation to complete
  static async waitForNavigation(page: Page): Promise<void> {
    log.info("Waiting for navigation to complete...");
    await page.waitForNavigation({timeout: 10000});
    log.info("Navigation completed.");
  }

  // Get text content of an element
  static async getTextContent(
    page: Page,
    selector: string | Locator,
    options: {
      timeout?: number;
      state?: "attached" | "detached" | "visible" | "hidden";
    } = { state: "visible", timeout: 20000 }
  ): Promise<string> {
    log.info(`Getting text content of selector: ${selector}`);
    const resolvedSelector = await this.resolveSelector(page, selector, options);
    const textContent = await resolvedSelector.textContent();
    log.info(`Text content of selector: ${selector} is "${textContent}"`);
    return textContent || "";
  }
  // Get Is Enabled
  static async isEnabled(
    page: Page,
    selector: string | Locator,
     options: {
      timeout?: number;
      state?: "attached" | "detached" | "visible" | "hidden";
    } = { state: "visible", timeout: 10000 }
  ): Promise<boolean> {
    log.info(`Getting text content of selector: ${selector}`);
    const resolvedSelector = await this.resolveSelector(page, selector, options);
    return await resolvedSelector.isEnabled();
  }

  // Close the current page
  static async closePage(page: Page): Promise<void> {
    log.info("Closing the current page...");
    await page.close();
    log.info("Current page closed.");
  }

  /**
   * Performs an action and waits for navigation to complete.
   * @param page - The Page instance to interact with.
   * @param action - A function that performs an action, such as clicking a button.
   * @param waitUntil - Navigation wait condition. Defaults to 'networkidle'.
   */
  static async performActionAndWaitForNavigation(
    page: Page,
    action: () => Promise<void>,
    waitUntil: "load" | "domcontentloaded" | "networkidle" = "networkidle"
  ): Promise<void> {
    await Promise.all([
      action(),
      page.waitForNavigation({ waitUntil, timeout:60000 })
      //page.waitForLoadState(waitUntil), // Wait for network to be idle
    ]);
  }

  /**
   * Uploads a file to the specified file input element.
   * @param page - The Playwright Page instance.
   * @param selector - The selector for the file input (can be a string or a Locator).
   * @param filePath - The path to the file to be uploaded.
   */
  static async uploadFile(
    page: Page,
    selector: string | Locator,
    filePath: string
  ): Promise<void> {
    const locator =
      typeof selector === "string" ? page.locator(selector) : selector;

    log.info(`Uploading file: ${filePath} to selector: ${selector}`);
    const fullFilePath = path.resolve(__dirname, filePath);

    await locator.setInputFiles(fullFilePath);
    log.info(`File uploaded successfully to selector: ${selector}`);
  }

  /**
   * Get the count of elements matching the provided selector or Locator.
   * @param page - The Page instance to interact with.
   * @param selectorOrLocator - Selector string or Locator instance for the elements.
   * @returns The count of matching elements.
   */
  static async getElementCount(
    page: Page,
    selectorOrLocator: string | Locator,
    options: {
      timeout?: number;
      state?: "attached" | "detached" | "visible" | "hidden";
    } = { state: "visible", timeout: 20000 }
  ): Promise<number> {
    log.info(`Getting count of elements for: ${selectorOrLocator}`);
    const resolvedSelector = await this.resolveSelector(
      page,
      selectorOrLocator,
      options
    );
    const count = await resolvedSelector.count();
    log.info(`Element count for ${selectorOrLocator}: ${count}`);
    return count;
  }

  static async getInputText(
    page: Page,
    locator: Locator,
    options: {
      timeout?: number;
      state?: "attached" | "detached" | "visible" | "hidden";
    } = { state: "visible", timeout: 20000 }
  ): Promise<string> {
    const resolvedSelector = await this.resolveSelector(page, locator, options);
    return await resolvedSelector.inputValue();
  }

  static async elementGetText(
    page: Page,
    locator: Locator,
    options: {
      timeout?: number;
      state?: "attached" | "detached" | "visible" | "hidden";
    } = { state: "visible", timeout: 20000 }
  ): Promise<string> {
    const resolvedSelector = await this.resolveSelector(page, locator, options);
    return await resolvedSelector.innerText();
  }

  static async elementGetInputValue(
    page: Page,
    locator: Locator,
    options: {
      timeout?: number;
      state?: "attached" | "detached" | "visible" | "hidden";
    } = { state: "visible", timeout: 20000 }
  ): Promise<string> {
    const resolvedSelector = await this.resolveSelector(page, locator, options);
    return await resolvedSelector.inputValue();
  }

  static async elementsGetText(
    page: Page,
    locator: Locator
  ): Promise<string[]> {
    const elements: ElementHandle[] = await locator.elementHandles();

    const res: string[] = [];
    for (const element of elements) {
      const text = await page.evaluate(
        (el: Node) => (el as HTMLElement).innerText,
        element
      );
      res.push(text);
    }

    return res;
  }

  static async getRadioButtonValue(
    page: Page,
    radioLocator: Locator
  ): Promise<any> {
    const radioChecked = await page.$(
      '[name="policy[preferred_auth_state_machine]"]:checked'
    );
    let value = "0";

    if (radioChecked) {
      value = await page.evaluate(
        el => (el as HTMLInputElement).value,
        radioChecked
      );
      console.log("Selected Value:", value);
    } else {
      console.log("No radio button selected");
    }

    return value;
  }

  static async getHeaderContents(page: Page): Promise<string[]> {
    const headers = await page.locator("thead th").allTextContents();
    return headers;
  }

  static async isChecked(
    page: Page,
    chBoxLocator: Locator,
    options: {
      timeout?: number;
      state?: "attached" | "detached" | "visible" | "hidden";
    } = { state: "visible", timeout: 20000 }
  ): Promise<any> {
    const chBox = await this.resolveSelector(page, chBoxLocator, options);
    return await chBox.isChecked();
  }

  static async editGetText(page: Page, locator: Locator): Promise<any> {
    const textBox = await locator.elementHandle();
    if (textBox) {
      return await page.evaluate(el => (el as HTMLInputElement).value, textBox);
    } else {
      throw new Error("Textbox not found");
    }
  }

  static async isTableRowsSorted(locator: Locator): Promise<boolean> {
    // Locate all role names from the table
    const roleElements = await locator.allTextContents();

    // Trim and clean role names
    const roles = roleElements.map(role => role.trim());

    // Create a sorted copy
    const sortedRoles = [...roles].sort((a, b) => a.localeCompare(b));

    // Compare original with sorted list
    const isSorted = JSON.stringify(roles) === JSON.stringify(sortedRoles);

    if (isSorted) {
      console.log("Roles are sorted alphabetically.");
    } else {
      console.log("Roles are NOT sorted alphabetically.");
      console.log("Original Order:", roles);
      console.log("Sorted Order:", sortedRoles);
    }

    return isSorted;
  }
  // Check if an element is editable
  static async isEditable(
    page: Page,
    selector: string | Locator,
    options: {
      timeout?: number;
      state?: "attached" | "detached" | "visible" | "hidden";
    } = { state: "visible", timeout: 20000 }
  ): Promise<boolean> {
    const resolvedSelector = await this.resolveSelector(
      page,
      selector,
      options
    );

    // Check if the element is a "contenteditable" element (for divs, spans, or other elements)
    const isContentEditable = await resolvedSelector.evaluate(
      (el: HTMLElement) => el.isContentEditable
    );
    if (isContentEditable) {
      log.info(`Element with selector: ${selector} is contenteditable.`);
      return true; // If the element is contenteditable, it's editable
    }

    // If the element is not input, textarea, or contenteditable, it is not editable
    log.info(`Element with selector: ${selector} is not editable.`);
    return false; // Return false as the element is not directly editable
  }

  static getLocatorByText(page: Page, text: string) {
    return page.locator(`text=${text}`);
  }

  static async isTextPresent(page: Page, text: string): Promise<boolean> {
    const pageText = await page.textContent("body");
    return pageText?.includes(text) || false;
  }

  static async decodeHtmlString(str: string) {
    return str
      .replace(/&amp;/g, "&")
      .replace(/&lt;/g, "<")
      .replace(/&gt;/g, ">")
      .replace(/&#x3D;/g, "=");
  }

  static async press(
    page: Page,
    selector: string | Locator,
    key: string,
    options: {
      timeout?: number;
      state?: "attached" | "detached" | "visible" | "hidden";
    } = { state: "visible", timeout: 20000 }
  ): Promise<void> {
    log.info(`Pressing selector: ${selector} with key: "${key}"`);
    const resolvedSelector = await this.resolveSelector(
      page,
      selector,
      options
    );
    await resolvedSelector.press(key);
    log.info(`Selector: ${selector} pressed with key: "${key}"`);
  }
}
