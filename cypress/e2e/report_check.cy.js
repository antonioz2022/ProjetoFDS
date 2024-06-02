describe('Admin can delete reports', () => {
    beforeEach(() => {
        // Login as admin before each test
        cy.createAdminUser();

        cy.visit('/');
        cy.get(':nth-child(1) > .nav-link').click()
        cy.get('#username').type('anton')
        cy.get('#password').type('123456')
        cy.get('button').click()
        cy.get('.banner > .container > h2').invoke('text').should('have.string', "Bem-vindo ao Pet4You!")

    });

    var new_report = "Anúncio com imagens inapropriadas.";

    it('Deve exibir novos reports na listagem de reports do admin.', () => {
        cy.get(':nth-child(4) > .nav-link').click()
        cy.get('[data-href^="/pet4you_app/report_admin/"]')
            .its('length')
            .then(initialCount => {
                cy.get('[data-href^="/pet4you_app/report_admin/"] > :nth-child(1)').first().click()
                cy.get('a').click()

                cy.get('.services > :nth-child(1) [href*="/pet4you_app/report/"]').click()
                cy.get('#description').type(new_report)
                cy.get('.button-2').click()

                cy.get(':nth-child(4) > .nav-link').click()
                cy.get('[data-href^="/pet4you_app/report_admin/"]')
                    .its('length')
                    .should('be.gt', initialCount);
            });
    });
    it('Deve checar se o novo report possuí a descrição correta.', () => {
        cy.get(':nth-child(4) > .nav-link').click()
        cy.get('[data-href^="/pet4you_app/report_admin/"] > :nth-child(1)').last().click()
        cy.get('.report').invoke('text').should('contain', new_report);
    });
});