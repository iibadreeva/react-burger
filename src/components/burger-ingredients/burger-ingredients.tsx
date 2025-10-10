import React, { createRef, useRef, useState } from 'react';
import cn from 'classnames';
import { useLocation, useNavigate } from 'react-router';

import { useScroll } from '../../hooks/use-scroll';
import { useAppSelector } from '../../services/store';
import { IngredientType } from '../../services/types/types';
import { tabs } from '../../utils/data';
import SectionIngredient from '../section-ingredient/section-ingredient';
import Tabs from '../tabs/tabs';
import styles from './burger-ingredients.module.css';

const BurgerIngredients = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const data = useAppSelector(state => state.ingredients.data);

  const [currentTab, setCurrentTab] = useState('bun');
  const containerRef = useRef(null);

  const tabRefs = useRef(
    tabs.reduce((acc: any, { type }) => {
      acc[type] = createRef();
      return acc;
    }, {})
  );

  const handleTabChange = (tab: string) => {
    setCurrentTab(tab);
    tabRefs.current[tab]?.current.scrollIntoView({
      behavior: 'smooth',
      block: 'start',
    });
  };

  useScroll(tabRefs, containerRef, setCurrentTab, tabs);

  const handleChoseBurger = (item: IngredientType) => {
    navigate(`/ingredients/${item._id}`, {
      state: {
        backgroundLocation: location,
        ingredient: item,
      },
    });
  };

  const groupData = data.reduce(
    (acc: any, current) => {
      tabs.forEach(({ type }) => {
        if (acc[type] && type === current.type) {
          acc[type].push(current);
        }
      });

      return acc;
    },
    { bun: [], sauce: [], main: [] }
  );

  return (
    <section className={styles.main}>
      <h1 className="text text_type_main-large mt-10 mb-5">Соберите бургер</h1>

      <Tabs data={tabs} current={currentTab} onClick={handleTabChange} />

      <div className={cn('custom-scroll', styles.wrap)} ref={containerRef}>
        {tabs.map(({ title, type }) => (
          <SectionIngredient
            key={type}
            currentTab={type}
            title={title}
            data={groupData}
            handleChoseBurger={handleChoseBurger}
            tabRefs={tabRefs}
          />
        ))}
      </div>
    </section>
  );
};

export default BurgerIngredients;
