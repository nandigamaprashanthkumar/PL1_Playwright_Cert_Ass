import { Locator, Page } from "@playwright/test";
import { CommonMethods } from "../tests/commonMethods";
import doctorData from "../Data/doctor.json";

export class DoctorsPage {
  readonly page: Page;
  private doctorsLink: Locator;
  private inpatientDepartmentTab: Locator;
  private searchBar: Locator;
  private orderDropdown: Locator;
  private imagingActionButton: Locator;
  private searchOrderItem: Locator;
  private proceedButton: Locator;
  private signButton: Locator;
  private successMessage: Locator;

  constructor(page: Page) {
    this.page = page;
    this.doctorsLink = page.locator("a[href='#/Doctors']");
    this.inpatientDepartmentTab = page.locator("a[href='#/Doctors/InPatientDepartment']");
    this.searchBar = page.locator("#quickFilterInput");
    this.imagingActionButton = page.locator("a[danphe-grid-action='imaging']").first();
    this.orderDropdown = page.locator("select.form-control").first();
    this.searchOrderItem = page.locator("input[placeholder='search order items']");
    this.proceedButton = page.locator("button", { hasText: "Proceed" });
    this.signButton = page.locator("button.btn-primary", { hasText: "Sign" });
    this.successMessage = page.locator("");
  }

  /**
   * @Test9 Verify Imaging and lab order add successfully
   */
  async performInpatientImagingOrder() {
    await CommonMethods.highlightElement(this.doctorsLink);
    await this.doctorsLink.click();
    await this.page.waitForTimeout(1500);

    await CommonMethods.highlightElement(this.inpatientDepartmentTab);
    await this.inpatientDepartmentTab.click();
    await this.page.waitForTimeout(2000);

    await CommonMethods.highlightElement(this.searchBar);
    await this.searchBar.fill(doctorData.patientName);
    await this.page.waitForTimeout(2000);

    await CommonMethods.highlightElement(this.imagingActionButton);
    await this.imagingActionButton.click();
    await this.page.waitForTimeout(2000);

    await CommonMethods.highlightElement(this.orderDropdown);
    await this.orderDropdown.selectOption(doctorData.Dropdown.Option);
    await this.page.waitForTimeout(1000);

    await CommonMethods.highlightElement(this.searchOrderItem);
    await this.searchOrderItem.fill(doctorData.Dropdown.searchOrderItem);
    await this.page.waitForTimeout(1500);
    await this.page.keyboard.press("Enter");
    await this.page.waitForTimeout(1000);

    await CommonMethods.highlightElement(this.proceedButton);
    await this.proceedButton.click();
    await this.page.waitForTimeout(2000);

    await CommonMethods.highlightElement(this.signButton);
    await this.signButton.click();
    await this.page.waitForTimeout(2000);
  }
}