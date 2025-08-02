import React from 'react';
import cn from 'classnames';
import {
  Counter,
  CurrencyIcon
} from '@ya.praktikum/react-developer-burger-ui-components';

import styles from './section-ingredient.module.css';

const SectionIngredient = ({ data, title }) => {
  return (
    <article className={cn('custom-scroll', styles.wrap)}>
      <h3 className="text text_type_main-medium mb-6">{title}</h3>

      <ul className={cn('pt-6 pl-4 pr-4 pb-10', styles.content)}>
        {data.map(({ _id, name, price, image }) => (
          <li key={_id} className={cn(styles.list)}>
            <Counter count={1} size="default" />

            <img
              className={cn('ml-4 mr-4 mb-1', styles.image)}
              src={image}
              alt={name}
            />

            <div className={cn('mb-1', styles.priceBox)}>
              <span
                className={cn('mr-2 text text_type_main-medium', styles.price)}
              >
                {price}
              </span>
              <CurrencyIcon type="primary" />
            </div>

            <div className="text text_type_main-default">{name}</div>
          </li>
        ))}
      </ul>
    </article>
  );
};

export default SectionIngredient;
