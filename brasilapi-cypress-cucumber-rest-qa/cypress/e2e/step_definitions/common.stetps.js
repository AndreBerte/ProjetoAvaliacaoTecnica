const { Given, When, Then } = require('@badeball/cypress-cucumber-preprocessor');

const BrasilApiPage = require('../../pages/BrasilApiPage');
const BrasilApiClient = require( '../../services/BrasilApiClient');

let lastResponse;

Given('que a BrasilAPI está disponível', function () {return "pending";});

When('consulto um CEP válido', () => BrasilApiClient.getCep().then((r) => { lastResponse = r; }));
When('consulto um CEP inexistente', () => BrasilApiClient.getCep(BrasilApiPage.data.cep.notFound).then((r) => { lastResponse = r; }));
When('consulto um CEP inválido', () => BrasilApiClient.getCep(BrasilApiPage.data.cep.invalid).then((r) => { lastResponse = r; }));
When('consulto um banco por código válido', function () {return "pending";});
When('consulto um CNPJ válido', function () {return "pending";});
When('consulto um CNPJ inválido', function () {return "pending";});

When('executo exatamente o limite configurado de consultas de CEP', () => {
  const total = BrasilApiPage.maxRequests;
  Cypress._.times(total, (index) => {
    BrasilApiClient.getCep().then((r) => {
      expect(r.status).to.be.within(200, 599);
      cy.saveApiEvidence(`ct007-request-${index + 1}`, r);
    });
  });
});

Then('a resposta HTTP deve ser {int}', (status) => expect(lastResponse.status).to.eq(status));
Then('a resposta deve possuir Content-Type JSON', () => expect(lastResponse.headers['content-type']).to.include('application/json'));
Then('a resposta de CEP deve conter os campos obrigatórios', () => {
  expect(lastResponse.body).to.include.all.keys('cep', 'state', 'city', 'neighborhood', 'street');
  expect(lastResponse.body.cep).to.be.a('string');
  expect(lastResponse.body.state).to.be.a('string');
});
Then('a resposta de erro deve possuir contrato ErrorMessage', () => {
  expect(lastResponse.body).to.be.an('object');
  expect(lastResponse.body).to.have.all.keys('name', 'message', 'type');
  expect(lastResponse.body.name).to.be.a('string');
  expect(lastResponse.body.message).to.be.a('string');
  expect(lastResponse.body.type).to.be.a('string');
});
Then('a resposta do banco deve conter code name e ispb', () => {
  expect(lastResponse.body).to.include.all.keys('code', 'name', 'ispb');
});
Then('a resposta de CNPJ deve conter dados cadastrais', () => {
  expect(lastResponse.body).to.be.an('object');
  expect(lastResponse.body).to.include.any.keys('uf', 'cep', 'qsa');
});
