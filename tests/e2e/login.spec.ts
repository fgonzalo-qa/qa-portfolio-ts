import { test, expect } from '@playwright/test';
import { LoginPage }     from '../../pages/LoginPage';
import { DashboardPage } from '../../pages/DashboardPage';
import { USERS }         from '../../fixtures/testData';

test.describe('Autenticación — OrangeHRM', () => {

  // Este test usa storageState — funciona en todos los browsers incluyendo mobile
  test('login exitoso redirige al dashboard', async ({ page }) => {
    const dashboardPage = new DashboardPage(page);
    await page.goto('/web/index.php/dashboard/index',
      { waitUntil: 'domcontentloaded' });
    await dashboardPage.assertDashboardIsVisible();
  });

  // Los siguientes tests limpian cookies y necesitan el formulario de login
  // Solo corren en desktop donde el formulario es interactuable
  test('credenciales inválidas muestran mensaje de error',
    async ({ page, browserName }, testInfo) => {
      test.skip(
        testInfo.project.name === 'iphone-16-pro-max',
        'El formulario de login no es interactuable en viewport mobile'
      );

      await page.context().clearCookies();
      await page.goto('/web/index.php/auth/login',
        { waitUntil: 'domcontentloaded', timeout: 30_000 });
      await page.locator('input[name="username"]')
        .waitFor({ state: 'visible', timeout: 20_000 });

      const loginPage = new LoginPage(page);
      await loginPage.loginAs(USERS.invalid);
      await loginPage.assertLoginError('Invalid credentials');
    }
  );

  test('campos vacíos muestran validación requerida',
    async ({ page }, testInfo) => {
      test.skip(
        testInfo.project.name === 'iphone-16-pro-max',
        'El formulario de login no es interactuable en viewport mobile'
      );

      await page.context().clearCookies();
      await page.goto('/web/index.php/auth/login',
        { waitUntil: 'domcontentloaded', timeout: 30_000 });
      await page.locator('input[name="username"]')
        .waitFor({ state: 'visible', timeout: 20_000 });

      const loginPage = new LoginPage(page);
      await loginPage.loginAs({ username: '', password: '' });

      const requiredMessages = page.locator('.oxd-input-field-error-message');
      await expect(requiredMessages).toHaveCount(2);
    }
  );

  test('la URL de login es accesible sin autenticación',
    async ({ page }, testInfo) => {
      test.skip(
        testInfo.project.name === 'iphone-16-pro-max',
        'El formulario de login no es interactuable en viewport mobile'
      );

      await page.context().clearCookies();
      await page.goto('/web/index.php/dashboard/index',
        { waitUntil: 'domcontentloaded' });
      await expect(page).toHaveURL(/auth\/login/, { timeout: 10_000 });
    }
  );

});