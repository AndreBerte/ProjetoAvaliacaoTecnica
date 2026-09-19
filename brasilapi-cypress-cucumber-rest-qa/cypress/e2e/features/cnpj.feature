@regression
Feature: CNPJ - BrasilAPI
  @smoke @positive
  Scenario: CT-005 - Consultar CNPJ válido
    When consulto um CNPJ válido
    Then a resposta HTTP deve ser 200
    And a resposta deve possuir Content-Type JSON
    And a resposta de CNPJ deve conter dados cadastrais

  @negative
  Scenario: CT-006 - Consultar CNPJ inválido
    When consulto um CNPJ inválido
    Then a resposta HTTP deve ser 400
    And a resposta deve possuir Content-Type JSON
    And a resposta de erro deve possuir contrato ErrorMessage
