import React, { FC } from 'react';
import { Tab } from '@ya.praktikum/react-developer-burger-ui-components';
import cn from 'classnames';

import { TabType } from '../../services/types/types';
import styles from './tabs.module.css';

type Props = {
  data: TabType[];
  onClick: (tab: string) => void;
  current: string;
};

const Tabs: FC<Props> = ({ data, current, onClick }) => {
  return (
    <div className={cn('mb-10', styles.tab)} data-testid="tabs">
      {data.map(({ title, type }) => (
        <Tab
          key={type}
          value={type}
          active={current === type}
          onClick={onClick}
          data-testid={`tab-${type}`}
        >
          {title}
        </Tab>
      ))}
    </div>
  );
};

export default Tabs;
