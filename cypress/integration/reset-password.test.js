import {StorageStateEnum} from '../../src/app/shared/utils'
import {environment} from '../../src/environments/environment'

describe('ResetPasswordPage', () => {

  beforeEach(() => {
    localStorage.setItem(StorageStateEnum.protectionKey, JSON.stringify(environment.protectionKey))
  })

  it('should display title with text "Reset password"', () => {
    cy.visit('/reset-password');
    cy.contains('Reset password');
  });

  xit('should display email input, label and button with correct text', () => {
    cy.get('input[type=email]').should('exist');
    cy.get('label').contains('Email:');
    cy.get('button[type=submit]').should('be.disabled').contains('Reset');
  });

  it('should display error "Field is required" after clicking on input and then on some element', () => {
    cy.get('input[type=email]').click();
    cy.get('label').click();
    cy.get('button[type=submit]').should('be.disabled');
    cy.get('small').contains('Field is required');
  });

  it('should display error "Please enter a valid email address" after typing into the input', () => {
    cy.get('input[type=email]').type('test');
    cy.get('label').click();
    cy.get('button[type=submit]').should('be.disabled');
    cy.get('small').contains('Please enter a valid email address');
  });

  it('should display error "Please enter less than 255 characters" after typing into the input', () => {
    cy.reload();
    cy.get('input[type=email]').invoke('val', ''.padStart(256, '|')).click().trigger('input');
    cy.get('label').click();
    cy.get('button[type=submit]').should('be.disabled');
    cy.get('small').contains('Please enter less than 255 characters');
  });

  it('should be able to reset password after typing the correct data', () => {
    cy.reload();
    cy.get('input[type=email]').type('test@gmail.com').should('have.value', 'test@gmail.com');
    cy.get('button[type=submit]').should('be.enabled');
    cy.get('small').should('not.exist');
  });
});
