import {StorageStateEnum} from '../../src/app/shared/utils'
import {environment} from '../../src/environments/environment'

describe('SignInPage', () => {

  beforeEach(() => {
    localStorage.setItem(StorageStateEnum.protectionKey, JSON.stringify(environment.protectionKey))
  })

  it('should display title with text "Become the CEO of your health"', () => {
    cy.visit('/');
    cy.contains('Become the CEO of your health');
  });

  it('should display background and logo', () => {
    cy.get('.background').should('be.visible');
    cy.get(`img[src="assets/images/logo.png"]`).should('exist');
  });

  it('should display 2 links', () => {
    cy.get('a').should('have.length', 2);
  });

  it('should display links with correct text', () => {
    cy.get('a').first().contains('Sign up/Register');
    cy.get('a').last().contains('Sign in');
  });

  it('should navigate on register page after clicking on button "Sign up/Register"', () => {
    cy.get('a').contains('Sign up/Register').click();
    cy.url().should('include', '/register')
  });

  it('should navigate on authentication page after clicking on button "Sign in"', () => {
    cy.get('a').contains('Sign in').click();
    cy.url().should('include', '/authentication')
  });
});
