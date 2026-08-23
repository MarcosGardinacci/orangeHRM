import { Locator, Page } from '@playwright/test';
import { BasePage } from './base.page';

/**
 * DashboardPage: Page Object representando a tela principal (Dashboard) após login.
 * Contém locators do cabeçalho, menu de usuário e fluxo de Logout.
 */
export class DashboardPage extends BasePage {
  readonly url = '/web/index.php/dashboard/index';

  // Locators
  readonly headerHeading: Locator;
  readonly userDropdown: Locator;
  readonly userDropdownMenu: Locator;
  readonly logoutLink: Locator;
  readonly sideMenu: Locator;

  constructor(page: Page) {
    super(page);

    this.headerHeading = page.getByRole('heading', { name: 'Dashboard' });
    this.userDropdown = page.locator('.oxd-userdropdown-tab');
    this.userDropdownMenu = page.locator('.oxd-dropdown-menu');
    this.logoutLink = page.getByRole('menuitem', { name: 'Logout' });
    this.sideMenu = page.locator('.oxd-sidepanel');
  }

  /**
   * Aguarda o carregamento completo do Dashboard
   */
  async waitForDashboardLoaded(timeout: number = 15000): Promise<void> {
    await this.headerHeading.waitFor({ state: 'visible', timeout });
  }

  /**
   * Executa o fluxo de Logout através do menu de perfil do usuário
   */
  async logout(): Promise<void> {
    await this.userDropdown.click();
    await this.logoutLink.waitFor({ state: 'visible', timeout: 5000 });
    await this.logoutLink.click();
  }
}
