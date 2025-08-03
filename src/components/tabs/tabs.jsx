import React, { memo } from 'react';
import cn from 'classnames';
import { Tab } from '@ya.praktikum/react-developer-burger-ui-components';

import styles from './tabs.module.css';

const Tabs = memo(({ data, current, onClick }) => {
  return (
    <div className={cn('mb-10', styles.tab)}>
      {data.map(({ title, index, type }) => (
        <Tab
          key={index}
          value={type}
          active={current === type}
          onClick={onClick}
        >
          {title}
        </Tab>
      ))}
    </div>
  );
});

export default Tabs;
