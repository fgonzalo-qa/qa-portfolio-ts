import { test, expect } from '@playwright/test';
import { LoginPage }     from '../../pages/LoginPage';
import { DashboardPage } from '../../pages/DashboardPage';
import { USERS }         from '../../fixtures/testData';

test.describe('Autenticación — OrangeHRM', () => {

  test('login exitoso redirige al dashboard', async ({ page }) => {
    const dashboardPage = new DashboardPage(page);
    await page.goto('/web/index.php/dashboard/index',
      { waitUntil: 'domcontentloaded' });
    await dashboardPage.assertDashboardIsVisible();
  });

  test('credenciales inválidas muestran mensaje de error', async ({ page }) => {
    await page.context().clearCookies();
    await page.goto('/web/index.php/auth/login',
      { waitUntil: 'domcontentloaded', timeout: 30_000 });

    const usernameInput = page.locator('input[name="username"]');
    await usernameInput.waitFor({ state: 'visible', timeout: 20_000 });

    const loginPage = new LoginPage(page);
    await loginPage.loginAs(USERS.invalid);
    await loginPage.assertLoginError('Invalid credentials');
  });

  test('campos vacíos muestran validación requerida', async ({ page }) => {
    await page.context().clearCookies();
    await page.goto('/web/index.php/auth/login',
      { waitUntil: 'domcontentloaded', timeout: 30_000 });

    const usernameInput = page.locator('input[name="username"]');
    await usernameInput.waitFor({ state: 'visible', timeout: 20_000 });

    const loginPage = new LoginPage(page);
    await loginPage.loginAs({ username: '', password: '' });

    const requiredMessages = page.locator('.oxd-input-field-error-message');
    await expect(requiredMessages).toHaveCount(2);
  });

  test('la URL de login es accesible sin autenticación', async ({ page }) => {
    await page.context().clearCookies();
    await page.goto('/web/index.php/dashboard/index',
      { waitUntil: 'domcontentloaded' });
    await expect(page).toHaveURL(/auth\/login/, { timeout: 10_000 });
  });

});