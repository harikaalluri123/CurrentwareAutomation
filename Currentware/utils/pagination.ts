import { BrowserUtils } from "@utils/browser-utils";
import { URL } from "url";
import { makeLogger } from "@utils/logger";
import { Locator } from "@playwright/test";

const logger = makeLogger("Pagination");

interface PaginationButtons {
  nextButton: Locator;
  previousButton: Locator;
}

class Pagination {
  private page: any;
  private buttons: PaginationButtons;

  constructor(
    page: any,
    buttons: PaginationButtons = {
      nextButton: page.locator("button[class*=_Next]"),
      previousButton: page.locator("li.previous"),
    }
  ) {
    this.page = page;
    this.buttons = buttons;
  }

  private async clickPaginationButton(
    btnLocator: any,
    dbgMessage: string
  ): Promise<boolean> {
    try {
      // Check if button is disabled before clicking
      const isDisabled = await btnLocator.isDisabled().catch(() => false);
      if (isDisabled) {
        logger.info(dbgMessage);
        return false;
      }

      // For Angular Material pagination, use regular click and wait for table update
      // instead of waiting for full page navigation
      await btnLocator.click();
      
      // Wait a bit for the table to update (Angular Material pagination is async)
      await this.page.waitForTimeout(1000);
      
      return true;
    } catch (_err) {
      logger.info(dbgMessage);
      logger.info(_err);

      return false;
    }
  }

  public async clickNext(): Promise<boolean> {
    return await this.clickPaginationButton(
      this.buttons.nextButton,
      "Can't click 'Next', last page is reached"
    );
  }

  public async clickPrevious(): Promise<boolean> {
    return await this.clickPaginationButton(
      this.buttons.previousButton,
      "Can't click 'Previous', first page is reached"
    );
  }

  public async currentPage(): Promise<number> {
    const url = new URL(window.location.href);
    const pageCount = url.searchParams.get("page");
    return !pageCount ? 1 : parseInt(pageCount, 10);
  }

  public async iterateToFindElement(
    elementLocator: Locator
  ): Promise<any | null> {
    const infiniteFlag = true;

    while (infiniteFlag) {
      try {
        await BrowserUtils.waitForSelector(this.page, elementLocator, { timeout: 5000 });
        return true;
      } catch (_err) {
        if (!(await this.clickNext())) {
          logger.info(
            `Reached last page, searched element '${elementLocator}' is not found `
          );
          logger.info(_err);

          return false;
        }
        // Wait a bit for table to update after pagination click
        await this.page.waitForTimeout(500);
      }
    }
  }

  public async allItemsBySelector(selector: string): Promise<string[]> {
    let items: string[] = [];
    const infiniteFlag = true;
    while (infiniteFlag) {
      const thisPageItems = await this.page.$$eval(
        selector,
        (elms: Element[]) => elms.map((elm) => (elm as HTMLElement).innerText)
      );
      items = items.concat(thisPageItems);
      if (!(await this.clickNext())) {
        logger.info(
          `Reached last page while collecting items using selector: ${selector}`
        );
        return items;
      }
    }
    return [];
  }

  public async isFirstPage(): Promise<boolean> {
    return (await this.currentPage()) === 1;
  }
}

export default Pagination;
