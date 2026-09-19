const { Given, When, Then } = require("@badeball/cypress-cucumber-preprocessor");
const { expect } = require("chai");

const LoginPage = require("../../pages/LoginPage");
const ProductsPage = require("../../pages/ProductsPage");
const CartPage = require("../../pages/CartPage");
const CheckoutPage = require("../../pages/CheckoutPage");

Given("que estou na página de login do SauceDemo", () => {
  LoginPage.visit();
});

Given("que estou autenticado como {string}", (userType) => {
  cy.login(userType);
  ProductsPage.assertLoaded();
});

Given("estou na página de produtos", () => {
  ProductsPage.assertLoaded();
});

Given("informo o usuário {string}", (username) => {
  cy.get(LoginPage.selectors.username).clear();
  cy.get(LoginPage.selectors.username).type(username);
});

Given("informo a senha {string}", (password) => {
  cy.get(LoginPage.selectors.password).clear();
  cy.get(LoginPage.selectors.password).type(password, { log: false });
});

When("clico no botão de login", () => {
  cy.get(LoginPage.selectors.loginButton).click();
});

Then("devo ser redirecionado para a página de produtos", () => {
  ProductsPage.assertLoaded();
});

Then("a lista de produtos deve estar visível", () => {
  cy.get(ProductsPage.selectors.inventory).should("be.visible");
});

Then("devo permanecer na página de login", () => {
  cy.url().should("not.include", "/inventory.html");
});

Then("uma mensagem de erro de autenticação deve ser apresentada", () => {
  LoginPage.assertError();
});

Then("não devo ter acesso à página de produtos", () => {
  cy.url().should("not.include", "/inventory.html");
});

When("adiciono o produto {string} ao carrinho", (productName) => {
  cy.addProductToCart(productName);
});

Then("o produto {string} deve ser adicionado ao carrinho", (productName) => {
  cy.openCart();
  CartPage.assertProduct(productName);
});

Then("o indicador do carrinho deve apresentar {string} item", (count) => {
  cy.visit("/inventory.html");
  ProductsPage.assertCartCount(count);
});

Given("adicionei o produto {string} ao carrinho", (productName) => {
  cy.addProductToCart(productName);
});

Given("estou na página do carrinho", () => {
  ProductsPage.openCart();
});

When("removo o produto {string}", (productName) => {
  CartPage.removeProduct(productName);
});

Then("o produto {string} não deve estar listado no carrinho", (productName) => {
  CartPage.assertProductNotPresent(productName);
});

Then("o carrinho deve estar vazio", () => {
  CartPage.assertEmpty();
});

When("clico em {string}", (button) => {
  if (button === "Checkout") {
    CartPage.checkout();
  }
});

Given("informo o primeiro nome {string}", (value) => {
  cy.get(CheckoutPage.selectors.firstName).type(value);
});

Given("informo o sobrenome {string}", (value) => {
  cy.get(CheckoutPage.selectors.lastName).type(value);
});

Given("informo o código postal {string}", (value) => {
  cy.get(CheckoutPage.selectors.postalCode).type(value);
});

Given("avanço para a revisão do pedido", () => {
  CheckoutPage.continue();
});

Then("o produto {string} deve aparecer no resumo do pedido", (productName) => {
  CheckoutPage.assertSummaryContains(productName);
});

Then("o valor total da compra deve ser apresentado", () => {
  CheckoutPage.assertTotalVisible();
});

When("finalizo a compra", () => {
  CheckoutPage.finish();
});

Then("uma mensagem de confirmação do pedido deve ser apresentada", () => {
  CheckoutPage.assertPurchaseCompleted();
});

Given("deixo o campo {string} vazio", (field) => {
  const selector = {
    "First Name": CheckoutPage.selectors.firstName,
    "Last Name": CheckoutPage.selectors.lastName,
    "Postal Code": CheckoutPage.selectors.postalCode,
  }[field];

  cy.get(selector).clear();
});

When("tento avançar para a revisão do pedido", () => {
  CheckoutPage.continue();
});

Then(
  "não devo avançar para a página de revisão",
  () => {
    cy.url().should("include", "/checkout-step-one.html");
  },
);

Then(
  "uma mensagem informando que o primeiro nome é obrigatório deve ser apresentada",
  () => {
    CheckoutPage.assertErrorContains("First Name is required");
  },
);

When("adiciono todos os produtos disponíveis ao carrinho", () => {
  ProductsPage.addAllProducts();
});

Then("todos os produtos disponíveis devem ser apresentados no carrinho", () => {
  ProductsPage.openCart();
  cy.get(CartPage.selectors.item).should("have.length.greaterThan", 0);
});

Then(
  "o indicador do carrinho deve corresponder à quantidade de produtos adicionados",
  () => {
    cy.get(CartPage.selectors.item)
      .its("length")
      .then((count) => {
        cy.get('[data-test="shopping-cart-badge"]').should("have.text", String(count));
      });
  },
);

When("tento adicionar novamente um produto que já está no carrinho", () => {
  cy.visit("/inventory.html");
  cy.fixture("products").then((products) => {
    ProductsPage.addProduct(products.backpack);
  });
});

Then("o produto não deve ser duplicado no carrinho", () => {
  cy.openCart();
  cy.fixture("products").then((products) => {
    cy.get(CartPage.selectors.item)
      .filter(`:contains("${products.backpack}")`)
      .should("have.length", 1);
  });
});

Then(
  "a quantidade total de itens não deve ultrapassar a quantidade de produtos disponíveis",
  () => {
    cy.get(CartPage.selectors.item)
      .its("length")
      .then((cartCount) => {
        cy.visit("/inventory.html");
        cy.get('[data-test="inventory-item"]')
          .its("length")
          .then((availableCount) => {
            expect(cartCount).to.be.at.most(availableCount);
          });
      });
  },
);
