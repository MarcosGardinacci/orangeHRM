import { test as baseTest, expect } from '@playwright/test';
import { LoginPage } from '../pages/login.page';
import { DashboardPage } from '../pages/dashboard.page';

/**
 * Interface com os Page Objects injetados via Fixture
 */
interface AppFixtures {
  loginPage: LoginPage;
  dashboardPage: DashboardPage;
}

/**
 * Fixture customizada que estende o test do Playwright com injeção automática de Page Objects
 */
export const test = baseTest.extend<AppFixtures>({
  loginPage: async ({ page }, use) => {
    const loginPage = new LoginPage(page);
    await use(loginPage);
  },

  dashboardPage: async ({ page }, use) => {
    const dashboardPage = new DashboardPage(page);
    await use(dashboardPage);
  },
});

export { expect };
