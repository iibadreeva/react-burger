import { ROUTES } from '../../constants';
import BurgerPage from '../../pages/burger-page/burger-page';
import FeedItem from '../../pages/feed-item/feed-item';
import Feed from '../../pages/feed/feed';
import ForgotPassword from '../../pages/forgot-password/forgot-password';
import IngredientPage from '../../pages/ingredient-page/ingredient-page';
import Login from '../../pages/login/login';
import ProfileOrderItem from '../../pages/profile-order-item/profile-order-item';
import ProfileOrders from '../../pages/profile-orders/profile-orders';
import Profile from '../../pages/profile/profile';
import Register from '../../pages/register/register';
import ResetPassword from '../../pages/reset-password/reset-password';
import SomeError from '../some-error/some-error';

export const routes = [
  {
    path: ROUTES.ROOT,
    component: BurgerPage,
    isPrivate: false,
    exact: true,
  },
  {
    path: ROUTES.LOGIN,
    component: Login,
    exact: true,
    isPrivate: false,
  },
  {
    path: ROUTES.REGISTER,
    component: Register,
    exact: true,
    isPrivate: false,
  },
  {
    path: ROUTES.FORGOT_PASSWORD,
    component: ForgotPassword,
    exact: true,
    isPrivate: false,
  },
  {
    path: ROUTES.RESET_PASSWORD,
    component: ResetPassword,
    isPrivate: false,
  },
  {
    path: ROUTES.PROFILE,
    component: Profile,
    isPrivate: true,
    exact: true,
  },
  {
    path: ROUTES.PROFILE_ORDERS,
    component: ProfileOrders,
    isPrivate: true,
    exact: true,
  },
  {
    path: ROUTES.PROFILE_ORDER_ITEM,
    component: ProfileOrderItem,
    isPrivate: true,
    exact: true,
  },
  {
    path: ROUTES.INGREDIENTS_ITEM,
    component: IngredientPage,
    isPrivate: false,
    exact: false,
  },
  {
    path: ROUTES.FEED,
    component: Feed,
    isPrivate: false,
    exact: false,
  },
  {
    path: ROUTES.FEED_ITEM,
    component: FeedItem,
    isPrivate: false,
    exact: false,
  },
  {
    path: '/error',
    component: SomeError,
    isPrivate: false,
  },
  {
    path: '*',
    component: SomeError,
    isPrivate: false,
  },
];
