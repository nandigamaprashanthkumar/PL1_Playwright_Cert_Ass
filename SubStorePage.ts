import { Locator, Page } from "@playwright/test";
import { CommonMethods } from "../tests/commonMethods";

export class SubStorePage {
  readonly page: Page;
  public substore: {
    substoreLink: Locator;
    selectSubstore: Locator;
    inventoryRequisition: Locator;
    inventory: Locator;
  };

  constructor(page: Page) {
    this.page = page;
    this.substore = {
      substoreLink: page.locator("a[href='#/WardSupply']"),
      selectSubstore: page.locator("a.report_list", { hasText: "Accounts" }),
      inventory: page.locator("a[href='#/WardSupply/Inventory']"),
      inventoryRequisition: page.locator("a[href='#/WardSupply/Inventory/InventoryRequisitionList']"),
    };
  }

  /**
   * @Test6 Capture screenshot of Inventory Requisition section
   */
  async captureInventoryRequisitionScreenshot() {
    await CommonMethods.highlightElement(this.substore.substoreLink);
    await this.substore.substoreLink.click();
    await this.page.waitForTimeout(1500);

    await CommonMethods.highlightElement(this.substore.selectSubstore);
    await this.substore.selectSubstore.click();
    await this.page.waitForTimeout(1500);

    await CommonMethods.highlightElement(this.substore.inventory);
    await this.substore.inventory.click();
    await this.page.waitForTimeout(1500);

    await CommonMethods.highlightElement(this.substore.inventoryRequisition);
    await this.substore.inventoryRequisition.click();
    await this.page.waitForTimeout(1500);

    await this.page.screenshot({
      path: "Screenshots/InventoryRequisition.png",
      fullPage: true,
    });
  }
}