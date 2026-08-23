import { Locator, Page } from '@playwright/test';
import { BasePage } from './base.page';
import { UserCredentials } from '../models/auth.model';

/**
 * LoginPage: Page Object representando a tela de login do OrangeHRM.
 * Encapsula locators semânticos e ações do usuário.
 */
export class LoginPage extends BasePage {
  readonly url = '/web/index.php/auth/login';

  // Locators
  readonly loginHeading: Locator;
  readonly usernameInput: Locator;
  readonly passwordInput: Locator;
  readonly loginButton: Locator;
  readonly alertBox: Locator;
  readonly alertText: Locator;
  readonly usernameFieldGroup: Locator;
  readonly passwordFieldGroup: Locator;
  readonly usernameRequiredMessage: Locator;
  readonly passwordRequiredMessage: Locator;
  readonly allRequiredMessages: Locator;
  readonly companyLogo: Locator;

  constructor(page: Page) {
    super(page);

    this.loginHeading = page.getByRole('heading', { name: /Login/i });
    this.usernameInput = page.getByPlaceholder('Username');
    this.passwordInput = page.getByPlaceholder('Password');
    this.loginButton = page.getByRole('button', { name: 'Login' });
    this.alertBox = page.locator('.oxd-alert');
    this.alertText = page.locator('.oxd-alert-content-text');

    // Grupos de campos para capturar mensagens contextuais de obrigatoriedade
    this.usernameFieldGroup = page.locator('.oxd-input-group').filter({ has: this.usernameInput });
    this.passwordFieldGroup = page.locator('.oxd-input-group').filter({ has: this.passwordInput });
    
    this.usernameRequiredMessage = this.usernameFieldGroup.locator('.oxd-input-field-error-message');
    this.passwordRequiredMessage = this.passwordFieldGroup.locator('.oxd-input-field-error-message');
    this.allRequiredMessages = page.locator('.oxd-input-field-error-message');
    this.companyLogo = page.locator('.orangehrm-login-branding img, .orangehrm-login-logo img');
  }

  /**
   * Navega diretamente para a tela de login
   */
  async open(): Promise<void> {
    await this.navigate(this.url);
    await this.usernameInput.waitFor({ state: 'visible', timeout: 15000 });
  }

  /**
   * Preenche o campo de usuário
   */
  async fillUsername(username?: string): Promise<void> {
    if (username !== undefined && username !== '') {
      await this.usernameInput.fill(username);
    } else {
      await this.usernameInput.clear();
    }
  }

  /**
   * Preenche o campo de senha
   */
  async fillPassword(password?: string): Promise<void> {
    if (password !== undefined && password !== '') {
      await this.passwordInput.fill(password);
    } else {
      await this.passwordInput.clear();
    }
  }

  /**
   * Clica no botão de login
   */
  async clickLogin(): Promise<void> {
    await this.loginButton.click();
  }

  /**
   * Executa o fluxo completo de submissão de formulário de login
   */
  async login(credentials: UserCredentials): Promise<void> {
    await this.fillUsername(credentials.username);
    await this.fillPassword(credentials.password);
    await this.clickLogin();
  }

  /**
   * Retorna o texto do alerta de erro principal ("Invalid credentials")
   */
  async getAlertMessage(): Promise<string> {
    await this.alertText.waitFor({ state: 'visible', timeout: 10000 });
    return (await this.alertText.textContent())?.trim() ?? '';
  }

  /**
   * Retorna o texto de validação do campo Username
   */
  async getUsernameErrorMessage(): Promise<string> {
    await this.usernameRequiredMessage.waitFor({ state: 'visible', timeout: 5000 });
    return (await this.usernameRequiredMessage.textContent())?.trim() ?? '';
  }

  /**
   * Retorna o texto de validação do campo Password
   */
  async getPasswordErrorMessage(): Promise<string> {
    await this.passwordRequiredMessage.waitFor({ state: 'visible', timeout: 5000 });
    return (await this.passwordRequiredMessage.textContent())?.trim() ?? '';
  }
}
