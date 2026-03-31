import { test as base, expect } from '@playwright/test';
import { LoginPage }     from '../pages/LoginPage';
import { DashboardPage } from '../pages/DashboardPage';
import { USERS }         from './testData';

type AuthFixtures = {
  loggedInPage: void;
};

export const test = base.extend<AuthFixtures>({
  loggedInPage: async ({ page }, use) => {
    const loginPage     = new LoginPage(page);
    const dashboardPage = new DashboardPage(page);

    await loginPage.goto();
    await loginPage.loginAs(USERS.admin);
    await dashboardPage.assertDashboardIsVisible();

    await use();
  },
});

export { expect };