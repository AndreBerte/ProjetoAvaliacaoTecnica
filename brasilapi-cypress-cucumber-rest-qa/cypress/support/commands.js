Cypress.Commands.add('saveApiEvidence', (name, response) => {
  cy.writeFile(`evidence/${name}.json`, {
    request: { status: response.status, headers: response.headers },
    response: response.body
  });
});
