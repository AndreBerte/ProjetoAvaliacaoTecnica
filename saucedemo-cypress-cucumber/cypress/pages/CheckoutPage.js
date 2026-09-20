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

  fillCustomerData(data) {
    cy.get(this.selectors.firstName).clear();
    cy.get(this.selectors.firstName).type(data.firstName);

    cy.get(this.selectors.lastName).clear();
    cy.get(this.selectors.lastName).type(data.lastName);

    cy.get(this.selectors.postalCode).clear();
    cy.get(this.selectors.postalCode).type(data.postalCode);
  }

  continue() {
    cy.get(this.selectors.continue).click();
  }

  assertErrorContains(message) {
    cy.get(this.selectors.error).should("contain.text", message);
  }

  assertSummaryContains(productName) {
    cy.get(this.selectors.summary).should("contain.text", productName);
  }

  assertTotalVisible() {
    cy.get(this.selectors.total).should("be.visible");
  }

  finish() {
    cy.get(this.selectors.finish).click();
  }

  assertPurchaseCompleted() {
    cy.get(this.selectors.complete).should("be.visible");
    cy.url().should("include", "/checkout-complete.html");
  }
}

module.exports = new CheckoutPage();
