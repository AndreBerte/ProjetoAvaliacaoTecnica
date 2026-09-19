import { Before, After } from '@badeball/cypress-cucumber-preprocessor';

Before(() => cy.log('API scenario started'));
After(function () { cy.log(`API scenario finished: ${this.pickle?.name || 'scenario'}`); });
