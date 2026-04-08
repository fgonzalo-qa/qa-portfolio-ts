import { chromium } from '@playwright/test';
import path from 'path';

// Este script corre UNA SOLA VEZ antes de todos los tests
// Hace login, guarda las cookies en un archivo, y todos los tests las reutilizan
export default async function globalSetup() {
  const browser = await chromium.launch();
  const page    = await browser.newPage();

  // Retry logic for navigation
  let retries = 3;
  while (retries > 0) {
    try {
      await page.goto(
        'https://opensource-demo.orangehrmlive.com/web/index.php/auth/login',
        { waitUntil: 'load', timeout: 60_000 }
      );
      break; // Success, exit retry loop
    } catch (error) {
      retries--;
      if (retries === 0) throw error;
      console.log(`Navigation failed, retrying... (${retries} attempts left)`);
      await page.waitForTimeout(2000); // Wait 2 seconds before retry
    }
  }

  await page.locator('input[name="username"]').fill('Admin');
  await page.locator('input[name="password"]').fill('admin123');
  await page.locator('button[type="submit"]').click({ force: true });

  // Esperamos que el menú aparezca — confirma login exitoso
  await page.locator('.oxd-main-menu').first()
    .waitFor({ state: 'visible', timeout: 60_000 });

  // Guardamos el estado de sesión (cookies + localStorage)
  await page.context().storageState({
    path: path.join(process.cwd(), 'auth-state.json'),
  });

  await browser.close();
  console.log('✓ Login guardado en auth-state.json');
}