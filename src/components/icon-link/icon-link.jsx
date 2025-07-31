import React from 'react';
import cn from 'classnames';

import styles from './icon-link.module.css';

const IconLink = ({ children, path, isActive, className, Icon }) => {
  return (
    <a
      className={cn('p-5', className, styles.link, {
        [styles.primary]: !isActive,
        [styles.secondary]: isActive
      })}
      href={path}
    >
      <Icon type={isActive ? 'secondary' : 'primary'} />
      <span className={cn('pl-2', styles.text)}>{children}</span>
    </a>
  );
};

export default IconLink;
