import { FC, ReactNode } from 'react';
import { TIconProps } from '@ya.praktikum/react-developer-burger-ui-components/dist/ui/icons/utils';
import cn from 'classnames';
import { NavLink, useLocation } from 'react-router-dom';

import styles from './icon-link.module.css';

type Props = {
  children: ReactNode;
  path: string;
  className: string;
  Icon: FC<TIconProps>;
};

const IconLink: FC<Props> = ({ children, path, className, Icon }) => {
  const { pathname } = useLocation();
  const testPath = path.slice(1);

  return (
    <NavLink
      className={({ isActive }) =>
        cn('p-5', className, styles.link, {
          [styles.primary]: !isActive,
          [styles.secondary]: isActive,
        })
      }
      to={path}
      data-testid={`nav-${testPath ? testPath : 'main'}`}
    >
      <Icon type={pathname === path ? 'secondary' : 'primary'} />
      <span className={cn('text_type_main-default pl-2')}>{children}</span>
    </NavLink>
  );
};

export default IconLink;
