import React, { FC } from 'react';
import cn from 'classnames';
import { Tab } from '@ya.praktikum/react-developer-burger-ui-components';

import { TabType } from '../../utils/types';

import styles from './tabs.module.css';

type Props = {
  data: TabType[];
  onClick: (tab: string) => void;
  current: string;
};

const Tabs: FC<Props> = ({ data, current, onClick }) => {
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
