import { type Page, expect } from '@playwright/test';
import { BasePage } from './BasePage';

export class EmployeePage extends BasePage {
  constructor(page: Page) {
    super(page);
  }

  async goto(): Promise<void> {
    await this.page.goto(
      '/web/index.php/pim/viewEmployeeList',
      { waitUntil: 'domcontentloaded', timeout: 30_000 }
    );
    // Timeout de 45s para dar margen a Firefox que es más lento con esta demo
    await this.page.locator('.orangehrm-container').first()
      .waitFor({ state: 'visible', timeout: 45_000 });
    await this.waitForLoadingToFinish();
  }

  async searchByName(name: string): Promise<void> {
    const nameInput = this.page
      .locator('input[placeholder="Type for hints..."]').first();

    await nameInput.waitFor({ state: 'attached', timeout: 15_000 });
    await nameInput.fill(name, { force: true });

    await this.page.getByRole('button', { name: 'Search' }).click();

    await this.waitForLoadingToFinish();
    await this.page.waitForTimeout(2000);
  }

  async getResultCount(): Promise<number> {
    await this.page.waitForTimeout(2000);
    return await this.page.locator('.oxd-table-body .oxd-table-row').count();
  }

  async assertEmployeeInResults(name: string): Promise<void> {
    await expect(
      this.page.locator('.oxd-table-body')
    ).toContainText(name, { timeout: 15_000 });
  }

  async assertNoRecordsFound(): Promise<void> {
    await expect(
      this.page.locator('.orangehrm-horizontal-padding')
        .filter({ hasText: 'No Records Found' })
    ).toBeVisible({ timeout: 15_000 });
  }
}