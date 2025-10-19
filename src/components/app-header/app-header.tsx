import React from 'react';
import {
  BurgerIcon,
  ListIcon,
  Logo,
  ProfileIcon,
} from '@ya.praktikum/react-developer-burger-ui-components';
import cn from 'classnames';
import { Link } from 'react-router-dom';

import { ROUTES } from '../../constants';
import IconLink from '../icon-link/icon-link';
import styles from './app-header.module.css';

const AppHeader = () => {
  return (
    <header className={cn('pt-4 pb-4', styles.header)}>
      <div className={styles.inner}>
        <nav className={styles.nav} test-id="nav">
          <li>
            <IconLink path={ROUTES.ROOT} className="mr-2" Icon={BurgerIcon}>
              Конструктор
            </IconLink>
          </li>
          <li>
            <IconLink path={ROUTES.FEED} className="mr-2" Icon={ListIcon}>
              Лента заказов
            </IconLink>
          </li>
        </nav>

        <Link to={ROUTES.ROOT}>
          <Logo />
        </Link>

        <IconLink path={ROUTES.PROFILE} className="mr-2" Icon={ProfileIcon}>
          Личный кабинет
        </IconLink>
      </div>
    </header>
  );
};

export default AppHeader;
