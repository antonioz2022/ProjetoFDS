describe('Teste de Adição de Pet à Lista de Favoritos', () => {

    beforeEach(() => {

        cy.visit('/');
        cy.get(':nth-child(1) > .nav-link').click()
        cy.get('#username').type('antonie@1234');
        cy.get('#password').type('pass@12345');
        cy.get('button[type="submit"]').click();
        cy.url().should('include', '/');
    });

    it('Deve adicionar um pet à lista de favoritos com sucesso', () => {

        cy.visit('pet4you_app/favorite');

        cy.get('.container img').its('length').then((initialFavoritesCount) => {

            cy.visit('/');


            cy.get('.container img').its('length').then((petcount) => {
                expect(petcount).to.be.gte(1);
            });


            cy.get(':nth-child(1) > form > .button-2').click();

            cy.visit('/pet4you_app/favorite');

            cy.get('.container img').its('length').should('eq', initialFavoritesCount + 1);
        });
    });

    it('Deve remover um pet da lista de favortios com sucesso', () => {
        cy.visit('pet4you_app/favorite');

        cy.get('.container img').its('length').then((initialFavoritesCount) => {
            expect(initialFavoritesCount).to.be.gte(1);

            cy.get('.container > .content > :nth-child(1) button').click()

            cy.get('.container img').its('length').should('eq', initialFavoritesCount - 1);
        })
    })
});