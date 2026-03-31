import { type Page, type Locator, expect } from '@playwright/test';

export class BasePage {
  readonly page: Page;

  constructor(page: Page) {
    this.page = page;
  }

  async navigate(path: string = '/'): Promise<void> {
    // domcontentloaded es más confiable que networkidle en SPAs como OrangeHRM
    await this.page.goto(path, { waitUntil: 'domcontentloaded' });
  }

  async clickWhenReady(locator: Locator): Promise<void> {
    await locator.waitFor({ state: 'visible' });
    await locator.click();
  }

  async takeScreenshot(name: string): Promise<void> {
    await this.page.screenshot({
      path: `screenshots/${name}-${Date.now()}.png`,
    });
  }

  async assertTitle(expected: string): Promise<void> {
    await expect(this.page).toHaveTitle(new RegExp(expected, 'i'));
  }

  async waitForLoadingToFinish(): Promise<void> {
    const spinner = this.page.locator('.oxd-loading-spinner');
    try {
      await spinner.waitFor({ state: 'hidden', timeout: 5_000 });
    } catch {
      // Si no hay spinner, no pasa nada
    }
  }
}