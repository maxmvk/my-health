import {StorageStateEnum} from '../../src/app/shared/utils'
import {environment} from '../../src/environments/environment'

describe('UpdatePasswordPage', () => {

  beforeEach(() => {
    localStorage.setItem(StorageStateEnum.protectionKey, JSON.stringify(environment.protectionKey))
  })

  it('should display title with text "Enter new password"', () => {
    cy.visit('/update-password/token');
    cy.contains('Enter new password');
  });

  it('should display 2 password inputs, labels and button with correct text', () => {
    cy.get('input[type=password]').should('have.length', 2);
    cy.get('label').should('have.length', 2);
    cy.get('label').first().contains('Password');
    cy.get('label').last().contains('Confirm password');
    cy.get('button[type=submit]').should('be.disabled').contains('Save');
  });

  it('should display error "Field is required" after clicking on input and then on some element', () => {
    cy.get('input[type=password]').first().click();
    cy.get('input[type=password]').last().click();
    cy.get('label').first().click();
    cy.get('small').contains('Field is required');
    cy.get('button[type=submit]').should('be.disabled');
  });

  it('should display error "Password must be at least 6 characters" after typing into the input', () => {
    cy.get('input[type=password]').first().type('test');
    cy.get('input[type=password]').last().type('test');
    cy.get('label').first().click();
    cy.get('small').contains('Password must be at least 6 characters');
    cy.get('button[type=submit]').should('be.disabled');
  });

  it('should display error "Please enter less than 255 characters" after typing into the input', () => {
    cy.get('input[type=password]').first().invoke('val', ''.padStart(256, '|')).click().trigger('input');
    cy.get('input[type=password]').last().invoke('val', ''.padStart(256, '|')).click().trigger('input');
    cy.get('label').first().click();
    cy.get('small').contains('Please enter less than 255 characters');
    cy.get('button[type=submit]').should('be.disabled');
  });

  it('should change type of password input on click', () => {

    cy.get('input[type=text]').should('not.exist');

    cy.get('.hide-control img').click({ multiple: true });
    cy.get('input[type=text]').should('exist');
    cy.get('input[type=password]').should('not.exist');

    cy.get('.hide-control img').click({ multiple: true });
    cy.get('input[type=text]').should('not.exist');
    cy.get('input[type=password]').should('exist');
  });

  it('should be able to update password after typing the correct data', () => {
    cy.reload();
    cy.get('input[type=password]').first().type('123456');
    cy.get('input[type=password]').last().type('123456');
    cy.get('button[type=submit]').should('be.enabled');
    cy.get('small').should('not.exist');
  });

});
