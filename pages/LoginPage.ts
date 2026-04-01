import { type Page, expect } from '@playwright/test';
import { BasePage } from './BasePage';
import type { User } from '../types';

export class LoginPage extends BasePage {
  constructor(page: Page) {
    super(page);
  }

  async goto(): Promise<void> {
    await this.navigate('/web/index.php/auth/login');
    await this.page.waitForURL(/auth\/login/, { timeout: 15_000 });
  }

  async loginAs(user: User): Promise<void> {
    const usernameInput = this.page.locator('input[name="username"]');
    const passwordInput = this.page.locator('input[name="password"]');
    const loginButton   = this.page.locator('button[type="submit"]');

    // Esperamos que el input esté en el DOM y visible
    await expect(usernameInput).toBeVisible({ timeout: 30_000 });
    await usernameInput.fill(user.username);
    await passwordInput.fill(user.password);
    await loginButton.click({ force: true });
  }

  async getErrorText(): Promise<string> {
    const errorAlert = this.page.locator('.oxd-alert-content-text');
    await errorAlert.waitFor({ state: 'visible', timeout: 10_000 });
    return (await errorAlert.textContent()) ?? '';
  }

  async assertLoginError(expectedMessage: string): Promise<void> {
    const error = await this.getErrorText();
    expect(error).toContain(expectedMessage);
  }
}