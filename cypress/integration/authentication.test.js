import {environment} from '../../src/environments/environment'
import {StorageStateEnum} from '../../src/app/shared/utils'

describe('AuthenticationPage', () => {

  beforeEach(() => {
    localStorage.setItem(StorageStateEnum.protectionKey, JSON.stringify(environment.protectionKey))
  })

  it('should display title with text "Authentication"', () => {
    cy.visit('/authentication')
    cy.contains('Authentication')
  })

  it('should display email, password inputs and 1 checkbox', () => {
    cy.get('input[type=email]').should('exist')
    cy.get('input[type=password]').should('exist')
    cy.get('input[type=checkbox]').should('have.length', '1')
    cy.get('button[type=submit]').should('be.disabled').contains('Sign in')
  })

  it('should change type of password input on click', () => {

    cy.get('input[type=text]').should('not.exist')

    cy.get('.hide-control img').click()
    cy.get('input[type=text]').should('exist')
    cy.get('input[type=password]').should('not.exist')

    cy.get('.hide-control img').click()
    cy.get('input[type=text]').should('not.exist')
    cy.get('input[type=password]').should('exist')
  })

  it('should display error "Field is required" after clicking on input and then on some element', () => {
    cy.get('input[type=email]').click()
    cy.get('input[type=password]').click()
    cy.get('label').first().click()
    cy.get('button[type=submit]').should('be.disabled')
    cy.get('small').contains('Field is required')
  })

  it('should display error "Please enter a valid email address" after typing into the input', () => {
    cy.get('input[type=email]').type('test')
    cy.get('label').first().click()
    cy.get('button[type=submit]').should('be.disabled')
    cy.get('small').contains('Please enter a valid email address')
  })

  it('should display error "Password must be at least 6 characters" after typing into the input', () => {
    cy.get('input[type=password]').type('test')
    cy.get('label').first().click()
    cy.get('small').contains('Password must be at least 6 characters')
    cy.get('button[type=submit]').should('be.disabled')
  })

  it('should display error "Please enter less than 255 characters" after typing into the input', () => {
    cy.reload()
    cy.get('input[type=email]').invoke('val', ''.padStart(256, '|')).click().trigger('input')
    cy.get('input[type=password]').invoke('val', ''.padStart(256, '|')).click().trigger('input')
    cy.get('label').first().click()
    cy.get('button[type=submit]').should('be.disabled')
    cy.get('small').contains('Please enter less than 255 characters')
  })

  it('should be able to authenticate after typing the correct data', () => {
    cy.reload()
    cy.get('input[type=email]').type('test@gmail.com')
    cy.get('input[type=password]').type('123456')
    cy.get('button[type=submit]').should('be.enabled')
    cy.get('small').should('not.exist')
  })

  it('should navigate on register page after clicking on link "Register/Sign up"', () => {
    cy.visit('/authentication')
    cy.get('a').contains('Register/Sign up').click()
    cy.url().should('include', '/register')
  })

  it('should navigate on ResetPassword page after clicking on link "Forgot password?"', () => {
    cy.visit('/authentication')
    cy.get('a').contains('Forgot password?').click()
    cy.url().should('include', '/reset-password')
  })
})
