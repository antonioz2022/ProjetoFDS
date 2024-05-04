describe('test suite 1', () => {
    it('Pet criado com sucesso', () => {
        cy.visit('/');
        cy.get(':nth-child(1) > .nav-link').click()
        cy.get('#username').type('anton')
        cy.get('#password').type('123456')
        cy.get('button').click()
        cy.visit('/pet4you_app/posting')
        cy.get('#photo').type('https://www.petz.com.br/blog/wp-content/uploads/2021/04/raca-de-cachorro-docil-2.jpg')
        cy.get('#name').type('Tobi')
        cy.get('#species').type('Cachorro')
        cy.get('#breed').type('Golden')
        cy.get('#age').type('3')
        cy.get('#description').type('Muito brincalhão!')
        cy.get('.posting-submit').click()
        cy.get('.banner > .container > h2').invoke('text').should('have.string', "Bem-vindo ao Pet4You!")
    })
})