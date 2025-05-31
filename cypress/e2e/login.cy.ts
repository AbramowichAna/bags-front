export {};

describe('Login flow', () => {
    beforeEach(() => {
        cy.visit('/login');
    });

    it('should allow a user to log in successfully', () => {
        cy.get('input#email').type('aniabramowich2003@gmail.com');
        cy.get('input#password').type('australwbl');
        cy.get('button').contains('Sign in').click();
        cy.url().should('include', '/home');
    });

    it('should show error when password is empty', () => {
        cy.get('input#email').type('aniabramowich2003@gmail.com');
        cy.get('button').contains('Sign in').click();
        cy.contains('Email and password are required').should('exist');
    });

    it('should show general error on wrong credentials', () => {
        cy.get('input#email').type('wrong@example.com');
        cy.get('input#password').type('wrongpass');
        cy.get('button').contains('Sign in').click();
        cy.contains('Error logging in').should('exist');
    });

    it('should navigate to register page when clicking Create account link', () => {
        cy.contains('Create account').click();
        cy.url().should('include', '/register');
    });

});
