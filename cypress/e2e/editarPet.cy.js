describe('Testes de Validação da Funcionalidade de edição de anúncio de Pet', () => {
    beforeEach(() => {
        
        cy.visit('/');
        cy.get(':nth-child(1) > .nav-link').click()
        cy.get('#username').type('antonie@1234');
        cy.get('#password').type('pass@12345');
        cy.get('button[type="submit"]').click();
        cy.url().should('include', '/');
    });

    it('Deve exibir mensagem de erro ao submeter formulário com idade acíma de 99', () =>{
        cy.visit('/pet4you_app/list')

        cy.get(':nth-child(1) > div > .button-2').click()
        cy.get('#name').clear().type('Chibi')
        cy.get('#species').clear().type('Cachorro')
        cy.get('#breed').clear().type('Labrador')
        cy.get('#age').clear().type('200')
        cy.get('#description').clear().type('Muito brincalhão!')
        cy.get('#photo').clear().type('https://www.petz.com.br/blog/wp-content/uploads/2021/04/raca-de-cachorro-docil-2.jpg')

        cy.get('.btn-custom').click()

        cy.contains('span', 'Age has to be under 99').should('be.visible');
    })

    it('Deve exibir mensagem de erro caso algum desses dados: nome, espécie, raça ou idade, estejam vazios ', () => {
        
        cy.visit('/pet4you_app/list');

        cy.get(':nth-child(1) > div > .button-2').click()
        cy.get('#name').clear()
        cy.get('#species').clear()
        cy.get('#breed').clear()
        cy.get('#age').clear()

        cy.get('.btn-custom').click()

        cy.contains('span', 'Age is required').should('be.visible');
        cy.contains('span', 'Name is required').should('be.visible');
        cy.contains('span', 'Breed is required').should('be.visible');
        cy.contains('span', 'Species is required').should('be.visible');
    });

    it('Pet editado com sucesso', () => {
        cy.visit('/pet4you_app/list')
        
        cy.get(':nth-child(1) > div > .button-2').click()
        cy.get('#name').clear().type('Chibi')
        cy.get('#species').clear().type('Cachorro')
        cy.get('#breed').clear().type('Labrador')
        cy.get('#age').clear().type('5')
        cy.get('#description').clear().type('Muito brincalhão!')
        cy.get('#photo').clear().type('https://www.petz.com.br/blog/wp-content/uploads/2021/04/raca-de-cachorro-docil-2.jpg')

        cy.get('.btn-custom').click()

        cy.get('.banner > .container > h2').invoke('text').should('have.string', "Bem-vindo ao Pet4You!")
    })

    
})