describe('modal on the page', () => {
  it('Modal Opening and close on constructor page', () => {
    cy.visit('http://localhost:3000');

    cy.get('[data-testid="bun"] li:nth-child(1)').as('bun');

    cy.get('@bun').click();
    cy.get('#modal').contains('Детали ингредиента');
    cy.url().should('include', '/ingredients/');

    cy.get('#modal [class*=modal_close__]').click();
    cy.get('#modal').contains('Детали ингредиента').should('not.exist');
    cy.url().should('include', '/');
  });

  it('Modal Opening and close on feed page', () => {
    cy.visit('http://localhost:3000/feed');

    cy.get('[class*=order-feed_wrap__] li').first().click();
    cy.get('dialog').should('exist');

    cy.url().should('include', '/feed/');

    cy.get('#modal [class*=modal_close__]').click();
    cy.get('dialog').should('not.exist');
    cy.url().should('include', '/feed');
  });
});
