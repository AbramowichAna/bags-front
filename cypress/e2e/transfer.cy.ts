export {};

describe('Transfer Functionality - E2E Test (Real Backend)', () => {
    beforeEach(() => {
        cy.visit('/login');
        cy.get('input#email').type('test@example.com');
        cy.get('input#password').type('password');
        cy.get('button').contains('Sign in').click();
    });

    it('should open the transfer dialog and complete a successful transfer', () => {

        cy.contains('Transfer').click();

        cy.get('[role="dialog"]').should('be.visible').within(() => {
            cy.get('input').eq(0).type('test2@example.com');
            cy.get('input[type="number"]').type('10');
            cy.get('button').contains('Transfer').click();

        });

        cy.get('[role="dialog"]').should('not.exist');

        cy.contains('test2@example.com');
        cy.contains('$ 10');
    });

    it('should show insufficient balance error', () => {
        cy.contains('Transfer').click();
        cy.get('[role="dialog"]').within(() => {
            cy.get('input').first().type('test2@example.com');
            cy.get('input[type="number"]').type('1000000000');
            cy.get('button').contains('Transfer').click();
            cy.contains('Insufficient balance.').should('be.visible');
        });
    });

});
