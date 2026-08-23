import { Page, Locator } from '@playwright/test';

/**
 * BasePage: Classe base para todos os Page Objects.
 * Centraliza o driver do Playwright (Page) e métodos utilitários reutilizáveis.
 */
export abstract class BasePage {
  protected readonly page: Page;

  constructor(page: Page) {
    this.page = page;
  }

  /**
   * Navega para a URL informada (relativa à baseURL configurada ou absoluta)
   */
  async navigate(path: string = ''): Promise<void> {
    await this.page.goto(path, { waitUntil: 'domcontentloaded' });
  }

  /**
   * Retorna a URL atual do navegador
   */
  getURL(): string {
    return this.page.url();
  }

  /**
   * Retorna o título da aba atual
   */
  async getTitle(): Promise<string> {
    return await this.page.title();
  }

  /**
   * Aguarda um elemento ficar visível na tela
   */
  async waitForVisible(locator: Locator, timeout: number = 10000): Promise<void> {
    await locator.waitFor({ state: 'visible', timeout });
  }
}
