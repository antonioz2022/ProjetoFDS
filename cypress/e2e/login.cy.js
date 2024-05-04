describe('test suite Login', () => {
    it('Login com sucesso', () => {
        cy.visit('/');
        cy.get(':nth-child(1) > .nav-link').click()
        cy.get('#username').type('antonie@1234')
        cy.get('#password').type('pass@12345')
        cy.get('button').click()
        cy.get('.banner > .container > h2').invoke('text').should('have.string', "Bem-vindo ao Pet4You!")

    })
})