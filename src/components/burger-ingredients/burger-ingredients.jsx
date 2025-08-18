import React, { useState, useRef, createRef } from 'react';
import cn from 'classnames';
import PropTypes from 'prop-types';

import Tabs from '../tabs/tabs';
import SectionIngredient from '../section-ingredient/section-ingredient';
import IngredientDetails from '../ingredient-details/ingredient-details';

import { useScroll } from '../../hooks/use-scroll';

import { tabs } from '../../utils/data';
import { dataPropTypes } from '../../utils/types';

import styles from './burger-ingredients.module.css';

const BurgerIngredients = ({ data }) => {
  const [currentTab, setCurrentTab] = useState('bun');
  const containerRef = useRef(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [burger, setBurger] = useState(null);

  const tabRefs = useRef(
    tabs.reduce((acc, { type }) => {
      acc[type] = createRef();
      return acc;
    }, {})
  );

  const handleTabChange = (tab) => {
    setCurrentTab(tab);
    tabRefs.current[tab]?.current.scrollIntoView({
      behavior: 'smooth',
      block: 'start'
    });
  };

  const handleChoseBurger = (item) => {
    setIsModalOpen(true);
    setBurger(item);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  const groupData = data.reduce(
    (acc, current) => {
      tabs.forEach(({ type }) => {
        if (acc[type] && type === current.type) {
          acc[type].push(current);
        }
      });

      return acc;
    },
    { bun: [], sauce: [], main: [] }
  );

  useScroll(tabRefs, containerRef, setCurrentTab, tabs);

  return (
    <section className={styles.main}>
      {isModalOpen && burger && (
        <IngredientDetails
          onClose={closeModal}
          image={burger.image}
          calories={burger.calories}
          carbohydrates={burger.carbohydrates}
          fat={burger.fat}
          name={burger.name}
          proteins={burger.proteins}
        />
      )}

      <h1 className="mt-10 mb-5 text text_type_main-large">Соберите бургер</h1>

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

BurgerIngredients.propTypes = {
  data: PropTypes.arrayOf(dataPropTypes).isRequired
};

export default BurgerIngredients;
