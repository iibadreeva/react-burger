describe('service is available', function () {
  beforeEach(function () {
    cy.visit('http://localhost:3000');
  });

  it('Проверяем навигацию в шапке', function () {
    cy.contains('Конструктор');
    cy.contains('Лента заказов');
    cy.contains('Личный кабинет');
  });

  it('кликаем по Лента заказов, убеждаемся что открывается страница', function () {
    cy.get('[test-id=nav] li:nth-child(2)').as('feed');
    cy.get('@feed').contains('Лента заказов').click();
    cy.contains('Выполнено за сегодня');
  });

  it('кликаем по профелю, убеждаемся что открывается страница', function () {
    cy.get('a[href*="profile"]').as('profile');
    cy.get('@profile').contains('Личный кабинет').click();
    const text = 'Вход' || 'В этом разделе вы можете изменить свои персональные данные';
    cy.contains(text);
  });

  it('используем навигацию по шапке', function () {
    cy.get('[test-id=nav] li:nth-child(1)').as('constructor');
    cy.get('[test-id=nav] li:nth-child(2)').as('feed');
    cy.get('a[href*="profile"]').as('profile');
    cy.get('[test-id=nav] + a').as('logo');

    cy.get('@feed').click();
    cy.url().should('include', '/feed');

    cy.get('@profile').click();
    const path = '/login' as string | '/profile' as string;
    cy.url().should('include', path);

    cy.get('@logo').click();
    cy.url().should('include', '/');
  });
});
