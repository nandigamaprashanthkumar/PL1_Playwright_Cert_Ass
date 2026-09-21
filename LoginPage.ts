import { Locator, Page } from "@playwright/test";
import { CommonMethods } from "../tests/commonMethods";
import loginData from "../Data/login.json";

export class LoginPage {
  readonly page: Page;
  private usernameInput: Locator;
  private passwordInput: Locator;
  private loginButton: Locator;
  private loginErrorMessage: Locator;
  private admin: Locator;
  private logOut: Locator;

  constructor(page: Page) {
    this.page = page;
    this.usernameInput = page.locator("#username_id");
    this.passwordInput = page.locator("#password");
    this.loginButton = page.locator("#login");
    this.loginErrorMessage = page.locator(".alert.alert-danger");
    this.admin = page.locator("a.dropdown-toggle");
    this.logOut = page.getByText("Log Out");
  }

  async performLogin() {
    const username = loginData.ValidLogin.ValidUserName;
    const password = loginData.ValidLogin.ValidPassword;

    await CommonMethods.highlightElement(this.usernameInput);
    await this.usernameInput.fill(username);

    await CommonMethods.highlightElement(this.passwordInput);
    await this.passwordInput.fill(password);

    await CommonMethods.highlightElement(this.loginButton);
    await this.loginButton.click();

    await this.handleCounterPopup();
  }

  async handleCounterPopup() {
    try {
      const closeBtn = this.page.locator("a[title='Cancel']");
      await closeBtn.waitFor({ state: "visible", timeout: 5000 });
      await closeBtn.click();
    } catch {
      // popup didn't appear — carry on
    }
  }

  async performLoginWithInvalidCredentials() {
    const username = loginData.InvalidLogin.InvalidUserName;
    const password = loginData.InvalidLogin.InvalidPassword;

    await CommonMethods.highlightElement(this.usernameInput);
    await this.usernameInput.fill(username);

    await CommonMethods.highlightElement(this.passwordInput);
    await this.passwordInput.fill(password);

    await CommonMethods.highlightElement(this.loginButton);
    await this.loginButton.click();

    const errorText = await this.loginErrorMessage.textContent();
    return errorText?.trim();
  }

  async verifyLogoutFunctionality() {
    await CommonMethods.highlightElement(this.admin);
    await this.admin.click();

    await CommonMethods.highlightElement(this.logOut);
    await this.logOut.click();

    await this.usernameInput.waitFor({ state: "visible" });
  }
}