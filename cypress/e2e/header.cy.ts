import {
  HEADER_LOGO,
  HEADER_NAV_FEED,
  HEADER_NAV_MAIN,
  HEADER_PROFILE,
} from '../support/constants';

describe('service is available', function () {
  beforeEach(function () {
    cy.visit('/');
  });

  it('check navigation by header', function () {
    cy.contains('Конструктор');
    cy.contains('Лента заказов');
    cy.contains('Личный кабинет');
  });

  it('should redirect on /feed after click nav', function () {
    cy.get(HEADER_NAV_FEED).contains('Лента заказов').click();
    cy.url().should('include', '/feed');
    cy.contains('Выполнено за сегодня');
  });

  it('should redirect on /login after click "personal account" if not auth', function () {
    cy.get(HEADER_PROFILE).contains('Личный кабинет').click();
    cy.url().should('include', '/login');
    cy.contains('Вход');
  });

  it('should open /profile after click "personal account" if user exist', function () {
    cy.setCookie(
      'token',
      'Bearer%20eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY4YjlhNDg0NjczMDg2MDAxYmE4NjZmNCIsImlhdCI6MTc2MDk2NjQyNSwiZXhwIjoxNzYwOTY3NjI1fQ.WfUMDBPYwELkJFvjXJzbx7aiqOlZjO39htobvW_jSDI'
    );

    cy.get(HEADER_PROFILE).contains('Личный кабинет').click();
    cy.url().should('include', '/profile');
  });

  it('should navigate by lick of header', function () {
    cy.get(HEADER_NAV_FEED).click();
    cy.url().should('include', '/feed');

    cy.get(HEADER_NAV_MAIN).click();
    cy.url().should('include', '/');

    cy.get(HEADER_PROFILE).click();
    cy.url().should('include', '/login');

    cy.get(HEADER_LOGO).click();
    cy.url().should('include', '/');
  });
});
