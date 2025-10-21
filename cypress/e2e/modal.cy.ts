import {
  FEED_LIST,
  INGREDIENT_BUN,
  MODAL,
  MODAL_CLOSE,
  MODAL_DIALOG,
  URL_FEED,
  URL_FEED_CURRENT,
  URL_INGREDIENT_CURRENT,
  URL_MAIN,
} from '../support/constants';

describe('modal on the page', () => {
  it('Modal Opening and close on constructor page', () => {
    cy.visit(URL_MAIN);

    cy.get(INGREDIENT_BUN).first().click();
    cy.get(MODAL).contains('Детали ингредиента');
    cy.url().should('include', URL_INGREDIENT_CURRENT);

    cy.get(MODAL_CLOSE).click();
    cy.get(MODAL_DIALOG).should('not.exist');

    cy.url().should('include', URL_MAIN);
  });

  it('Modal Opening and close on feed page', () => {
    cy.visit(URL_FEED);

    cy.get(FEED_LIST).first().click();
    cy.get(MODAL_DIALOG).should('exist');

    cy.url().should('include', URL_FEED_CURRENT);

    cy.get(MODAL_CLOSE).click();
    cy.get(MODAL_DIALOG).should('not.exist');
    cy.url().should('include', URL_FEED);
  });
});
