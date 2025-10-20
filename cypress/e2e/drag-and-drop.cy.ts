import {
  INGREDIENT_BUN,
  INGREDIENT_BUTTON,
  INGREDIENT_COUNTER,
  INGREDIENT_DROP,
  INGREDIENT_MAIN,
  INGREDIENT_PRICE,
  INGREDIENT_SAUCE,
} from '../support/constants';

describe('drag and drop on the main page', function () {
  it('should redirect to /login if no auth after order', () => {
    cy.intercept('GET', '**/ingredients', { fixture: 'ingredients.json' }).as('getIngredients');
    cy.visit('/');
    cy.wait('@getIngredients', { timeout: 10000 });

    cy.get(INGREDIENT_BUTTON).should('be.disabled');

    cy.get(INGREDIENT_BUN).first().drag(INGREDIENT_DROP);
    cy.get(INGREDIENT_SAUCE).first().drag(INGREDIENT_DROP);
    cy.get(INGREDIENT_MAIN).first().drag(INGREDIENT_DROP);
    cy.get(INGREDIENT_SAUCE).first().drag(INGREDIENT_DROP);
    cy.get(INGREDIENT_MAIN).first().drag(INGREDIENT_DROP);

    cy.get(INGREDIENT_BUN).first().find('.counter__num').contains(1);
    cy.get(INGREDIENT_SAUCE).first().find('.counter__num').contains(2);
    cy.get(INGREDIENT_MAIN).first().find('.counter__num').contains(2);

    cy.get(INGREDIENT_DROP).find('li').should('have.length', 6);
    cy.get(INGREDIENT_COUNTER).should('have.length', 3);

    cy.get(INGREDIENT_PRICE).contains(3538);

    cy.get(INGREDIENT_BUTTON).should('not.be.disabled');
    cy.get(INGREDIENT_BUTTON).click();

    cy.url().should('include', '/login');
  });
});
