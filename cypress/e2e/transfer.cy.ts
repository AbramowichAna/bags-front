export {};

describe('Transfer Functionality - E2E Test (Real Backend)', () => {
    beforeEach(() => {
        cy.visit('/login');
        cy.get('input#email').type('aniabramowich2003@gmail.com');
        cy.get('input#password').type('australwbl');
        cy.get('button').contains('Sign in').click();
    });

    it('should open the transfer dialog and complete a successful transfer', () => {
        // Abrir el diálogo
        cy.contains('Transfer').click();

        // Esperar que el diálogo esté visible
        cy.get('[role="dialog"]').should('be.visible').within(() => {
            // Llenar los campos dentro del diálogo
            cy.get('input').eq(0).type('test@example.com');
            cy.get('input[type="number"]').type('10');
            cy.get('button').contains('Transfer').click();

        });

        // Confirmar que el diálogo se cerró
        cy.get('[role="dialog"]').should('not.exist');

        // Verificar que la transferencia aparezca en el historial (opcional)
        cy.contains('test@example.com');
        cy.contains('$ 10');
    });

    it('should show insufficient balance error', () => {
        cy.contains('Transfer').click();
        cy.get('[role="dialog"]').within(() => {
            cy.get('input').first().type('test@example.com');
            cy.get('input[type="number"]').type('1000000');
            cy.get('button').contains('Transfer').click();
            cy.contains('Insufficient balance.').should('be.visible');
        });
    });

});
