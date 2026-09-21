import { Page, Locator } from "@playwright/test";
import { CommonMethods } from "../tests/commonMethods";
import maternityData from "../Data/maternity.json";

export default class MaternityPage {
  readonly page: Page;
  public maternityLink: Locator;
  public maternity: {
    reportLink: Locator;
    maternityAllowanceReport: Locator;
    dateFrom: Locator;
    showReportBtn: Locator;
    dataType: Locator;
  };

  constructor(page: Page) {
    this.page = page;
    this.maternityLink = page.locator("a[href='#/Maternity']");
    this.maternity = {
      reportLink: this.page.locator("a[href='#/Maternity/Reports']"),
      maternityAllowanceReport: this.page.locator("div.rpt-link-container", { hasText: "Maternity Allowance" }),
      dateFrom: this.page.locator("#date").first(),
      showReportBtn: this.page.locator("button.btn.green.btn-success", { hasText: "Show Report" }),
      dataType: this.page.locator(""),
    };
  }

  private toInputDate(ddmmyyyy: string): string {
    const [dd, mm, yyyy] = ddmmyyyy.split("-");
    return `${yyyy}-${mm}-${dd}`;
  }

  /**
   * @Test8 Verify Maternity Allowance Report is visible
   */
  public async verifyMaternityAllowanceReport() {
    await CommonMethods.highlightElement(this.maternityLink);
    await this.maternityLink.click();
    await this.page.waitForTimeout(1500);

    await CommonMethods.highlightElement(this.maternity.reportLink);
    await this.maternity.reportLink.click();
    await this.page.waitForTimeout(1500);

    await CommonMethods.highlightElement(this.maternity.maternityAllowanceReport);
    await this.maternity.maternityAllowanceReport.click();
    await this.page.waitForTimeout(1500);

    await CommonMethods.highlightElement(this.maternity.dateFrom);
    await this.maternity.dateFrom.fill(this.toInputDate(maternityData.DateRange.FromDate));

    await CommonMethods.highlightElement(this.maternity.showReportBtn);
    await this.maternity.showReportBtn.click();
    await this.page.waitForTimeout(1500);
  }
}