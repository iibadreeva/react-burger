import React, { useState, useMemo, memo, useRef } from 'react';
import cn from 'classnames';
import PropTypes from 'prop-types';

import Tabs from '../tabs/tabs';
import SectionIngredient from '../section-ingredient/section-ingredient';

import { tabs } from '../../utils/data';
import { dataPropTypes } from '../../utils/types';

import styles from './burger-ingredients.module.css';

const BurgerIngredients = ({ data }) => {
  const [currentTab, setCurrentTab] = useState('bun');

  const tabRefs = {
    'bun': useRef(null),
    'sauce': useRef(null),
    'main': useRef(null),
  };

  const handleTabChange = (tab) => {
    setCurrentTab(tab);
    tabRefs[tab].current.scrollIntoView({behavior: 'smooth', block: 'start'});
  }

  const groupData = useMemo(() => {
    return data.reduce((acc, current) => {
      tabs.forEach(({type}) => {
        if(acc[type] && type === current.type){
          acc[type].push(current);
        }else if(type === current.type) {
          acc[type] = [current];
        }
      })

      return acc
    }, {})
  }, [data]);


  return (
    <section className={styles.main}>
      <h1 className="mt-10 mb-5 text text_type_main-large">Соберите бургер</h1>

      <Tabs data={tabs} current={currentTab} onClick={handleTabChange} />

      <div className={cn('custom-scroll', styles.wrap)}>
        {tabs.map(({ title, type }) =><SectionIngredient key={type} currentTab={type} title={title} data={groupData} tabRefs={tabRefs} />)}
      </div>

    </section>
  );
};

BurgerIngredients.propTypes = {
  data: PropTypes.arrayOf(
    dataPropTypes
  ).isRequired
};

const BurgerIngredientWrap = memo(BurgerIngredients);

export default BurgerIngredientWrap;
