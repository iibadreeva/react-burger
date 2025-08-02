import React from 'react';
import cn from 'classnames';
import { Tab } from '@ya.praktikum/react-developer-burger-ui-components';

import styles from './tabs.module.css';

const Tabs = ({ data, current, setCurrent }) => {
  return (
    <div className={cn('mb-10', styles.tab)}>
      {data.map(({ title, index, type }) => (
        <Tab
          key={index}
          value={type}
          active={current === type}
          onClick={setCurrent}
        >
          {title}
        </Tab>
      ))}
    </div>
  );
};

export default Tabs;
