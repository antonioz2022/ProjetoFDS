describe('Testes de Validação da Funcionalidade de Criação de Pet', () => {

    beforeEach(() => {
        cy.visit('/');
        cy.get(':nth-child(1) > .nav-link').click()
        cy.get('#username').type('antonie@1234');
        cy.get('#password').type('pass@12345');
        cy.get('button[type="submit"]').click();
        cy.url().should('include', '/');
    });
     /* */
    it('Deve exibir mensagem de erro ao submeter formulário incompleto', () => {

        cy.visit('/pet4you_app/posting');

        cy.get('.posting-submit').click();

        cy.contains('span', 'Age is required').should('be.visible');
        cy.contains('span', 'Name is required').should('be.visible');
        cy.contains('span', 'Breed is required').should('be.visible');
        cy.contains('span', 'Species is required').should('be.visible');
    });
    /* */
    it('Deve exibir mensagem de erro ao submeter formulário com idade acíma de 99', () =>{
        cy.visit('/pet4you_app/posting');

        cy.get('#photo').type('https://www.petz.com.br/blog/wp-content/uploads/2021/04/raca-de-cachorro-docil-2.jpg')
        cy.get('#name').type('Rex');
        cy.get('#species').type('Cachorro');
        cy.get('#breed').type('Labrador');
        cy.get('#age').type('200');
        cy.get('#description').type('Um labrador muito brincalhão!');

        cy.get('.posting-submit').click();

        cy.contains('span', 'Age has to be under 99').should('be.visible');
    })
     /* */
    it('Deve redirecionar para home se sucesso ao criar um pet', () => {
        cy.visit('/pet4you_app/posting');

        cy.get('#photo').type('https://www.petz.com.br/blog/wp-content/uploads/2021/04/raca-de-cachorro-docil-2.jpg')
        cy.get('#name').type('Rex');
        cy.get('#species').type('Cachorro');
        cy.get('#breed').type('Labrador');
        cy.get('#age').type('2');
        cy.get('#description').type('Um labrador muito brincalhão!');

        cy.get('.posting-submit').click();

        
        cy.get('.banner > .container > h2').invoke('text').should('have.string', "Bem-vindo ao Pet4You!")
    });
})