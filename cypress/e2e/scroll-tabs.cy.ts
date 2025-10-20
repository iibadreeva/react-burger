import { INGREDIENT_SCROLL, INGREDIENT_TAB, URL_MAIN } from '../support/constants';

describe('Active tabls and scroll  on the main page', function () {
  beforeEach(function () {
    cy.visit(URL_MAIN);
  });

  it('should change tab on "main" by scroll', () => {
    cy.get(INGREDIENT_SCROLL).scrollTo('bottom');
    cy.get(INGREDIENT_TAB).eq(2).should('have.class', 'tab_type_current');
  });

  it('should change on "sauce" tab by scroll', () => {
    cy.get(INGREDIENT_SCROLL).scrollTo(0, 300);
    cy.get(INGREDIENT_TAB).eq(1).should('have.class', 'tab_type_current');
  });

  it('should change tab by click', () => {
    cy.get(INGREDIENT_TAB).eq(1).click().should('have.class', 'tab_type_current');
    cy.get(INGREDIENT_TAB).eq(0).click().should('have.class', 'tab_type_current');
    cy.get(INGREDIENT_TAB).eq(2).click().should('have.class', 'tab_type_current');
  });
});
