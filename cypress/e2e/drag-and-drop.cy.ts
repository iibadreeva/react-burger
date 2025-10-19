describe('drag and drop on the main page', function () {
  beforeEach(function () {
    cy.visit('http://localhost:3000');
  });

  it('should drop', () => {
    cy.get('footer button').as('button');
    cy.get('@button').should('be.disabled');

    cy.get('[data-testid="bun"] li:nth-child(1)').as('bun');
    cy.get('[data-testid="sauce"] li:nth-child(2)').as('sauce');
    cy.get('[data-testid="sauce"] li:nth-child(4)').as('sauce2');
    cy.get('[data-testid="main"] li:nth-child(2)').as('main');
    cy.get('[data-testid="drop"]').as('drop');
    cy.get('footer .text_type_digits-medium').as('price');

    cy.get('@bun').drag('@drop');
    cy.get('@sauce').drag('@drop');
    cy.get('@sauce2').drag('@drop');
    cy.get('@main').drag('@drop');

    cy.get('@bun').find('.counter__num').contains(1);
    cy.get('@sauce').find('.counter__num').contains(1);
    cy.get('@sauce2').find('.counter__num').contains(1);
    cy.get('@main').find('.counter__num').contains(1);

    cy.get('@drop').find('li').should('have.length', 5);
    cy.get('.counter__num').should('have.length', 4);
    cy.get('@price').contains('3666');

    cy.get('@button').should('not.be.disabled');
    cy.get('@button').click();

    cy.url().should('include', '/login');
  });
});
