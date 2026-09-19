@regression
Feature: Bancos - BrasilAPI
  @smoke @positive
  Scenario: CT-004 - Consultar banco por código válido
    When consulto um banco por código válido
    Then a resposta HTTP deve ser 200
    And a resposta deve possuir Content-Type JSON
    And a resposta do banco deve conter code name e ispb
