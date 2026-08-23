import { defineConfig, devices } from '@playwright/test';

/**
 * Configuração Global do Playwright
 * Documentação: https://playwright.dev/docs/test-configuration
 */
export default defineConfig({
  testDir: './tests',
  /* Execução paralela dos testes */
  fullyParallel: true,
  /* Falhar build em CI se houver test.only esquecido no código */
  forbidOnly: !!process.env.CI,
  /* Quantidade de retentativas em caso de falhas */
  retries: process.env.CI ? 2 : 1,
  /* Workers paralelos */
  workers: process.env.CI ? 2 : undefined,
  /* Configuração dos relatórios gerados */
  reporter: [
    ['html', { outputFolder: 'playwright-report', open: 'never' }],
    ['list'],
    ['json', { outputFile: 'test-results/results.json' }],
  ],
  /* Configurações compartilhadas para todos os projetos */
  use: {
    /* URL base da aplicação sob teste */
    baseURL: 'https://opensource-demo.orangehrmlive.com',

    /* Coleta de evidências (Trace, Screenshot, Vídeo) */
    trace: 'on-first-retry',
    screenshot: 'only-on-failure',
    video: 'retain-on-failure',

    /* Timeout padrão para ações individuais (ex: click, fill) */
    actionTimeout: 10000,
    navigationTimeout: 30000,
  },

  /* Timeout global por teste (30 segundos) */
  timeout: 30000,

  /* Configuração dos navegadores suportados */
  projects: [
    {
      name: 'chromium',
      use: { 
        ...devices['Desktop Chrome'],
        viewport: { width: 1280, height: 720 },
      },
    },

    {
      name: 'firefox',
      use: { 
        ...devices['Desktop Firefox'],
        viewport: { width: 1280, height: 720 },
      },
    },

    {
      name: 'webkit',
      use: { 
        ...devices['Desktop Safari'],
        viewport: { width: 1280, height: 720 },
      },
    },
  ],
});
