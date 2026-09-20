class CartPage {
  selectors = {
    item: '[data-test="inventory-item"]',
    cartList: '[data-test="cart-list"]',
    checkout: '[data-test="checkout"]',
  };

  assertProduct(productName) {
    cy.get(this.selectors.cartList).should("contain.text", productName);
  }

  removeProduct(productName) {
    cy.contains(this.selectors.cartList, productName)
      .find('[data-test^="remove"]')
      .should("be.visible")
      .click();
  }

  assertProductNotPresent(productName) {
    cy.get(this.selectors.cartList).should("not.contain.text", productName);
  }

  assertEmpty() {
    cy.get(this.selectors.cartList)
      .find(this.selectors.item)
      .should("have.length", 0);
  }

  checkout() {
    cy.get(this.selectors.checkout).should("be.visible").click();
  }
}

module.exports = new CartPage();
