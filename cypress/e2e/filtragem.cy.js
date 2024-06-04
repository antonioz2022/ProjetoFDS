describe('Pet Filtering Validation Scenarios', () => {
  beforeEach(() => {
    cy.visit('/');
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