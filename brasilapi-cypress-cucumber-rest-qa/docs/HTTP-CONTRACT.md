# Contrato HTTP dos testes

A suíte separa **comportamento BDD** das **chamadas HTTP**. O BDD descreve o que o sistema deve fazer; `BrasilApiClient` executa HTTP; `BrasilApiPage` centraliza base URL e massa de dados.

## Critério padronizado

1. Toda chamada usa `failOnStatusCode: false` para permitir validar erros como dados de teste.
2. Sucesso funcional exige status explícito + `Content-Type` JSON + contrato de payload.
3. Erro funcional exige status explicitamente definido quando a documentação define o código e contrato `ErrorMessage` (`name`, `message`, `type`).
4. Não usar "retorno correto", "deve funcionar" ou "dados esperados" sem uma asserção observável.

## Matriz

| Caso | Endpoint | Status | Contrato |
|---|---|---:|---|
| CT-001 | GET /api/cep/v1/05010000 | 200 | JSON + cep/state/city/neighborhood/street |
| CT-002 | GET /api/cep/v1/00000000 | 404* | JSON + ErrorMessage |
| CT-003 | GET /api/cep/v1/ABC12345 | 400* | JSON + ErrorMessage |
| CT-004 | GET /api/banks/v1/260 | 200 | JSON + code/name/ispb |
| CT-005 | GET /api/cnpj/v1/19131243000197 | 200 | JSON + dados cadastrais |
| CT-006 | GET /api/cnpj/v1/123456789 | 400 | JSON + ErrorMessage |
| CT-007 | GET /api/cep/v1/05010000 | 2xx/4xx/5xx observável | exatamente MAX_REQUESTS chamadas |

`*` Deve ser confirmado contra o contrato OpenAPI vigente antes de tornar o código rígido. O objetivo é não transformar uma suposição em contrato.

A documentação/repositório oficial da BrasilAPI recomenda cobrir CORS, sucesso 200, 404 e 400 quando aplicável e usa `ErrorMessage` para erros. citeturn0search0turn0search9

## CORS

A suíte deve ter um cenário adicional de contrato CORS por endpoint quando o objetivo incluir compatibilidade de integração. O próprio guia oficial exige esse tipo de cobertura nos testes E2E. citeturn0search0turn0search2

## Volume

CT-007 é deliberadamente limitado por `CYPRESS_maxRequests` e não executa varredura de CEPs. Isso mantém o teste funcional e evita transformar a suíte em carga sobre uma API pública.
