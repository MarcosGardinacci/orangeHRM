import { test, expect } from '../src/fixtures/base.fixture';
import { LOGIN_DATA } from '../src/test-data/login.data';
import { ERROR_MESSAGES } from '../src/constants/error-messages';

test.describe('Autenticação - OrangeHRM Demo', () => {
  test.beforeEach(async ({ loginPage }) => {
    // Arrange: Navega até a página de login antes de cada teste
    await loginPage.open();
  });

  test(
    'CT01 - Deve realizar login com sucesso informando credenciais válidas',
    { tag: ['@smoke', '@regression', '@login', '@positive'] },
    async ({ loginPage, dashboardPage, page }) => {
      // Act: Preenche credenciais e submete login
      await loginPage.login(LOGIN_DATA.validUser);

      // Assert: Valida redirecionamento para o dashboard e visibilidade do header
      await expect(page).toHaveURL(/.*\/dashboard\/index/);
      await expect(dashboardPage.headerHeading).toBeVisible();
      await expect(dashboardPage.headerHeading).toHaveText('Dashboard');
    }
  );

  test(
    'CT02 - Deve exibir mensagem de erro ao informar senha inválida',
    { tag: ['@regression', '@login', '@negative'] },
    async ({ loginPage }) => {
      // Act: Informa usuário válido e senha incorreta
      await loginPage.login(LOGIN_DATA.invalidPasswordUser);

      // Assert: Valida exibição do alerta de credenciais inválidas
      await expect(loginPage.alertText).toBeVisible();
      await expect(loginPage.alertText).toHaveText(ERROR_MESSAGES.INVALID_CREDENTIALS);
    }
  );

  test(
    'CT03 - Deve exibir mensagem de erro ao informar usuário inexistente',
    { tag: ['@regression', '@login', '@negative'] },
    async ({ loginPage }) => {
      // Act: Informa usuário inexistente
      await loginPage.login(LOGIN_DATA.nonExistentUser);

      // Assert: Valida mensagem de credenciais inválidas
      await expect(loginPage.alertText).toBeVisible();
      await expect(loginPage.alertText).toHaveText(ERROR_MESSAGES.INVALID_CREDENTIALS);
    }
  );

  test(
    'CT04 - Deve exibir mensagem de validação ao deixar o campo de usuário vazio',
    { tag: ['@regression', '@login', '@negative', '@validation'] },
    async ({ loginPage }) => {
      // Act: Deixa usuário vazio e preenche apenas a senha
      await loginPage.login(LOGIN_DATA.emptyUsernameUser);

      // Assert: Valida mensagem "Required" no campo de usuário
      await expect(loginPage.usernameRequiredMessage).toBeVisible();
      await expect(loginPage.usernameRequiredMessage).toHaveText(ERROR_MESSAGES.REQUIRED_FIELD);
    }
  );

  test(
    'CT05 - Deve exibir mensagem de validação ao deixar o campo de senha vazio',
    { tag: ['@regression', '@login', '@negative', '@validation'] },
    async ({ loginPage }) => {
      // Act: Preenche apenas o usuário e deixa senha vazia
      await loginPage.login(LOGIN_DATA.emptyPasswordUser);

      // Assert: Valida mensagem "Required" no campo de senha
      await expect(loginPage.passwordRequiredMessage).toBeVisible();
      await expect(loginPage.passwordRequiredMessage).toHaveText(ERROR_MESSAGES.REQUIRED_FIELD);
    }
  );

  test(
    'CT06 - Deve validar campos obrigatórios ao tentar submeter formulário em branco',
    { tag: ['@regression', '@login', '@negative', '@validation'] },
    async ({ loginPage }) => {
      // Act: Submete formulário com ambos os campos vazios
      await loginPage.clickLogin();

      // Assert: Valida que ambos os campos exibem a mensagem "Required"
      await expect(loginPage.usernameRequiredMessage).toBeVisible();
      await expect(loginPage.usernameRequiredMessage).toHaveText(ERROR_MESSAGES.REQUIRED_FIELD);

      await expect(loginPage.passwordRequiredMessage).toBeVisible();
      await expect(loginPage.passwordRequiredMessage).toHaveText(ERROR_MESSAGES.REQUIRED_FIELD);

      await expect(loginPage.allRequiredMessages).toHaveCount(2);
    }
  );

  test(
    'CT07 - Deve realizar logout com sucesso e retornar à tela de login',
    { tag: ['@smoke', '@regression', '@logout', '@positive'] },
    async ({ loginPage, dashboardPage, page }) => {
      // Arrange & Act (1): Realiza login com credenciais válidas
      await loginPage.login(LOGIN_DATA.validUser);
      await dashboardPage.waitForDashboardLoaded();

      // Act (2): Executa logout pelo menu do usuário
      await dashboardPage.logout();

      // Assert: Valida retorno à tela de login e formulário visível
      await expect(page).toHaveURL(/.*\/auth\/login/);
      await expect(loginPage.usernameInput).toBeVisible();
      await expect(loginPage.passwordInput).toBeVisible();
      await expect(loginPage.loginButton).toBeVisible();
    }
  );
});
