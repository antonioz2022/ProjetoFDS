describe('Teste de download de PDF', () => {
  beforeEach(() => {
    cy.visit('/');
    cy.get(':nth-child(1) > .nav-link').click();
    cy.get('#username').type('anton');
    cy.get('#password').type('123456');
    cy.get('button').click();
  });

  it('Deve fazer o download do PDF corretamente', () => {
    // Espera até que a página esteja completamente carregada
    cy.get('.services .service').first().should('be.visible').within(() => {
      // Clicar no link/botão de download do PDF
      cy.get('.button-3').click();
    });

    // Esperar até que o arquivo PDF seja baixado
    cy.waitUntil(() => {
      return cy.task('listDownloads').then(downloads => {
        return downloads.some(download => download.endsWith('.pdf'));
      });
    }, { timeout: 10000, interval: 1000 }); // Espera até 10 segundos, verificando a cada 1 segundo

    // Verificar se o arquivo PDF foi baixado
    cy.task('listDownloads').then(downloads => {
      const downloadedPDF = downloads.find(download => download.endsWith('.pdf'));
      expect(downloadedPDF).to.exist;
    });
  });
});
