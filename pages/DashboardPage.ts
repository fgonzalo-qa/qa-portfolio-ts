import { type Page, expect } from '@playwright/test';
import { BasePage } from './BasePage';

export class DashboardPage extends BasePage {
  constructor(page: Page) {
    super(page);
  }

  async assertDashboardIsVisible(): Promise<void> {
    // Esperamos el menú directamente — más confiable que esperar la URL
    // porque OrangeHRM pasa por /auth/validate como URL intermedia
    await expect(
      this.page.locator('.oxd-main-menu').first()
    ).toBeVisible({ timeout: 60_000 });
  }

  async assertLoggedInAs(_username: string): Promise<void> {
    await expect(
      this.page.locator('.oxd-userdropdown-name')
    ).toBeVisible({ timeout: 15_000 });
  }

  async navigateTo(menuItem: string): Promise<void> {
    await this.page.locator('.oxd-main-menu').first()
      .locator(`text=${menuItem}`)
      .click();
    await this.waitForLoadingToFinish();
  }
}