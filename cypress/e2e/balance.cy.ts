export {};

describe('Wallet Balance - E2E Test (Real Backend)', () => {
    beforeEach(() => {
        cy.visit('/login');
        cy.get('input#email').type('test@example.com');
        cy.get('input#password').type('password');
        cy.get('button').contains('Sign in').click();
    });

    it('should display the user balance after login', () => {
        cy.contains('Balance: $', { timeout: 10000 }).should('exist').then(($balanceText) => {
            const text = $balanceText.text();
            expect(text).to.match(/Balance: \$\s?\d+(\.\d{1,2})?/);
        });
    });
});
