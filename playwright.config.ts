import { defineConfig, devices } from '@playwright/test';
import path from 'path';

export default defineConfig({
  testDir:     './tests',
  timeout:     60_000,
  retries:     1,
  workers:     process.env.CI ? 2 : undefined,
  globalSetup: './tests/global-setup.ts',

  reporter: [
    ['html',  { outputFolder: 'playwright-report', open: 'never' }],
    ['list'],
    ['allure-playwright', { outputFolder: 'allure-results' }],
  ],

  use: {
    baseURL:       'https://opensource-demo.orangehrmlive.com',
    storageState:  path.join(process.cwd(), 'auth-state.json'),
    trace:         'on-first-retry',
    screenshot:    'only-on-failure',
    video:         'on-first-retry',
    actionTimeout: 15_000,
  },

  projects: [
    {
      name: 'chromium',
      use:  { ...devices['Desktop Chrome'] },
    },
    {
      name: 'firefox',
      use:  { ...devices['Desktop Firefox'] },
    },
    {
      name: 'iphone-16-pro-max',
      use:  { ...devices['iPhone 16 Pro Max'] },
    },
  ],
});