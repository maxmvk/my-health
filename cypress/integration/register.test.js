import {StorageStateEnum} from '../../src/app/shared/utils'
import {environment} from '../../src/environments/environment'

describe('RegisterPage', () => {

  beforeEach(() => {
    localStorage.setItem(StorageStateEnum.protectionKey, JSON.stringify(environment.protectionKey))
  })

  it('should display title with text "Sign up" and "* All fields are required"', () => {
    cy.visit('/register');
    cy.contains('Sign up');
    cy.contains('* All fields are required');
  });

  it('should display question "Already have an account?" and link with correct text', () => {
    cy.contains('Already have an account?');
    cy.get('a').contains('Sign in');
  });

  it('should navigate on authentication page after clicking on button "Sign in"', () => {
    cy.get('a').contains('Sign in').click();
    cy.url().should('include', '/authentication')
  });

  it('should display 7 labels with correct text', () => {
    cy.visit('/register');
    cy.get('label').should('have.length', 7);
    cy.get('label').contains('First name');
    cy.get('label').contains('Last name');
    cy.get('label').contains('Date of birth');
    cy.get('label').contains('Phone');
    cy.get('label').contains('Email');
    cy.get('label').contains('Password');
    cy.get('label').contains('Confirm password');
  });

  it('should display 8 inputs, that can have different type, and button "Create account"', () => {
    cy.get('input[type=text]').should('have.length', 4);
    cy.get('input[type=tel]').should('exist');
    cy.get('input[type=email]').should('exist');
    cy.get('input[type=password]').should('have.length', 2);
    cy.get('button[type=submit]').should('be.disabled').contains('Create account');
  });

  it('should change type of password input on click', () => {

    cy.get('input[type=text]').should('have.length', 4);

    cy.get('.hide-control img').eq(1).click();
    cy.get('.hide-control img').eq(2).click();
    cy.get('input[type=text]').should('have.length', 6);
    cy.get('input[type=password]').should('not.exist');

    cy.get('.hide-control img').eq(1).click();
    cy.get('.hide-control img').eq(2).click();
    cy.get('input[type=text]').should('have.length', 4);
    cy.get('input[type=password]').should('exist');
  });

  it('should display error "Field is required" after clicking on inputs and then on some element', () => {
    cy.get('input[type=password]').click({ multiple: true });
    cy.get('input[type=text]').click({ multiple: true , force: true});
    cy.get('input[type=email]').click();
    cy.get('input[type=tel]').click();
    cy.get('label').first().click();
    cy.get('small').should('have.length', 7).contains('Field is required');
    cy.get('button[type=submit]').should('be.disabled');
  });

  it('should display error "Password must be at least 6 characters" after typing into the password input', () => {
    cy.get('input[type=password]').first().type('test');
    cy.get('input[type=password]').last().type('test');
    cy.get('label').first().click();
    cy.get('small').contains('Password must be at least 6 characters');
    cy.get('button[type=submit]').should('be.disabled');
  });

  it('should display error "Phone number must consist of 10 characters" after typing into the tel input', () => {
    cy.get('input[type=tel]').type('0');
    cy.get('label').first().click();
    cy.get('small').contains('Phone number must consist of 10 characters');
    cy.get('button[type=submit]').should('be.disabled');
  });

  it('should display error "Please enter a valid email address" after typing into the email input', () => {
    cy.get('input[type=email]').type('test');
    cy.get('label').first().click();
    cy.get('small').contains('Please enter a valid email address');
    cy.get('button[type=submit]').should('be.disabled');
  });

  xit('should add correct value to input after click date in datepicker', () => {
    cy.get('.hide-control img').first().click();
    cy.get('tbody tr td').eq(1).click();
    cy.get('small').should('have.length', 6);
    cy.get('small').contains('Please enter a valid date').should('not.exist');
  });

  xit('should display error "Please enter a valid date" after typing into the date input', () => {
    cy.reload();
    cy.get('input[type=text]').eq(2).type('test');
    cy.get('label').first().click();
    cy.get('small').contains('Please enter a valid date');
    cy.get('button[type=submit]').should('be.disabled');
  });

  it('should display error "Please enter less than 255 characters" after typing into the input', () => {
    cy.reload();
    cy.get('input[type=password]').first().invoke('val', ''.padStart(256, '|')).click().trigger('input');
    cy.get('input[type=password]').last().invoke('val', ''.padStart(256, '|')).click().trigger('input');
    cy.get('input[type=email]').invoke('val', ''.padStart(256, '|')).click().trigger('input');
    cy.get('input[type=text]').eq(0).invoke('val', ''.padStart(256, '|')).click().trigger('input');
    cy.get('input[type=text]').eq(1).invoke('val', ''.padStart(256, '|')).click().trigger('input');
    cy.get('label').first().click();
    cy.get('small').should('have.length', 5).contains('Please enter less than 255 characters');
    cy.get('button[type=submit]').should('be.disabled');
  });

  it('should be able to register after typing the correct data', () => {
    cy.reload();
    cy.get('input[type=text]').eq(0).type('test name');
    cy.get('input[type=text]').eq(1).type('test surname');
    cy.get('input[type=text]').eq(2).type('01012000');
    cy.get('input[type=email]').type('test@gmail.com');
    cy.get('input[type=tel]').type('0000000000');
    cy.get('input[type=password]').first().type('123456');
    cy.get('input[type=password]').last().type('123456');
    cy.get('button[type=submit]').should('be.enabled');
    cy.get('small').should('not.exist');
  });
});
