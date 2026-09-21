import { Page, Locator } from "@playwright/test";
import { CommonMethods } from "../tests/commonMethods";
import pharmacyData from "../Data/pharmacy.json";

export default class PharmacyPage {
  readonly page: Page;
  private pharmacyModule: Locator;
  private orderLink: Locator;
  private addNewGoodReceiptButton: Locator;
  private goodReceiptModalTitle: Locator;
  private printReceiptButton: Locator;
  private addNewItemButton: Locator;
  private itemNameField: Locator;
  private batchNoField: Locator;
  private itemQtyField: Locator;
  private rateField: Locator;
  private saveButton: Locator;
  private supplierNameField: Locator;
  private invoiceField: Locator;
  private successMessage: Locator;
  private supplierName: Locator;

  constructor(page: Page) {
    this.page = page;
    this.pharmacyModule = page.locator("a[href='#/Pharmacy']");
    this.orderLink = page.locator("a[href='#/Pharmacy/Order']");
    this.addNewGoodReceiptButton = page.getByText("Add New Good Receipt", { exact: true });
    this.goodReceiptModalTitle = page.locator("");
    this.printReceiptButton = page.locator("#saveGr");
    this.addNewItemButton = page.locator("#btn_AddNew");
    this.itemNameField = page.locator("#txt_ItemName");
    this.batchNoField = page.locator("#txt_BatchNo");
    this.itemQtyField = page.locator("#ItemQTy");
    this.rateField = page.locator("#GRItemPrice");
    this.saveButton = page.locator("#btn_Save");
    this.supplierNameField = page.locator("#SupplierName");
    this.invoiceField = page.locator("#InvoiceId");
    this.successMessage = page.getByText("Goods Receipt is Generated and Saved");
    this.supplierName = page.locator("#SupplierName");
  }

  /**
   * @Test1 Handle Alert on Pharmacy Module
   */
  async handlingAlertOnRadiology() {
    await this.page.goto("https://healthapp.yaksha.com/Home/Index#/Pharmacy/Order");
    await this.page.waitForTimeout(2000);

    await this.addNewGoodReceiptButton.click();
    await this.page.waitForTimeout(1500);

    // Collect alert messages
    const messages: string[] = [];
    this.page.on("dialog", async (dialog) => {
      messages.push(dialog.message());
      await dialog.accept();
    });

    // Click Print Receipt without filling anything
    await this.printReceiptButton.click();
    await this.page.waitForTimeout(2000);
    console.log("Alerts:", messages);
  }

  /**
   * @Test2 Verify to get the validation message when print receipt without filling details
   */
  async verifyPrintReceipt() {
    await this.page.goto("https://healthapp.yaksha.com/Home/Index#/Pharmacy/Order");
    await this.page.waitForTimeout(2000);

    await this.addNewGoodReceiptButton.click();
    await this.page.waitForTimeout(1500);

    await this.addNewItemButton.waitFor({ state: "visible" });
    await this.addNewItemButton.click();
    await this.page.waitForTimeout(1000);

    // Item Name (autocomplete)
    await this.itemNameField.fill(pharmacyData.Fields.ItemName);
    await this.page.waitForTimeout(1500);
    await this.page.keyboard.press("Enter");

    await this.batchNoField.fill(pharmacyData.Fields.BatchNoField);
    await this.itemQtyField.fill(pharmacyData.Fields.ItemQtyField);
    await this.rateField.fill(pharmacyData.Fields.RateField);
    await this.page.locator("#ExpiryDate").fill("2031-09");

    // Save the item modal
    await this.saveButton.click();
    await this.page.waitForTimeout(2000);

    // Close the modal if still open
    const closeX = this.page.locator("a[title='Cancel']");
    if (await closeX.isVisible()) {
      await closeX.click();
    }
    await this.page.waitForTimeout(1000);

    // Supplier + Invoice on the main receipt page
    await this.supplierNameField.fill(pharmacyData.Fields.SupplierNameField);
    await this.page.waitForTimeout(1000);
    await this.page.keyboard.press("Enter");
    await this.invoiceField.fill("777");

    // Print / save receipt
    await this.printReceiptButton.click();
    await this.page.waitForTimeout(2000);
  }
}