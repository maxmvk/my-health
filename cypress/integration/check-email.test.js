describe('CheckEmailPage', () => {

  xit('should display text "Please check your e-mail. The confirmation link has been sent."', () => {
    cy.visit('/check-email');
    cy.contains('Please check your e-mail. The confirmation link has been sent.');
  });
});
