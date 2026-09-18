Cypress.Commands.add("login", (userType = "standard") => {
  cy.fixture("users").then((users) => {
    const user = users[userType];

    cy.visit("/");
    cy.get('[data-test="username"]').clear().type(user.username);
    cy.get('[data-test="password"]').clear().type(user.password, { log: false });
    cy.get('[data-test="login-button"]').click();
    cy.url().should("include", "/inventory.html");
  });
});

Cypress.Commands.add("addProductToCart", (productName) => {
  cy.contains('[data-test^="add-to-cart"]', productName)
    .should("be.visible")
    .click();
});

Cypress.Commands.add("openCart", () => {
  cy.get('[data-test="shopping-cart-link"]').click();
});

Cypress.Commands.add("takeEvidence", (name) => {
  cy.screenshot(name, { capture: "fullPage" });
});