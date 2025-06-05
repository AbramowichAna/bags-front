export {};

describe('Transfer History - E2E Test (Real Backend)', () => {
    beforeEach(() => {
        cy.visit('/login');
        cy.get('input#email').type('aniabramowich2003@gmail.com');
        cy.get('input#password').type('australwbl');
        cy.get('button').contains('Sign in').click();

        cy.contains('Transfer History', { timeout: 10000 }).should('exist');
    });

    it('should display the first page of transfer history', () => {
        cy.contains('Transfer History');

        cy.get('table').within(() => {
            cy.get('thead').contains('From');
            cy.get('tbody tr').should('have.length.at.least', 1);
        });

        cy.get('tbody tr').first().within(() => {
            cy.get('td').eq(0).invoke('text').should('not.be.empty');
            cy.get('td').eq(1).invoke('text').should('not.be.empty');
            cy.get('td').eq(2).invoke('text').should('contain', '$');
            cy.get('td').eq(3).invoke('text').should('match', /IN|OUT/);
            cy.get('td').eq(4).invoke('text').should('match', /\d{1,2}\/\d{1,2}\/\d{2,4}/);
        });
    });

    it('should navigate to the next page if multiple pages exist', () => {
        cy.get('ul.MuiPagination-ul li button').then(($buttons) => {
            if ($buttons.length > 1) {
                cy.wrap($buttons).eq(2).click();
                cy.get('table').should('exist');
                cy.get('tbody tr').should('have.length.at.least', 1);
            } else {
                cy.log('Only one page of transfers available.');
            }
        });
    });
});
