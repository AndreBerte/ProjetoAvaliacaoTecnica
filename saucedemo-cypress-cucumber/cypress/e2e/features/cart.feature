@regression
Feature: Carrinho de compras

  @smoke @regression
  Scenario: Adicionar um produto ao carrinho
    Given que estou autenticado como "standard"
    And estou na página de produtos
    When adiciono o produto "Sauce Labs Backpack" ao carrinho
    Then o produto "Sauce Labs Backpack" deve ser adicionado ao carrinho
    And o indicador do carrinho deve apresentar "1" item

  @regression
  Scenario: Remover um produto do carrinho
    Given que estou autenticado como "standard"
    And adicionei o produto "Sauce Labs Backpack" ao carrinho
    And estou na página do carrinho
    When removo o produto "Sauce Labs Backpack"
    Then o produto "Sauce Labs Backpack" não deve estar listado no carrinho
    And o carrinho deve estar vazio

  @regression
  Scenario: Adicionar todos os produtos disponíveis ao carrinho
    Given que estou autenticado como "standard"
    And estou na página de produtos
    When adiciono todos os produtos disponíveis ao carrinho
    Then todos os produtos disponíveis devem ser apresentados no carrinho
    And o indicador do carrinho deve corresponder à quantidade de produtos adicionados
    When tento adicionar novamente um produto que já está no carrinho
    Then o produto não deve ser duplicado no carrinho
    And a quantidade total de itens não deve ultrapassar a quantidade de produtos disponíveis
