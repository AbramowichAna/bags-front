export {};
function generateUniqueEmail() {
    const timestamp = Date.now();
    return `alice@example.com`;
}
const uniqueEmail = generateUniqueEmail();
describe('DEBIN Functionality - E2E Test (Real Backend)', () => {
    beforeEach(() => {
        cy.visit('/login');
        cy.get('input#email').type('test@example.com');
        cy.get('input#password').type('password');
        cy.get('button').contains('Sign in').click();
    });

    it('should open the Debin dialog and complete a successful Debin request', () => {
        cy.contains('Debin').click();

        cy.get('[role="dialog"]').within(() => {
            cy.get('input').eq(0).type(uniqueEmail);
            cy.get('input[type="number"]').type('5');

            cy.get('[id="service-type-label"]').should('exist');
            cy.get('[aria-labelledby="service-type-label"]').click();
        });

        cy.get('ul[role="listbox"]').within(() => {
            cy.contains('Bank').click();
        });
        cy.get('input').last().type('bank');
        cy.get('button').contains('Request').click();
        cy.get('[role="dialog"]').should('not.exist');

        cy.contains('Debin request sent!').should('be.visible');
    });

    it('should show error for missing required fields', () => {
        cy.contains('Debin').click();

        cy.get('[role="dialog"]').should('be.visible').within(() => {
            cy.get('button').contains('Request').click();
            cy.contains('All fields are required and amount must be positive.').should('be.visible');
        });
    });

    it('should show error for invalid (negative) amount', () => {
        cy.contains('Debin').click();

        cy.get('[role="dialog"]').within(() => {
            cy.get('input').eq(0).type(uniqueEmail);
            cy.get('input[type="number"]').type('-15');

            cy.get('[id="service-type-label"]').should('exist');
            cy.get('[aria-labelledby="service-type-label"]').click();
        });

        cy.get('ul[role="listbox"]').within(() => {
            cy.contains('Bank').click();
        });
        cy.get('input').last().type('bank');
        cy.get('button').contains('Request').click();
        cy.contains('All fields are required and amount must be positive.').should('be.visible');
    });

});
