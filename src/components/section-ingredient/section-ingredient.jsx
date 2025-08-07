import React from 'react';
import cn from 'classnames';
import {
  Counter,
  CurrencyIcon
} from '@ya.praktikum/react-developer-burger-ui-components';

import styles from './section-ingredient.module.css';
import PropTypes from 'prop-types';
import { dataPropTypes } from '../../utils/types';

const SectionIngredient = ({
  data,
  title,
  currentTab,
  tabRefs,
  handleChoseBurger
}) => {
  return (
    <>
      <h3
        className="text text_type_main-medium mb-6"
        ref={tabRefs.current[currentTab]}
      >
        {title}
      </h3>

      <ul className={cn('pt-6 pl-4 pr-4 pb-10', styles.content)}>
        {data[currentTab].map((item) => {
          const { _id, name, price, image } = item;
          return (
            <li
              key={_id}
              className={cn(styles.list)}
              onClick={() => handleChoseBurger(item)}
            >
              <Counter count={1} size="default" />

              <img
                className={cn('ml-4 mr-4 mb-1', styles.image)}
                src={image}
                alt={name}
              />

              <div className={cn('mb-1', styles.priceBox)}>
                <span
                  className={cn(
                    'mr-2 text text_type_main-medium',
                    styles.price
                  )}
                >
                  {price}
                </span>
                <CurrencyIcon type="primary" />
              </div>

              <div className="text text_type_main-default">{name}</div>
            </li>
          );
        })}
      </ul>
    </>
  );
};

SectionIngredient.propTypes = {
  data: dataPropTypes.isRequired,
  title: PropTypes.string.isRequired,
  currentTab: PropTypes.string.isRequired,
  tabRefs: PropTypes.any.isRequired,
  handleChoseBurger: PropTypes.func.isRequired
};

export default SectionIngredient;
