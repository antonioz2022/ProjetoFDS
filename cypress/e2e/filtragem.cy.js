describe('Pet Filtering Validation Scenarios', () => {
  beforeEach(() => {
    cy.visit('/');
  });

  const filterAndCheck = (inputName, inputValue, expectedText) => {
    cy.get(`input[name="${inputName}"]`).type(inputValue);
    cy.get('input[type="submit"]').click();
    cy.contains('div', expectedText);
  };

  it('filtragem por espécie', () => {
    filterAndCheck('especie', 'dog', 'dog');
  });

  it('filtragem por raça', () => {
    filterAndCheck('raca', 'oi', 'oi');
  });

  it('filtragem por nome', () => {
    filterAndCheck('nome', 'teste', 'teste');
  });

  it('Filtragem por idade', () => {
    filterAndCheck('idade', '1', '1');
  });
});