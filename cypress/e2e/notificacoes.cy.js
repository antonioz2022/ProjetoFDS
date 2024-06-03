describe('teste de notificação nas últimas 24 horas', () => {
    it('mostra a notificação de quantos pets foram adicionados nas últimas 24 horas', () => {
        cy.visit('/');
        cy.get(':nth-child(1) > .nav-link').click()
        cy.get('#username').type('antonie@1234')
        cy.get('#password').type('pass@12345')
        cy.get('button').click()

        cy.wait(2000);

        // Verifica se a notificação existe no DOM
        cy.contains('Número de pets criados nas últimas 24 horas:').should('be.visible');

        // Verifica se a mensagem foi registrada no console
        cy.window().then((win) => {
            const consoleSpy = cy.spy(win.console, 'log');
            cy.wrap(consoleSpy).should('be.calledWithMatch', /Número de pets criados nas últimas 24 horas:/);
        });
    });
});