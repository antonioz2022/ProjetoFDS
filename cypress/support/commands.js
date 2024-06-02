// ***********************************************
// This example commands.js shows you how to
// create various custom commands and overwrite
// existing commands.
//
// For more comprehensive examples of custom
// commands please read more here:
// https://on.cypress.io/custom-commands
// ***********************************************
//
//
// -- This is a parent command --
// Cypress.Commands.add('login', (email, password) => { ... })
//
//
// -- This is a child command --
// Cypress.Commands.add('drag', { prevSubject: 'element'}, (subject, options) => { ... })
//
//
// -- This is a dual command --
// Cypress.Commands.add('dismiss', { prevSubject: 'optional'}, (subject, options) => { ... })
//
//
// -- This will overwrite an existing command --
// Cypress.Commands.overwrite('visit', (originalFn, url, options) => { ... })

Cypress.Commands.add('createAdminUser', () => {
    cy.request({
      method: 'POST',
      url: 'http://127.0.0.1:8000/pet4you_app/api/create_admin/',
      headers: {
        'Content-Type': 'application/json'
      }
    }).then((response) => {
      expect(response.body.status).to.be.oneOf(['admin_created', 'admin_exists']);
    });
  });