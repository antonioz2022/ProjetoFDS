describe('Pet Filtering Validation Scenarios', () => {
  beforeEach(() => {
    cy.visit('/');
  });

  const filterAndCheck = (inputName, inputValue, expectedText) => {
    cy.get(`input[name="${inputName}"]`).type(inputValue);
    cy.get('.filter-button').click();
    cy.get('.service').each(($el) => {
      cy.wrap($el).should('be.visible').contains(expectedText);
    });
  };

  it('filtragem por espécie', () => {
    filterAndCheck('species', 'dog', 'Espécie: dog');
  });

  it('filtragem por raça', () => {
    filterAndCheck('breed', 'oi', 'Raça: oi');
  });

  it('filtragem por nome', () => {
    filterAndCheck('name', 'rex', 'rex');
  });

  it('Filtragem por idade', () => {
    cy.get('input[name="age"]').type('1');
    cy.get('.filter-button').click();
    cy.get('.service').each(($el) => {
      cy.wrap($el).should('be.visible').contains('Idade: 1');
    });
  });
});