@smoke @regression
Feature: Autenticação de usuário

  @smoke
  Scenario: Realizar login com credenciais válidas
    Given que estou na página de login do SauceDemo
    And informo o usuário "standard_user"
    And informo a senha "secret_sauce"
    When clico no botão de login
    Then devo ser redirecionado para a página de produtos
    And a lista de produtos deve estar visível

  @negative @regression
  Scenario: Tentar realizar login com senha inválida
    Given que estou na página de login do SauceDemo
    And informo o usuário "standard_user"
    And informo a senha "senha_invalida"
    When clico no botão de login
    Then devo permanecer na página de login
    And uma mensagem de erro de autenticação deve ser apresentada
    And não devo ter acesso à página de produtos
