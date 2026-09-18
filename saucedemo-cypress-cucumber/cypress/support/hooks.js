const {
  Before,
  After,
  BeforeAll,
  AfterAll,
} = require("@badeball/cypress-cucumber-preprocessor");

BeforeAll(() => {
  cy.log("=== Suite started ===");
});

Before(() => {
  cy.clearCookies();
  cy.clearLocalStorage();
  cy.intercept("**/*").as("networkRequest");
});

Before({ tags: "@smoke" }, () => {
  cy.log("Executing smoke scenario");
});

Before({ tags: "@negative" }, () => {
  cy.log("Executing negative scenario");
});

After(function (scenario) {
  const name =
    scenario?.pickle?.name?.replace(/[^a-zA-Z0-9-_]+/g, "-") ||
    "scenario";

  const status = scenario?.result?.status || "unknown";

  cy.takeEvidence(`${status}-${name}`);

  if (status === "FAILED") {
    cy.log(`FAILED scenario: ${name}`);
  }
});

AfterAll(() => {
  cy.log("=== Suite finished ===");
});