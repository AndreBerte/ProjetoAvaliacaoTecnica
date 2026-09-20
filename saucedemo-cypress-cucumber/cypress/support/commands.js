Cypress.Commands.add("login", (userType = "standard") => {
  cy.fixture("users").then((users) => {
    const user = users[userType];

    cy.visit("/");
    cy.get('[data-test="username"]').clear();
    cy.get('[data-test="username"]').type(user.username);
    cy.get('[data-test="password"]').clear();
    cy.get('[data-test="password"]').type(user.password, { log: false });
    cy.get('[data-test="login-button"]').click();
    cy.url().should("include", "/inventory.html");
  });
});

Cypress.Commands.add("addProductToCart", (productName) => {
  cy.contains('[data-test="inventory-item"]', productName)
    .should("be.visible")
    .within(() => {
      cy.get('[data-test^="add-to-cart"]').click();
    });
});

Cypress.Commands.add("openCart", () => {
  cy.get('[data-test="shopping-cart-link"]').should("be.visible").click();
});

Cypress.Commands.add("takeEvidence", (name) => {
  cy.screenshot(name, { capture: "fullPage" });
});
