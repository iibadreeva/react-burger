import React, { useState, useMemo, memo } from 'react';

import Tabs from '../tabs/tabs';
import SectionIngredient from '../section-ingredient/section-ingredient';

import { data, tabs } from '../../utils/data';

import styles from './burger-ingredients.module.css';

const BurgerIngredients = () => {
  const [currentTab, setCurrentTab] = useState('bun');

  const { currentData, currentTitle } = useMemo(() => {
    const currentData = data.filter(({ type }) => type === currentTab);
    const currentTitle =
      tabs.find(({ title, type }) => type === currentTab).title || 'Булки';

    return { currentData, currentTitle };
  }, [currentTab]);

  return (
    <section className={styles.main}>
      <h1 className="mt-10 mb-5 text text_type_main-large">Соберите бургер</h1>

      <Tabs data={tabs} current={currentTab} setCurrent={setCurrentTab} />

      <SectionIngredient title={currentTitle} data={currentData} />
    </section>
  );
};

const BurgerIngredientWrap = memo(BurgerIngredients);

export default BurgerIngredientWrap;
