# BrasilAPI — Cypress + Cucumber + REST + Allure

Extensão pronta para ser incorporada ao projeto de automação existente.

## Arquitetura

- **BDD/Gherkin:** comportamento e critérios de aceite.
- **Service Object / API Client:** exclusivamente chamadas HTTP.
- **Page Object:** massa de dados, base URL e configuração compartilhada.
- **Steps:** ligação entre Gherkin e client.
- **Evidence:** JSON por execução do cenário controlado.
- **Allure:** resultados técnicos separados das evidências.
- **GitHub Actions:** lint, format, Cypress, Allure e artifacts.

A estrutura acompanha a separação de handler/service/teste adotada na própria documentação da BrasilAPI, adaptada aqui para Cypress + Cucumber. citeturn0search0

## Instalação

```bash
npm ci
```

## Execução

```bash
npm test
npm run test:smoke
npm run test:negative
npm run test:regression
npm run lint
npm run format:check
npm run allure:generate
npm run allure:open
```

## Variáveis

```bash
CYPRESS_apiBaseUrl=https://brasilapi.com.br
CYPRESS_maxRequests=10
```

No GitHub, use `Repository Variables` para URL e limites públicos. Use `Secrets` somente para credenciais/tokens quando existirem.

## Integração com projeto existente

1. Copie `cypress/e2e/features/*.feature`.
2. Copie `cypress/pages/BrasilApiPage.js`.
3. Copie `cypress/services/BrasilApiClient.js`.
4. Mescle `cypress/support/commands.js`, `hooks.js`, `e2e.js` e `steps` com os arquivos existentes.
5. Mescle a configuração de Cucumber/Allure em `cypress.config.js`.
6. Adicione `.github/workflows/brasilapi-api-tests.yml`.

Não substitua o `cypress.config.js` do projeto existente sem mesclar as configurações próprias dele.

## Critérios verificáveis

A suíte não usa afirmações vagas. Cada teste valida status HTTP, Content-Type e/ou contrato de payload. A BrasilAPI documenta `200`, `400` e `404` conforme o endpoint e define um schema `ErrorMessage`; mudanças incompatíveis de status/campos devem ser tratadas como breaking changes.