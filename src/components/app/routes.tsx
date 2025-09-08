import { ROUTES } from '../../constants';
import BurgerPage from '../../pages/burger-page/burger-page';
import ForgotPassword from '../../pages/forgot-password/forgot-password';
import IngredientPage from '../../pages/ingredient-page/ingredient-page';
import Login from '../../pages/login/login';
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
    path: ROUTES.INGREDIENTS_ITEM,
    component: IngredientPage,
    isPrivate: true,
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
