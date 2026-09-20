class ProductsPage {
  selectors = {
    title: '[data-test="title"]',
    inventory: '[data-test="inventory-list"]',
    inventoryItem: '[data-test="inventory-item"]',
    cartBadge: '[data-test="shopping-cart-badge"]',
    cartLink: '[data-test="shopping-cart-link"]',
  };

  assertLoaded() {
    cy.url().should("include", "/inventory.html");
    cy.get(this.selectors.title).should("contain", "Products");
    cy.get(this.selectors.inventory).should("be.visible");
  }

  addProduct(productName) {
    cy.contains(this.selectors.inventoryItem, productName).then(($card) => {
      const addButton = $card.find('[data-test^="add-to-cart"]');

      if (addButton.length) {
        cy.wrap($card).find('[data-test^="add-to-cart"]').click();
        return;
      }

      cy.wrap($card).find('[data-test^="remove"]').should("be.visible");
    });
  }

  assertRemoveButtonForProduct(productName) {
    cy.contains(this.selectors.inventoryItem, productName)
      .find('[data-test^="remove"]')
      .should("be.visible");
  }

  addAllProducts() {
    cy.get(this.selectors.inventoryItem).each(($item) => {
      cy.wrap($item)
        .find('[data-test^="add-to-cart"]')
        .should("be.visible")
        .click();
    });
  }

  openCart() {
    cy.get(this.selectors.cartLink).should("be.visible").click();
  }

  assertCartCount(count) {
    cy.get(this.selectors.cartBadge).should("have.text", String(count));
  }
}

module.exports = new ProductsPage();
