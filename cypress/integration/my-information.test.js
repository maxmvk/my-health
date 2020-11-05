import {StorageStateEnum} from '../../src/app/shared/utils'
import {environment} from '../../src/environments/environment'

describe('MyInformationPage', () => {

  const query = `mutation {
    userSignIn(email: "caror86265@99mimpi.com", password: "123456") {
      accessToken
      refreshToken
      firstTime
    }
  }`;

  const requestSignIn = {
    method: 'POST',
    url: environment.uri,
    body: {query},
    failOnStatusCode: false
  }

  beforeEach(function () {
    cy.viewport(1366, 1024);
    localStorage.setItem(StorageStateEnum.protectionKey, JSON.stringify(environment.protectionKey))
  })

  xit('should login and display title with text "My Information", and full name above the avatar', () => {
    cy.request(requestSignIn).then((resp) => {
      localStorage.setItem('accessToken', resp.body.data.userSignIn.accessToken);
      localStorage.setItem('refreshToken', resp.body.data.userSignIn.refreshToken);
    });
    cy.visit('/my-information');
    cy.url().should('include', '/my-information');
    cy.contains('My Information');
    cy.get('h2').contains('test name test surname');
  });

  xit('should display header with 2 buttons and full name', () => {
    cy.get('span').contains('test name test surname');
    cy.get('button').eq(0).should('be.enabled');
    cy.get('button').eq(1).should('be.enabled');
    cy.get('button img[src="assets/images/logout.svg"').should('exist');
  });

  xit('should display 2 subtitles and 8 labels with correct text', () => {
    cy.get('h4').should('have.length', 2);
    cy.get('h4').contains('Personal information');
    cy.get('h4').contains('Physical details');
    cy.get('label').should('have.length', 8);
    cy.get('label').contains('First name');
    cy.get('label').contains('Last name');
    cy.get('label').contains('Date of birth');
    cy.get('label').contains('Phone');
    cy.get('label').contains('Email');
    cy.get('label').contains('Gender');
    cy.get('label').contains('Height');
    cy.get('label').contains('Weight');
  });

  xit('should display mat-select, 9 inputs with correct value and enabled "Save" button', () => {
    cy.get('input[type=text]').should('have.length', 7);
    cy.get('input[type=text]').eq(0).should('have.value', 'test name');
    cy.get('input[type=text]').eq(1).should('have.value', 'test surname');
    cy.get('input[type=text]').eq(2).should('have.value', '+1');
    cy.get('input[type=text]').eq(3).should('have.value', '1/1/2000');
    cy.get('input[type=tel]').should('have.value', '000-000-0000');
    cy.get('input[type=email]').should('have.value', 'caror86265@99mimpi.com');
    cy.get('mat-select').should('exist');
    cy.get('button[type=submit]').should('be.enabled');
  });

  xit('should display text "Add photo", button for adding photo and disabled "Remove photo" button', () => {
    cy.contains('Add photo');
    cy.get('button[type=button]').should('have.length', 3);
    cy.get('button[type=button]').eq(1).should('be.enabled');
    cy.get('button[type=button]').eq(2).should('be.disabled').contains('Remove photo');
  });

  xit('should add correct value to input after click date in datepicker', () => {
    cy.get('.hide-control img').first().click();
    cy.get('tbody tr td').eq(1).click();
    cy.get('small').should('not.exist');
    cy.get('button[type=submit]').should('be.enabled');
  });

  xit('should display error "Field is required" after clearing required inputs', () => {
    cy.get('input[type=text]').eq(0).clear();
    cy.get('input[type=text]').eq(1).clear();
    cy.get('input[type=text]').eq(3).clear();
    cy.get('input[type=tel]').clear();
    cy.get('label').first().click();
    cy.get('small').should('have.length', 4).contains('Field is required');
    cy.get('button[type=submit]').should('be.disabled');
  });

  xit('should display error "Phone number must consist of 10 characters" after typing into the tel input', () => {
    cy.get('input[type=tel]').type('0');
    cy.get('label').first().click();
    cy.get('small').contains('Phone number must consist of 10 characters');
    cy.get('button[type=submit]').should('be.disabled');
  });

  xit('should display error "Please enter a valid date" after typing into the date input', () => {
    cy.get('input[type=text]').eq(3).clear().type('test');
    cy.get('label').first().click();
    cy.get('small').contains('Please enter a valid date');
    cy.get('button[type=submit]').should('be.disabled');
  });

  xit('should display error "Please enter less than 255 characters" after typing into the input', () => {
    cy.get('input[type=text]').eq(0).invoke('val', ''.padStart(256, '|')).click().trigger('input');
    cy.get('input[type=text]').eq(1).invoke('val', ''.padStart(256, '|')).click().trigger('input');
    cy.get('label').first().click();
    cy.get('small').should('have.length', 4).contains('Please enter less than 255 characters');
    cy.get('button[type=submit]').should('be.disabled');
  });

  xit('should be able to save after typing the correct data', () => {
    cy.get('input[type=text]').eq(0).clear().type('test name');
    cy.get('input[type=text]').eq(1).clear().type('test surname');
    cy.get('input[type=text]').eq(3).clear().type('01012000');
    cy.get('input[type=tel]').clear().type('0000000000');
    cy.get('mat-select').click();
    cy.get('mat-option').eq(1).click();
    cy.get('input[type=text]').eq(4).type('99').should('have.value', '9 ft');
    cy.get('input[type=text]').eq(5).type('99').should('have.value', '11 in');
    cy.get('input[type=text]').eq(6).type('9999').should('have.value', '999 lbs');
    cy.get('button[type=submit]').should('be.enabled');
    cy.get('small').should('not.exist');
  });

  xit('should navigate on home page and then on my information page after clicking on corresponding button on navbar', () => {
    cy.request(requestSignIn).then((resp) => {
      localStorage.setItem('accessToken', resp.body.data.userSignIn.accessToken);
      localStorage.setItem('refreshToken', resp.body.data.userSignIn.refreshToken);
    });
    cy.get('mat-nav-list p').contains('home screen').click();
    cy.url().should('include', '/home');
    cy.get('mat-nav-list p').contains('my information').click();
    cy.url().should('include', '/my-information');
  });

  xit('should navigate on authentication page after clicking on log out button', () => {
    cy.get('button img[src="assets/images/logout.svg"').click();
    cy.url().should('include', '/authentication')
  });
});
