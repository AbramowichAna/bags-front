export {};

describe('Login flow', () => {
    beforeEach(() => {
        cy.visit('/login');
    });

    it('should allow a user to log in successfully', () => {
        cy.intercept('POST', '/auth/login', {
            statusCode: 200,
            body: {
                token: 'fake-jwt-token',
                user: {
                    id: 1,
                    email: 'aniabramowich2003@gmail.com',
                    name: 'Anita',
                },
            },
        }).as('loginRequest');

        cy.get('input#email').type('aniabramowich2003@gmail.com');
        cy.get('input#password').type('australwbl');
        cy.get('button').contains('Sign in').click();

        cy.wait('@loginRequest');
        cy.url().should('include', '/home');
    });

    it('should show error when password is empty', () => {
        cy.get('input#email').type('aniabramowich2003@gmail.com');
        cy.get('button').contains('Sign in').click();
        cy.contains('Email and password are required').should('exist');
    });

    it('should show general error on wrong credentials', () => {
        cy.intercept('POST', '/auth/login', {
            statusCode: 401,
            body: { message: 'Invalid email or password' },
        });

        cy.get('input#email').type('wrong@example.com');
        cy.get('input#password').type('wrongpass');
        cy.get('button').contains('Sign in').click();

        cy.contains('Invalid email or password').should('exist');
    });

    it('should navigate to register page when clicking Create account link', () => {
        cy.contains('Create account').click();
        cy.url().should('include', '/register');
    });

});
