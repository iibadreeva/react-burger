import { FC, ReactNode } from 'react';
import cn from 'classnames';
import { NavLink, useLocation } from 'react-router-dom';
import { TIconProps } from '@ya.praktikum/react-developer-burger-ui-components/dist/ui/icons/utils';

import styles from './icon-link.module.css';

type Props = {
  children: ReactNode;
  path: string;
  className: string;
  Icon: FC<TIconProps>;
};

const IconLink: FC<Props> = ({ children, path, className, Icon }) => {
  const { pathname } = useLocation();

  return (
    <NavLink
      className={({ isActive }) =>
        cn('p-5', className, styles.link, {
          [styles.primary]: !isActive,
          [styles.secondary]: isActive
        })
      }
      to={path}
    >
      <Icon type={pathname === path ? 'secondary' : 'primary'} />
      <span className={cn('pl-2 text_type_main-default')}>{children}</span>
    </NavLink>
  );
};

export default IconLink;
