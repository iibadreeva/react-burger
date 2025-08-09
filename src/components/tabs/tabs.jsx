import React from 'react';
import cn from 'classnames';
import { Tab } from '@ya.praktikum/react-developer-burger-ui-components';

import styles from './tabs.module.css';

const Tabs = ({ data, current, onClick }) => {
  return (
    <div className={cn('mb-10', styles.tab)}>
      {data.map(({ title, type }) => (
        <Tab
          key={type}
          value={type}
          active={current === type}
          onClick={onClick}
        >
          {title}
        </Tab>
      ))}
    </div>
  );
};

export default Tabs;
