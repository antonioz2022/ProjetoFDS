describe('teste de notificação nas últimas 24 horas', () => {
    it('mostra a notificação de quantos pets foram adicionados nas últimas 24 horas', () => {
      
      cy.visit('/');
  
      
      cy.get('#username').type('antonie@1234')
      cy.get('#password').type('pass@12345')
      cy.get('button').click()
  
      
      cy.wait(2000);
  
      // Verifica se a notificação existe
      cy.contains('Número de pets criados nas últimas 24 hours:').should('be.visible');
    });
  });
  