export const baseUrl = 'https://norma.nomoreparties.space/api';
export const baseUrlWs = 'wss://norma.nomoreparties.space/orders';

export enum ROUTES {
  ROOT = '/',
  LOGIN = '/login',
  REGISTER = '/register',
  FORGOT_PASSWORD = '/forgot-password',
  RESET_PASSWORD = '/reset-password',
  PROFILE = '/profile',
  PROFILE_ORDERS = '/profile/orders',
  PROFILE_ORDER_ITEM = '/profile/orders/:number',
  INGREDIENTS_ITEM = '/ingredients/:id',
  FEED = '/feed',
  FEED_ITEM = '/feed/:number',
}
