import React from 'react';
import cn from 'classnames';
import PropTypes from 'prop-types';

import IngredientList from './ingredient-list/ingredient-list';

import { dataPropTypes } from '../../utils/types';

import styles from './section-ingredient.module.css';

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
        {data[currentTab].map((item) => (
          <IngredientList
            key={item._id}
            item={item}
            handleChoseBurger={handleChoseBurger}
          />
        ))}
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
