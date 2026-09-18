@regression
Feature: Checkout

  @smoke @regression
  Scenario: Finalizar uma compra com dados válidos
    Given que estou autenticado como "standard"
    And adicionei o produto "Sauce Labs Backpack" ao carrinho
    And estou na página do carrinho
    When clico em "Checkout"
    And informo o primeiro nome "Andre"
    And informo o sobrenome "Teste"
    And informo o código postal "90000-000"
    And avanço para a revisão do pedido
    Then o produto "Sauce Labs Backpack" deve aparecer no resumo do pedido
    And o valor total da compra deve ser apresentado
    When finalizo a compra
    Then uma mensagem de confirmação do pedido deve ser apresentada

  @negative @regression
  Scenario: Tentar avançar no checkout sem preencher os dados obrigatórios
    Given que estou autenticado como "standard"
    And adicionei o produto "Sauce Labs Backpack" ao carrinho
    And estou na página do carrinho
    When clico em "Checkout"
    And deixo o campo "First Name" vazio
    And informo o sobrenome "Teste"
    And informo o código postal "90000-000"
    And tento avançar para a revisão do pedido
    Then não devo avançar para a página de revisão
    And uma mensagem informando que o primeiro nome é obrigatório deve ser apresentada
