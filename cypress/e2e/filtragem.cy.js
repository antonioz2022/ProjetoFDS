describe('Pet Filtering Validation Scenarios', () => {
  beforeEach(() => {
    cy.visit('/');
    cy.get(':nth-child(1) > .nav-link').click()
    cy.get('#username').type('antonie@1234')
    cy.get('#password').type('pass@12345')
    cy.get('button').click()
    cy.get('.banner > .container > h2').invoke('text').should('have.string', "Bem-vindo ao Pet4You!")
  });

  const filterAndCheck = (inputName, inputValue, expectedText) => {
    cy.get(`input[name="${inputName}"]`).type(inputValue);
    cy.get('input[type="submit"]').click();
    cy.contains(expectedText);
  };

  it('filtragem por espécie com entrada do usuário', () => {
    const userInput = 'dog';
    filterAndCheck('especie', userInput, userInput);
  });

  it('filtragem por raça com entrada do usuário', () => {
    const userInput = 'oi';
    filterAndCheck('raca', userInput, userInput);
  });

  it('filtragem por nome com entrada do usuário', () => {
    const userInput = 'teste';
    filterAndCheck('nome', userInput, userInput);
  });

  it('Filtragem por idade com entrada do usuário', () => {
    const userInput = '1';
    filterAndCheck('idade', userInput, userInput);
  });
});