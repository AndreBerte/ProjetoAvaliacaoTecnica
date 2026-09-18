# SauceDemo QA Automation V2

Framework de automação com foco na arquitetura e testes E2E:

- Cypress
- Cucumber/Gherkin BDD
- Page Object Model
- Hooks BDD Before/After/BeforeAll/AfterAll
- Tags `@smoke`, `@regression`, `@negative`
- Cypress Custom Commands
- Fixtures para massa de dados
- Evidências automáticas por cenário
- Allure Reports
- ESLint
- Prettier
- GitHub Actions
- Publicação do Allure no GitHub Pages

## Estrutura

```text
.github/
└── workflows/
    ├── qa.yml
    └── allure-pages.yml

cypress/
├── e2e/features/
│   ├── login.feature
│   ├── cart.feature
│   └── checkout.feature
├── fixtures/
│   ├── users.json
│   ├── checkout.json
│   └── products.json
├── pages/
│   ├── LoginPage.js
│   ├── ProductsPage.js
│   ├── CartPage.js
│   └── CheckoutPage.js
└── support/
    ├── commands.js
    ├── e2e.js
    ├── hooks.js
    └── steps/common.steps.js

cypress.config.js
eslint.config.mjs
.prettierrc.json
.prettierignore
.gitignore
.env.example
package.json
```

## Hooks

`cypress/support/hooks.js` contém:

- `BeforeAll`
- `Before`
- `After`
- `AfterAll`
- hooks condicionais por tag

O `After` gera uma screenshot automática para cada cenário. O nome contém status e nome do cenário.

## Tags

Exemplos:

```bash
npm run test:smoke
npm run test:regression
npm run test:negative
```

Ou diretamente:

```bash
CYPRESS_TAGS="@smoke" npm test
```

```bash
CYPRESS_TAGS="@negative and @regression" npm test
```

O valor de `CYPRESS_TAGS` é disponibilizado ao preprocessor pelo `cypress.config.js`.

## Custom Commands

Comandos em `cypress/support/commands.js`:

```javascript
cy.login("standard");
cy.addProductToCart("Sauce Labs Backpack");
cy.openCart();
cy.takeEvidence("nome-da-evidencia");
```

## Fixtures

Massa de dados:

```text
cypress/fixtures/users.json
cypress/fixtures/checkout.json
cypress/fixtures/products.json
```

Isso evita espalhar dados de teste pelas Step Definitions.

## Evidências

Durante a execução:

```text
cypress/screenshots/
cypress/videos/
```

O hook `After` cria screenshot de cada cenário.

No CI, screenshots e vídeos são publicados como GitHub Actions artifacts.

## Allure

Gerar:

```bash
npm run allure:generate
```

Abrir:

```bash
npm run allure:open
```

Servir:

```bash
npm run allure:serve
```

## Lint e formatação

```bash
npm run lint
npm run lint:fix
npm run format
npm run format:check
```

## GitHub Actions

`qa.yml` executa:

1. Checkout
2. Node
3. `npm ci`
4. ESLint
5. Prettier check
6. Cypress
7. Allure
8. Upload de evidências
9. Upload do relatório

`allure-pages.yml` publica o diretório `allure-report` no GitHub Pages após uma execução do workflow de QA na branch `main`.

## GitHub Pages

No repositório, em:

**Settings → Pages → Build and deployment**

selecione **GitHub Actions**.

O workflow usa `actions/configure-pages`, `actions/upload-pages-artifact` e `actions/deploy-pages`.

O ambiente `github-pages` é utilizado pelo deployment.

Após a primeira execução bem-sucedida, o GitHub exibirá a URL do Pages no ambiente/deployment.

## Secrets e variáveis

Variáveis não sensíveis podem ser Repository Variables:

```text
CYPRESS_BASE_URL
```

Credenciais devem ficar em Repository/Environment Secrets.

Nunca coloque:

```text
.env
cypress.env.json
credentials/
secrets/
*.pem
*.key
```

no Git.

## Execução local

```bash
npm install
npm test
```

Ou:

```bash
npm run test:open
```

## Fluxo recomendado

```text
Feature
   ↓
Step Definition
   ↓
Custom Command / Page Object
   ↓
Cypress
   ↓
Hook After
   ↓
Screenshot + Video
   ↓
Allure Results
   ↓
Allure Report
   ↓
GitHub Actions
   ↓
GitHub Pages
```

## Author André Bertê
