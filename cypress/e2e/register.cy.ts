
export {};
describe('Register Page', () => {
    beforeEach(() => {
        cy.visit('/register');
    });

    it('shows validation errors when submitting empty form', () => {
        cy.get('button').contains('Sign up').click();

        cy.contains('Email is required').should('be.visible');
        cy.contains('Password is required').should('be.visible');
        cy.contains('Please confirm your password').should('be.visible');
    });

    it('shows error if passwords do not match', () => {
        cy.get('input[id="email"]').type('test@example.com');
        cy.get('input[id="password"]').type('password123');
        cy.get('input[id="confirm-password"]').type('different123');

        cy.get('button').contains('Sign up').click();

        cy.contains('Passwords do not match').should('be.visible');
    });

    it('registers successfully and navigates to login', () => {
        cy.intercept('POST', '/auth/register', {
            statusCode: 200,
            body: {},
        }).as('registerRequest');

        cy.get('input[id="email"]').type('test@example.com');
        cy.get('input[id="password"]').type('password123');
        cy.get('input[id="confirm-password"]').type('password123');

        cy.get('button').contains('Sign up').click();

        cy.wait('@registerRequest').its('request.body').should('deep.equal', {
            email: 'test@example.com',
            password: 'password123',
        });

        cy.url().should('include', '/login');
    });

    it('shows error message if registration fails', () => {
        cy.intercept('POST', '/auth/register', {
            statusCode: 400,
            body: { message: 'Registration failed' },
        }).as('registerFail');

        cy.get('input[id="email"]').type('test@example.com');
        cy.get('input[id="password"]').type('password123');
        cy.get('input[id="confirm-password"]').type('password123');

        cy.get('button').contains('Sign up').click();

        cy.wait('@registerFail');

        cy.contains('Registration failed').should('be.visible');
    });
});
