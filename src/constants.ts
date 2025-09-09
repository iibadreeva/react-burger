export const baseUrl = 'https://norma.nomoreparties.space/api';

export enum ROUTES {
  ROOT = '/',
  LOGIN = '/login',
  REGISTER = '/register',
  FORGOT_PASSWORD = '/forgot-password',
  RESET_PASSWORD = '/reset-password',
  PROFILE = '/profile',
  PROFILE_ORDERS = '/profile/orders',
  PROFILE_ORDERS_ITEM = '/profile/orders/:id.',
  INGREDIENTS_ITEM = '/ingredients/:id',
  ORDER = '/order'
}
