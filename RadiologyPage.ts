import { Page, Locator } from "@playwright/test";
import { CommonMethods } from "../tests/commonMethods";
import radiologyData from "../Data/radiology.json";

export default class RadiologyPage {
  readonly page: Page;
  private radiologyModule: Locator;
  private listRequestSubModule: Locator;
  private filterDropdown: Locator;
  private fromDate: Locator;
  private toDate: Locator;
  private okButton: Locator;
  private dateRangeDropdown: Locator;
  private last3MonthsOption: Locator;
  private dateCells: Locator;

  constructor(page: Page) {
    this.page = page;
    this.radiologyModule = page.locator("a[href='#/Radiology']");
    this.listRequestSubModule = page.locator("a[href='#/Radiology/ImagingRequisitionList']");
    this.filterDropdown = page.locator("select.cstm-select");
    this.fromDate = page.locator("#date").first();
    this.toDate = page.locator("#date").last();
    this.okButton = page.locator("button.btn.green.btn-success", { hasText: "OK" });
    this.dateRangeDropdown = page.locator("span.icon-range-ddl");
    this.last3MonthsOption = page.locator("ul.dropdown-menu li a", { hasText: "Last 3 Months" });
    this.dateCells = page.locator("table tbody tr td");
  }

  private toInputDate(ddmmyyyy: string): string {
    const [dd, mm, yyyy] = ddmmyyyy.split("-");
    return `${yyyy}-${mm}-${dd}`;
  }

  /**
   * @Test3 Verify data range by selecting "Last 3 Months" option
   */
  async verifyDataWithinLastThreeMonths() {
    await this.page.goto("https://healthapp.yaksha.com/Home/Index#/Radiology/ImagingRequisitionList");
    await this.page.waitForTimeout(2000);

    await CommonMethods.highlightElement(this.dateRangeDropdown);
    await this.dateRangeDropdown.click();
    await this.page.waitForTimeout(500);

    await CommonMethods.highlightElement(this.last3MonthsOption);
    await this.last3MonthsOption.click();

    await CommonMethods.highlightElement(this.okButton);
    await this.okButton.click();
    await this.page.waitForTimeout(1000);
  }

  /**
   * @Test10 Verify filter records by selecting X-RAY from Filter dropdown
   */
  async filterListRequestsByDateAndType() {
    await this.page.goto("https://healthapp.yaksha.com/Home/Index#/Radiology/ImagingRequisitionList");
    await this.page.waitForTimeout(2000);

    await CommonMethods.highlightElement(this.filterDropdown);
    await this.filterDropdown.selectOption({ label: radiologyData.FilterDropdown.Filter });
    await this.page.waitForTimeout(500);

    await CommonMethods.highlightElement(this.fromDate);
    await this.fromDate.fill(this.toInputDate(radiologyData.DateRange.FromDate));

    await CommonMethods.highlightElement(this.toDate);
    await this.toDate.fill(this.toInputDate(radiologyData.DateRange.ToDate));

    await CommonMethods.highlightElement(this.okButton);
    await this.okButton.click();
    await this.page.waitForTimeout(1000);
  }
}