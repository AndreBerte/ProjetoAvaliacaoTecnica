class BrasilApiPage {
  constructor() {
    // Massa de dados mantida nesta camada para compatibilidade com o framework existente.
    this.data = {
      cep: { valid: '05010000', notFound: '00000000', invalid: 'ABC12345' },
      bank: { validCode: '260' },
      cnpj: { valid: '19131243000197', invalid: '123456789' }
    };
  }

  get baseUrl() { return Cypress.env('apiBaseUrl') || Cypress.config('baseUrl'); }
  get maxRequests() { return Number(Cypress.env('maxRequests') || 10); }
  endpoint(path) { return `${this.baseUrl}/api${path}`; }
}

export default new BrasilApiPage();
