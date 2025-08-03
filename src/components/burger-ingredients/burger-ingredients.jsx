import React, {
  useState,
  useMemo,
  memo,
  useRef,
  useEffect,
  useCallback
} from 'react';
import cn from 'classnames';
import PropTypes from 'prop-types';

import Tabs from '../tabs/tabs';
import SectionIngredient from '../section-ingredient/section-ingredient';

import { tabs } from '../../utils/data';
import { dataPropTypes } from '../../utils/types';

import styles from './burger-ingredients.module.css';

const BurgerIngredients = ({ data }) => {
  const [currentTab, setCurrentTab] = useState('bun');
  const containerRef = useRef(null);

  const tabRefs = {
    bun: useRef(null),
    sauce: useRef(null),
    main: useRef(null)
  };

  const handleTabChange = useCallback((tab) => {
    setCurrentTab(tab);
    tabRefs[tab].current.scrollIntoView({ behavior: 'smooth', block: 'start' });
  }, []);

  const groupData = useMemo(() => {
    return data.reduce((acc, current) => {
      tabs.forEach(({ type }) => {
        if (acc[type] && type === current.type) {
          acc[type].push(current);
        } else if (type === current.type) {
          acc[type] = [current];
        }
      });

      return acc;
    }, {});
  }, []);

  const scrollHandler = () => {
    if (
      !tabRefs['bun'].current ||
      !tabRefs['sauce'].current ||
      !tabRefs['main'].current ||
      !containerRef.current
    ) {
      return;
    }

    const scrollTop = containerRef.current.getBoundingClientRect().top;
    const bunTop = Math.abs(
      tabRefs['bun'].current.getBoundingClientRect().top - scrollTop
    );
    const sauceTop = Math.abs(
      tabRefs['sauce'].current.getBoundingClientRect().top - scrollTop
    );
    const mainTop = Math.abs(
      tabRefs['main'].current.getBoundingClientRect().top - scrollTop
    );

    const min = Math.min(bunTop, sauceTop, mainTop);

    if (min === bunTop) {
      setCurrentTab('bun');
    } else if (min === sauceTop) {
      setCurrentTab('sauce');
    } else {
      setCurrentTab('main');
    }
  };

  useEffect(() => {
    const content = document.querySelector('#control');
    content.addEventListener('scroll', scrollHandler, true);
    return () => {
      content.removeEventListener('scroll', scrollHandler, true);
    };
  }, []);

  return (
    <section className={styles.main}>
      <h1 className="mt-10 mb-5 text text_type_main-large">Соберите бургер</h1>

      <Tabs data={tabs} current={currentTab} onClick={handleTabChange} />

      <div className={cn('custom-scroll', styles.wrap)} ref={containerRef}>
        {tabs.map(({ title, type }) => (
          <SectionIngredient
            key={type}
            currentTab={type}
            title={title}
            data={groupData}
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

const BurgerIngredientWrap = memo(BurgerIngredients);

export default BurgerIngredientWrap;
