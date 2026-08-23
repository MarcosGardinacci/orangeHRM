# 🚀 Automação de Testes E2E - OrangeHRM com Playwright & TypeScript

Projeto de automação de testes de ponta a ponta (E2E) estruturado com **Playwright** e **TypeScript**, aplicando as melhores práticas e padrões arquiteturais de **QA Automation** do mercado.

---

## 🏛️ Arquitetura do Projeto

O projeto adota o padrão **Page Object Model (POM)** combinado com **Custom Fixtures** do Playwright, desacoplamento de **massa de dados** e tipagem estática com **TypeScript**:

```
TreinamentoPlaywright2/
├── src/
│   ├── constants/               # Constantes e mensagens de erro esperadas da aplicação
│   │   └── error-messages.ts
│   ├── fixtures/                # Custom Fixtures (injeção automática dos Page Objects)
│   │   └── base.fixture.ts
│   ├── models/                  # Interfaces e Tipos TypeScript
│   │   └── auth.model.ts
│   ├── pages/                   # Page Objects (encapsulamento de locators e ações)
│   │   ├── base.page.ts         # Classe base com métodos comuns
│   │   ├── login.page.ts        # Page Object da tela de Login
│   │   └── dashboard.page.ts    # Page Object do Dashboard & Logout
│   └── test-data/               # Massa de dados desacoplada
│       └── login.data.ts
├── tests/                       # Especificações e suítes de testes E2E
│   └── login.spec.ts            # Testes de autenticação (7 cenários)
├── playwright.config.ts         # Configuração global do Playwright (reporters, timeouts, devices)
├── package.json                 # Dependências e scripts de execução
└── README.md                    # Documentação do projeto
```

---

## 📋 Cenários de Teste Implementados

Todos os cenários foram implementados no padrão **AAA (Arrange-Act-Assert)**:

| ID | Cenário | Tipo | Tags |
| :--- | :--- | :--- | :--- |
| **CT01** | Deve realizar login com sucesso informando credenciais válidas | Positivo | `@smoke`, `@regression`, `@login`, `@positive` |
| **CT02** | Deve exibir mensagem de erro ao informar senha inválida | Negativo | `@regression`, `@login`, `@negative` |
| **CT03** | Deve exibir mensagem de erro ao informar usuário inexistente | Negativo | `@regression`, `@login`, `@negative` |
| **CT04** | Deve exibir mensagem de validação ao deixar o campo de usuário vazio | Validação | `@regression`, `@login`, `@negative`, `@validation` |
| **CT05** | Deve exibir mensagem de validação ao deixar o campo de senha vazio | Validação | `@regression`, `@login`, `@negative`, `@validation` |
| **CT06** | Deve validar campos obrigatórios ao tentar submeter formulário em branco | Validação | `@regression`, `@login`, `@negative`, `@validation` |
| **CT07** | Deve realizar logout com sucesso e retornar à tela de login | Positivo | `@smoke`, `@regression`, `@logout`, `@positive` |

---

## 🛠️ Boas Práticas e Padrões Utilizados

1. **Page Object Model (POM)**:
   - Locators semânticos e recomendados pela documentação oficial (`getByRole`, `getByPlaceholder`, `locator`).
   - Métodos com responsabilidade única que realizam as interações da UI de forma atômica.
2. **Playwright Custom Fixtures (`test.extend`)**:
   - Os testes recebem instâncias prontas de `loginPage` e `dashboardPage` por injeção de dependência (`async ({ loginPage, dashboardPage }) => ...`), eliminando a necessidade de `new LoginPage(page)`.
3. **Massa de Dados Tipada**:
   - Dados de teste centralizados em `src/test-data/` com tipos estáticos `UserCredentials`.
4. **Tags de Execução**:
   - Categorização via metadados de tags do Playwright (`@smoke`, `@regression`, `@negative`, `@logout`).
5. **Configuração Resiliente e Evidências**:
   - Captura automática de **Screenshots** em caso de falha (`screenshot: 'only-on-failure'`).
   - Coleta de **Traces** e **Vídeos** para investigação detalhada no Trace Viewer (`trace: 'on-first-retry'`).

---

## 🚀 Como Executar os Testes

### 1. Instalar dependências e navegadores
```bash
npm install
npx playwright install --with-deps
```

### 2. Executar todos os testes
```bash
npm test
```

### 3. Executar apenas no Chromium (Chrome)
```bash
npm run test:chromium
```

### 4. Executar em modo visual (Headed)
```bash
npm run test:headed
```

### 5. Executar em modo UI interativo
```bash
npm run test:ui
```

### 6. Executar por Tags (Smoke / Regressão)
```bash
# Executa apenas testes críticos (@smoke)
npm run test:smoke

# Executa toda a suíte de regressão (@regression)
npm run test:regression

# Executa apenas cenários negativos / validação (@negative)
npm run test:negative
```

### 7. Abrir o Relatório de Testes (HTML Report)
```bash
npm run report
```
