describe('teste de notificação nas últimas 24 horas', () => {
    it('mostra a notificação de quantos pets foram adicionados nas últimas 24 horas', () => {
        cy.visit('/');
        cy.get(':nth-child(1) > .nav-link').click()
        cy.get('#username').type('antonie@1234')
        cy.get('#password').type('pass@12345')
        cy.get('button').click()

        // Verifica se a notificação existe no DOM
        cy.contains('Número de pets criados nas últimas 24 horas:').should('exist');

    });
});