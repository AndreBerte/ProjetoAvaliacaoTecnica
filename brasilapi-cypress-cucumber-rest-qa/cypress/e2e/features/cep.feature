@regression
Feature: CEP - BrasilAPI
  Background:
    Given que a BrasilAPI está disponível

  @smoke @positive
  Scenario: CT-001 - Consultar CEP válido
    When consulto um CEP válido
    Then a resposta HTTP deve ser 200
    And a resposta deve possuir Content-Type JSON
    And a resposta de CEP deve conter os campos obrigatórios

  @negative
  Scenario: CT-002 - Consultar CEP inexistente
    When consulto um CEP inexistente
    Then a resposta deve possuir Content-Type JSON
    And a resposta de erro deve possuir contrato ErrorMessage

  @negative
  Scenario: CT-003 - Consultar CEP inválido
    When consulto um CEP inválido
    Then a resposta deve possuir Content-Type JSON
    And a resposta de erro deve possuir contrato ErrorMessage

  @excess @regression
  Scenario: CT-007 - Executar volume controlado de consultas
    When executo exatamente o limite configurado de consultas de CEP
