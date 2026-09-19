class LoginPage {
  selectors = {
    username: '[data-test="username"]',
    password: '[data-test="password"]',
    loginButton: '[data-test="login-button"]',
    error: '[data-test="error"]',
  };

  visit() {
    cy.visit("/");
  }

  login(username, password) {
    cy.get(this.selectors.username).clear();
    cy.get(this.selectors.username).type(username);

    cy.get(this.selectors.password).clear();
    cy.get(this.selectors.password).type(password, { log: false });

    cy.get(this.selectors.loginButton).click();
  }

  assertError() {
    cy.get(this.selectors.error).should("be.visible");
  }
}

module.exports = new LoginPage();
