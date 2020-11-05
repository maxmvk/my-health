import {StorageStateEnum} from '../../src/app/shared/utils'
import {environment} from '../../src/environments/environment'

describe('HomePage', () => {
  const query = `mutation {
      userSignIn(email: "caror86265@99mimpi.com", password: "123456") {
        accessToken
        refreshToken
        firstTime
      }
    }
  `;

  const routes = [
    {label: 'home screen', routerLink: '/home', icon: 'home.svg'},
    {label: 'my information', routerLink: '/my-information', icon: 'my-info.svg'},
    {label: 'configuration', routerLink: '/configuration', icon: 'config.svg'},
    {label: 'book service', routerLink: '/book-service', icon: 'book-service.svg'},
    {label: 'appointments', routerLink: '/appointments', icon: 'appointments.svg'},
    {label: 'health history', routerLink: '/health-history', icon: 'history.svg'},
    {label: 'digital dashboard', routerLink: '/digital-dashboard', icon: 'digital.svg'},
    {label: 'help', routerLink: '/accounts', icon: 'help-1.svg'}
  ];

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

  xit('should login and display title with text "News Feed"', () => {
    cy.request(requestSignIn).then((resp) => {
      localStorage.setItem('accessToken', resp.body.data.userSignIn.accessToken);
      localStorage.setItem('refreshToken', resp.body.data.userSignIn.refreshToken);
    });
    cy.visit('/home');
    cy.url().should('include', '/home');
    cy.contains('News Feed');
  });

  xit('should display header with 2 buttons and full name', () => {
    cy.get('span').contains('test name test surname');
    cy.get('button').eq(0).should('be.enabled');
    cy.get('button').eq(1).should('be.enabled');
    cy.get('button img[src="assets/images/logout.svg"]').should('exist');
  });

  xit('should display full name, age, avatar and buttons "Edit avatar"', () => {
    cy.get('h2').contains('test name test surname');
    cy.get('p').contains('20 y.o.');
    cy.get('app-avatar').should('exist');
    cy.get('button[type=button]').eq(1).should('be.enabled').contains('Edit avatar');
  });

  xit('should display connections: 3 icons, 3 titles, 2 buttons and 1 toogle', () => {
    cy.get(`img[src="assets/images/apple-watch.svg"]`).should('exist');
    cy.get(`img[src="assets/images/lpc-data.svg"]`).should('exist');
    cy.get(`img[src="assets/images/ai.svg"]`).should('exist');
    cy.get('div button[type=button]').eq(2).should('be.enabled').contains('More Information');
    cy.get('div button[type=button]').eq(3).should('be.enabled').contains('Connect');
    cy.get(`mat-slide-toggle`).should('exist');
    cy.get('p').contains('Connect Wearables');
    cy.get('p').contains('Connect LPC Data');
    cy.get('p').contains('AI Assistant');
  });

  xit('should display lpc data connect acceptance window after clicking on toogle', () => {
    cy.get(`mat-slide-toggle`).should('exist').click();
    cy.get(`app-lpc-connect-modal`).should('exist');
  });

  xit('should display close icon, message and 2 buttons in acceptance window', () => {
    cy.get(`img[src="assets/images/close.svg"]`).should('exist');
    cy.get('app-lpc-connect-modal p').should('exist');
    cy.get(`app-lpc-connect-modal button`).should('have.length', 2);
    cy.get(`app-lpc-connect-modal button`).eq(0).should('be.enabled').contains('Agree');
    cy.get(`app-lpc-connect-modal button`).eq(1).should('be.enabled').contains('Cancel');
  });

  xit('should display error window after clicking on "Agree" button in acceptance window', () => {
    cy.request(requestSignIn).then((resp) => {
      localStorage.setItem('accessToken', resp.body.data.userSignIn.accessToken);
      localStorage.setItem('refreshToken', resp.body.data.userSignIn.refreshToken);
    });
    cy.get(`app-lpc-connect-modal button`).contains('Agree').click();
    cy.contains('Unfortunately, no data is currently available and associated with your email address');
    cy.get(`img[src="assets/images/close.svg"]`).should('exist');
    cy.get(`app-lpc-connect-modal button`).should('be.enabled').contains('OK');
  });

  xit('should close error window after clicking on button "OK"', () => {
    cy.get(`app-lpc-connect-modal button`).contains('OK').click();
    cy.get(`app-lpc-connect-modal`).should('not.exist');
  });

  xit('should close lpc data connect acceptance window after clicking on close icon or button "Cancel"', () => {
    cy.get(`mat-slide-toggle`).should('exist').click();
    cy.get(`app-lpc-connect-modal`).should('exist');
    cy.get(`img[src="assets/images/close.svg"]`).click();
    cy.get(`app-lpc-connect-modal`).should('not.exist');
    cy.get(`mat-slide-toggle`).should('exist').click();
    cy.get('app-lpc-connect-modal button').contains('Cancel').click();
    cy.get(`app-lpc-connect-modal`).should('not.exist');
  });

  xit('should navigate on my information page after clicking on "Edit avatar" button', () => {
    cy.request(requestSignIn).then((resp) => {
      localStorage.setItem('accessToken', resp.body.data.userSignIn.accessToken);
      localStorage.setItem('refreshToken', resp.body.data.userSignIn.refreshToken);
    });
    cy.get('button[type=button]').eq(1).should('be.enabled').contains('Edit avatar').click();
    cy.url().should('include', '/my-information');
    cy.visit('/home');
  });

  xit('should open chatbot-modal window after clicking on chat button', () => {
    cy.get(`img[src="assets/images/chat-button.svg"]`).should('exist').click();
    cy.get(`app-chatbot`).should('exist');
    cy.get('p').contains('Chat bot');
  });

  xit('should display 3 icons, title, input, bot message and 4 buttons in chatbot-modal window', () => {
    cy.get(`img[src="assets/images/logo-bot.png"]`).should('exist');
    cy.get(`img[src="assets/images/close.svg"]`).should('exist');
    cy.get('p').contains('Chat bot');
    cy.get('input[type=text]').should('exist');
    cy.get(`img[src="assets/images/send.svg"]`).should('exist');
    cy.get('div').contains('Hi! This is your personal assistant. Can we help you with one of the following?');
    cy.get(`app-chatbot button`).should('have.length', 4);
    cy.get(`app-chatbot button`).eq(0).should('be.enabled').contains('Update My Avatar');
    cy.get(`app-chatbot button`).eq(1).should('be.enabled').contains('Nutritional Information');
    cy.get(`app-chatbot button`).eq(2).should('be.enabled').contains('General Information');
    cy.get(`app-chatbot button`).eq(3).should('be.enabled').contains('Services');
  });

  xit('should display typed message and clear input after clicking send icon', () => {
    cy.get('input[type=text]').type('test').should('have.value', 'test');
    cy.get(`img[src="assets/images/send.svg"]`).click();
    cy.get('input[type=text]').should('have.value', '');
    cy.get('div').contains('test');
  });

  xit('should close chatbot-modal window after clicking on close icon', () => {
    cy.get(`img[src="assets/images/close.svg"]`).click();
    cy.get(`app-chatbot`).should('not.exist');
  });

  xit('should display navbar with correct icons and text', () => {
    cy.get('mat-nav-list').should('exist');
    cy.get('mat-nav-list a').should('have.length', 8);
    routes.forEach(route => {
      cy.get(`mat-nav-list img[src="assets/images/${route.icon}"]`).should('exist');
      cy.get('mat-nav-list p').contains(route.label);
    });
  });

  xit('should open new window after clicking on "Telehealth" button', () => {
    cy.request(requestSignIn).then((resp) => {
      localStorage.setItem('accessToken', resp.body.data.userSignIn.accessToken);
      localStorage.setItem('refreshToken', resp.body.data.userSignIn.refreshToken);
    });
    cy.visit('/home', {
      onBeforeLoad (win) {
        cy.stub(win, 'open');
      },
    });
    cy.get('mat-nav-list button').contains('Telehealth').click();
    cy.url().should('include', '/home');
    cy.window().its('open').should('be.called');
  });

  xit('should navigate on my information page and then on home page after clicking on corresponding button on navbar', () => {
    cy.request(requestSignIn).then((resp) => {
      localStorage.setItem('accessToken', resp.body.data.userSignIn.accessToken);
      localStorage.setItem('refreshToken', resp.body.data.userSignIn.refreshToken);
    });
    cy.get('mat-nav-list p').contains('my information').click();
    cy.url().should('include', '/my-information');
    cy.get('mat-nav-list p').contains('home screen').click();
    cy.url().should('include', '/home');
  });

  xit('should navigate on authentication page after clicking on log out button', () => {
    cy.get('button img[src="assets/images/logout.svg"').click();
    cy.url().should('include', '/authentication')
  });
});
