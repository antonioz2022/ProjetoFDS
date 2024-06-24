describe('Teste de download de PDF', () => {
  beforeEach(() => {
    cy.visit('/');
    cy.get(':nth-child(1) > .nav-link').click();
    cy.get('#username').type('anton');
    cy.get('#password').type('123456');
    cy.get('button').click();
  });

  it('Deve fazer o download do PDF corretamente', () => {
    // Clicar no link/botão de download do PDF
    cy.get('.content > .container > .services > .service > .button-3').first().click();

    // Esperar até que o arquivo PDF seja baixado
    cy.wait(5000); // Espera 5 segundos para o download ser completado

    // Verificar se o arquivo PDF foi baixado
    cy.task('listDownloads').then(downloads => {
      const downloadedPDF = downloads.find(download => download.endsWith('.pdf'));
      expect(downloadedPDF).to.exist;
    });
  });
});
