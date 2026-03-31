import { chromium } from '@playwright/test';
import path from 'path';

// Este script corre UNA SOLA VEZ antes de todos los tests
// Hace login, guarda las cookies en un archivo, y todos los tests las reutilizan
export default async function globalSetup() {
  const browser = await chromium.launch();
  const page    = await browser.newPage();

  await page.goto(
    'https://opensource-demo.orangehrmlive.com/web/index.php/auth/login',
    { waitUntil: 'domcontentloaded', timeout: 30_000 }
  );

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