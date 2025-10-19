## Макеты:
- [Макет главной страницы](https://www.figma.com/design/zFGN2O5xktHl9VmoOieq5E/React-_-Проектные-задачи_external_link?node-id=0-1&p=f&t=PNxY791FxC5V9qk8-0)
- [Макет авторизации](https://www.figma.com/design/zFGN2O5xktHl9VmoOieq5E/React-_-Проектные-задачи_external_link?node-id=6291-2799&p=f&t=IOchfaDWmpYKQx2S-0)

## Облачный сервер:
- [GitHub](https://iibadreeva.github.io/react-burger/)
- [Yandex Cloud](https://badreevaii.nomorepartiessbs.ru/)

## UI-библиотеки:
[Готовые компоненты](https://yandex-practicum.github.io/react-developer-burger-ui-components/docs/)


Запустить локальный сервер
### `npm start`
Собрать проект
### `npm run build`
Запуск тестов jest
### `npm run test`
Запуск тестов на cypress
### `npx cypress open`

### Добавляем скрипт для деплоя на GitHub Pages
### `npm run deploy`
Проект соберётся и содержимое папки dist попадёт в удалённую ветку gh-pages. При этом может возникнуть такая ошибка:
`Couldn't find remote ref refs/heads/gh-pages`. 

Тогда введите команду `npx gh-pages-clean` и заново проделайте этот шаг.



### Реализация перетаскивания ингредиентов
- Пользователь может добавить ингредиент из BurgerIngredients в компонент BurgerConstructor.
- При успешном перетаскивании у ингредиента в BurgerConstructor увеличивается счётчик. Перетаскивать ингредиент (не являющийся булкой) можно многократно.
- Пользователь может нажать на иконку удаления ингредиента в компоненте BurgerConstructor. Ингредиент удалится из BurgerConstructor, а счётчик количества ингредиентов в компоненте BurgerIngredients уменьшится на один.
- Если в BurgerConstructor добавлено несколько одинаковых ингредиентов — удаление одного ингредиента не влияет на остальные ингредиенты в BurgerConstructor с тем же _id.

### Страницы авторизации и регистрации
- На экране /login клик на «Зарегистрироваться» направляет пользователя на маршрут /register.
- На экране /login клик на «Восстановить пароль» направляет пользователя на маршрут /forgot-password.
- На экране /register клик на «Войти» направляет пользователя на маршрут /login.

### Страницы восстановления и сброса пароля
- На экране /forgot-password пользователь вводит адрес электронной почты и нажимает кнопку «Восстановить». После этого происходит POST запрос к эндпоинту https://norma.nomoreparties.space/api/password-reset.
  - Тело запроса:
    ```
    {
      "email": ""
    } 
    ```
  - Тело успешного ответа:
    ```
    {
      "success": true,
      "message": "Reset email sent"
    }
    ```
- На экране /reset-password пользователь вводит новый пароль и код из имейла, а после нажимает кнопку «Сохранить». После этого происходит POST запрос к эндпоинту https://norma.nomoreparties.space/api/password-reset/reset.
    - Тело запроса:
      ```
      {
        "password": "",
        "token": ""
      } 
      ```
    - Тело успешного ответа:
      ```
      {
        "success": true,
        "message": "Password successfully reset"
      }
      ```
- Для реализации этой функциональности потребуется создать пользователя. Вы можете сделать это, отправив POST запрос к эндпоинту https://norma.nomoreparties.space/api/auth/register. Пример тела запроса:
    ```
    {
      "email": "test-data@yandex.ru", 
      "password": "password", 
      "name": "Username"  
    } 
    ```

### Страница профиля пользователя
- При попадании на эту страницу профиля сначала открывается маршрут /profile.
- Клик по кнопке «История заказов» отправляет пользователя на маршрут /profile/orders и делает активной ссылку «История заказов».
- Клик по заказу в «Истории заказов» переносит пользователя на экран /profile/orders/:number.

### Авторизация и регистрация
Вот список эндпоинтов, к которым потребуется делать запросы:
```
POST https://norma.nomoreparties.space/api/auth/login - эндпоинт для авторизации.
POST https://norma.nomoreparties.space/api/auth/register - эндпоинт для регистрации пользователя.
POST https://norma.nomoreparties.space/api/auth/logout - эндпоинт для выхода из системы.
POST https://norma.nomoreparties.space/api/auth/token - эндпоинт обновления токена.
```

### Получение и обновление информации о пользователе
Вот список эндпоинтов, к которым потребуется делать запросы:
```
GET https://norma.nomoreparties.space/api/auth/user - эндпоинт получения данных о пользователе.
PATCH https://norma.nomoreparties.space/api/auth/user - эндпоинт обновления данных о пользователе.
```
### Сокет-соединение
по сокет-соединению сервер возвращает только 50 последних заказов и интересующего нас заказа среди них может не быть:
- /feed 
- /feed/:number 
```
wss://norma.nomoreparties.space/orders/all
```
- /profile/orders/
- /profile/orders/:number
```
wss://norma.nomoreparties.space/orders?token=${accessToken}
```

### Защищённые маршруты в приложении
Куда не может попасть неавторизованный пользователь:
- Все вложенные в /profile маршруты.

Куда не может попасть авторизованный пользователь:
- Маршруты /login и /register.
- Маршруты /forgot-password и /reset-password.

