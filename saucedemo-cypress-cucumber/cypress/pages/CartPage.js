class CartPage {
  selectors = {
    item: '[data-test="inventory-item"]',
    cartList: '[data-test="cart-list"]',
    checkout: '[data-test="checkout"]',
  };

  assertProduct(productName) {
    cy.get(this.selectors.cartList).should("contain", productName);
  }

  removeProduct(productName) {
    cy.contains(this.selectors.item, productName)
      .find('[data-test^="remove"]')
      .click();
  }

  assertProductNotPresent(productName) {
    cy.get(this.selectors.cartList).should("not.contain", productName);
  }

  assertEmpty() {
    cy.get(this.selectors.cartList).find(this.selectors.item).should("have.length", 0);
  }

  checkout() {
    cy.get(this.selectors.checkout).click();
  }
}

module.exports = new CartPage();
