When("tento adicionar novamente um produto que já está no carrinho", () => {
  cy.go("back");
  ProductsPage.assertLoaded();

  cy.fixture("products").then((products) => {
    ProductsPage.assertRemoveButtonForProduct(products.backpack);
  });
});
