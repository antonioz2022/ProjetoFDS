describe('Admin pode checar reports', () => {
    beforeEach(() => {
        cy.createAdminUser();

        cy.visit('/');
        cy.get(':nth-child(1) > .nav-link').click()
        cy.get('#username').type('anton')
        cy.get('#password').type('123456')
        cy.get('button').click()
        cy.get('.banner > .container > h2').invoke('text').should('have.string', "Bem-vindo ao Pet4You!")



    });

    var new_report = "Anúncio com imagens inapropriadas.";

    it('Deve exibir novos reports na listagem de reports do admin.', () => {
        cy.get(':nth-child(4) > .nav-link').click()
        cy.get('body').then($body => {
            if ($body.find('[data-href^="/pet4you_app/report_admin/"]').length > 0) {
                cy.get('[data-href^="/pet4you_app/report_admin/"]').its('length').then(initialCount => {
                    if (initialCount > 0) {
                        cy.get('[data-href^="/pet4you_app/report_admin/"] > :nth-child(1)').first().click();
                        cy.get('a').click();
                    }
                    else {
                        cy.visit('/');
                    }


                    cy.get('body').then($body => {
                        if ($body.find('.services > :nth-child(1) [href*="/pet4you_app/report/"]').length > 0) {
                            cy.get('.services > :nth-child(1) [href*="/pet4you_app/report/"]').click();
                        }
                        else {
                            cy.visit('/pet4you_app/posting');

                            cy.get('#photo').type('https://www.petz.com.br/blog/wp-content/uploads/2021/04/raca-de-cachorro-docil-2.jpg')
                            cy.get('#name').type('Rex');
                            cy.get('#species').type('Cachorro');
                            cy.get('#breed').type('Labrador');
                            cy.get('#age').type('2');
                            cy.get('#description').type('Um labrador muito brincalhão!');

                            cy.get('.posting-submit').click();


                            cy.get('.banner > .container > h2').invoke('text').should('have.string', "Bem-vindo ao Pet4You!")

                            cy.get('.services > :nth-child(1) [href*="/pet4you_app/report/"]').click();
                        }
                        cy.get('#description').type(new_report);
                        cy.get('.button-2').click();

                        cy.get(':nth-child(4) > .nav-link').click();

                        cy.get('[data-href^="/pet4you_app/report_admin/"]').its('length').should('be.gt', initialCount);
                    });

                    cy.get('#description').type(new_report);
                    cy.get('.button-2').click();

                    cy.get(':nth-child(4) > .nav-link').click();

                    cy.get('[data-href^="/pet4you_app/report_admin/"]').its('length').should('be.gt', initialCount);
                });
            } else {
                const initialCount = 0;

                cy.get('body').then($body => {
                    if ($body.find('.services > :nth-child(1) [href*="/pet4you_app/report/"]').length > 0) {
                        cy.get('.services > :nth-child(1) [href*="/pet4you_app/report/"]').click();
                    }
                    else {
                        cy.visit('/pet4you_app/posting');

                        cy.get('#photo').type('https://www.petz.com.br/blog/wp-content/uploads/2021/04/raca-de-cachorro-docil-2.jpg')
                        cy.get('#name').type('Rex');
                        cy.get('#species').type('Cachorro');
                        cy.get('#breed').type('Labrador');
                        cy.get('#age').type('2');
                        cy.get('#description').type('Um labrador muito brincalhão!');

                        cy.get('.posting-submit').click();


                        cy.get('.banner > .container > h2').invoke('text').should('have.string', "Bem-vindo ao Pet4You!")

                        cy.get('.services > :nth-child(1) [href*="/pet4you_app/report/"]').click();
                    }
                    cy.get('#description').type(new_report);
                    cy.get('.button-2').click();

                    cy.get(':nth-child(4) > .nav-link').click();

                    cy.get('[data-href^="/pet4you_app/report_admin/"]').its('length').should('be.gt', initialCount);
                });
            }
        });
    });
    it('Deve checar se o novo report possuí a descrição correta.', () => {
        cy.get(':nth-child(4) > .nav-link').click()
        cy.get('[data-href^="/pet4you_app/report_admin/"] > :nth-child(1)').last().click()
        cy.get('.report').invoke('text').should('contain', new_report);
    });
});