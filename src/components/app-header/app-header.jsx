import React from 'react';
import cn from 'classnames';
import {
  Logo,
  BurgerIcon,
  ListIcon,
  ProfileIcon
} from '@ya.praktikum/react-developer-burger-ui-components';

import IconLink from '../icon-link/icon-link';

import styles from './app-header.module.css';

const AppHeader = () => {
  return (
    <header className={cn('pt-4 pb-4', styles.header)}>
      <div className={styles.inner}>
        <nav className={styles.nav}>
          <li>
            <IconLink
              path="/"
              isActive={false}
              className="mr-2"
              Icon={BurgerIcon}
            >
              Конструктор
            </IconLink>
          </li>
          <li>
            <IconLink path="/" isActive={true} className="mr-2" Icon={ListIcon}>
              Лента заказов
            </IconLink>
          </li>
        </nav>

        <Logo />

        <IconLink path="/" isActive={true} className="mr-2" Icon={ProfileIcon}>
          Личный кабинет
        </IconLink>
      </div>
    </header>
  );
};

export default AppHeader;
