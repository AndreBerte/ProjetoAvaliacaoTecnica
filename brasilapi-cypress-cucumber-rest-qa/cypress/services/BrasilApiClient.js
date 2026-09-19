import BrasilApiPage from '../pages/BrasilApiPage';

class BrasilApiClient {
  request(method, path, options = {}) {
    return cy.request({
      method,
      url: BrasilApiPage.endpoint(path),
      failOnStatusCode: false,
      headers: { Accept: 'application/json', ...(options.headers || {}) },
      body: options.body,
      qs: options.qs
    });
  }

  getCep(cep = BrasilApiPage.data.cep.valid) { return this.request('GET', `/cep/v1/${cep}`); }
  getBank(code = BrasilApiPage.data.bank.validCode) { return this.request('GET', `/banks/v1/${code}`); }
  getCnpj(cnpj = BrasilApiPage.data.cnpj.valid) { return this.request('GET', `/cnpj/v1/${cnpj}`); }
}

export default new BrasilApiClient();
