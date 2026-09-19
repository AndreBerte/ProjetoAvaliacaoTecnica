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
    cy.contains('[data-test^="add-to-cart"]', productName).click();
  }

  addAllProducts() {
    cy.get('[data-test^="add-to-cart"]').each(($button) => {
      cy.wrap($button).click();
    });
  }

  openCart() {
    cy.get(this.selectors.cartLink).click();
  }

  assertCartCount(count) {
    cy.get(this.selectors.cartBadge).should("have.text", String(count));
  }
}

module.exports = new ProductsPage();
