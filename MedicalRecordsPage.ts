import { Page, Locator } from "@playwright/test";
import { CommonMethods } from "../tests/commonMethods";
import medicalRecordData from "../Data/medicalRecord.json";

export default class MedicalRecordsPage {
  readonly page: Page;
  public medicalRecord: {
    medicalRecordsLink: Locator;
    mrOutpatientList: Locator;
    okButton: Locator;
    fromDate: Locator;
    searchBar: Locator;
  };

  constructor(page: Page) {
    this.page = page;
    this.medicalRecord = {
      medicalRecordsLink: page.locator("a[href='#/Medical-records']"),
      mrOutpatientList: page.locator("a[href='#/Medical-records/OutpatientList']"),
      okButton: page.locator("button.btn.green.btn-success", { hasText: "OK" }),
      searchBar: page.locator("#quickFilterInput"),
      fromDate: page.locator("#date").first(),
    };
  }

  private toInputDate(ddmmyyyy: string): string {
    const [dd, mm, yyyy] = ddmmyyyy.split("-");
    return `${yyyy}-${mm}-${dd}`;
  }

  /**
   * @Test4 Verify entering a keyword matching existing records returns corresponding data
   */
  async keywordMatching() {
    await CommonMethods.highlightElement(this.medicalRecord.medicalRecordsLink);
    await this.medicalRecord.medicalRecordsLink.click();
    await this.page.waitForTimeout(1500);

    await CommonMethods.highlightElement(this.medicalRecord.mrOutpatientList);
    await this.medicalRecord.mrOutpatientList.click();
    await this.page.waitForTimeout(1500);

    await CommonMethods.highlightElement(this.medicalRecord.fromDate);
    await this.medicalRecord.fromDate.fill(this.toInputDate(medicalRecordData.DateRange.FromDate));

    await CommonMethods.highlightElement(this.medicalRecord.okButton);
    await this.medicalRecord.okButton.click();
    await this.page.waitForTimeout(1500);

    await CommonMethods.highlightElement(this.medicalRecord.searchBar);
    await this.medicalRecord.searchBar.fill(medicalRecordData.PatientGender.Gender);
    await this.page.waitForTimeout(1000);
  }
}