describe('Active tabls and scroll  on the main page', function () {
  beforeEach(function () {
    cy.visit('http://localhost:3000');
  });

  it('should change tab on "main" by scroll', () => {
    cy.get('[class*=tabs_tab] > div:nth-child(3)').as('main');
    cy.get('[class*=burger-ingredients_wrap]').as('scroll');

    cy.get('@scroll').scrollTo('bottom');
    cy.get('@main').should('have.class', 'tab_type_current');
  });

  it('should change on "sauce" tab by scroll', () => {
    cy.get('[class*=tabs_tab] > div:nth-child(2)').as('sauce');
    cy.get('[class*=burger-ingredients_wrap]').as('scroll');

    cy.get('@scroll').scrollTo(0, 300);
    cy.get('@sauce').should('have.class', 'tab_type_current');
  });

  it('should change tab by click', () => {
    cy.get('[class*=tabs_tab] > div:nth-child(1)').as('bun');
    cy.get('[class*=tabs_tab] > div:nth-child(2)').as('sauce');
    cy.get('[class*=tabs_tab] > div:nth-child(3)').as('main');

    cy.get('@sauce').click().should('have.class', 'tab_type_current');
    cy.get('@bun').click().should('have.class', 'tab_type_current');
    cy.get('@main').click().should('have.class', 'tab_type_current');
  });
});
