class CheckoutPage {
  selectors = {
    firstName: '[data-test="firstName"]',
    lastName: '[data-test="lastName"]',
    postalCode: '[data-test="postalCode"]',
    continue: '[data-test="continue"]',
    finish: '[data-test="finish"]',
    error: '[data-test="error"]',
    summary: '[data-test="checkout-summary-container"]',
    complete: '[data-test="checkout-complete-container"]',
    total: '[data-test="total-label"]',
  };

  continue() {
    cy.get(this.selectors.continue).should("be.visible").click();
  }

  assertErrorContains(message) {
    cy.get(this.selectors.error)
      .should("be.visible")
      .and("contain.text", message);
  }

  assertSummaryContains(productName) {
    cy.get(this.selectors.summary)
      .should("be.visible")
      .and("contain.text", productName);
  }

  assertTotalVisible() {
    cy.get(this.selectors.total).should("be.visible");
  }

  finish() {
    cy.get(this.selectors.finish).should("be.visible").click();
  }

  assertPurchaseCompleted() {
    cy.url().should("include", "/checkout-complete.html");
    cy.get(this.selectors.complete).should("be.visible");
  }
}

module.exports = new CheckoutPage();