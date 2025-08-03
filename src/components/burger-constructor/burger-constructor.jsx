import React from 'react';
import PropTypes from 'prop-types';
import cn from 'classnames';
import {
  Button,
  ConstructorElement,
  CurrencyIcon,
  DragIcon
} from '@ya.praktikum/react-developer-burger-ui-components';

import styles from './burger-constructor.module.css';
import { dataPropTypes } from '../../utils/types';

const BurgerConstructor = ({ data }) => {
  const sum = 610;

  return (
    <section className={cn('pt-25', styles.main)}>
      <ul className={cn('mt-4 mb-10 custom-scroll', styles.content)}>
        {data.map(({ _id, name, price, image }, inx) => {
          let type = undefined;
          let text = name
          if (inx === 0) {
            type = 'top';
            text += ' (верх)'
          } else if (inx === data.length - 1) {
            type = 'bottom';
            text += ' (низ)'
          }

          return (
            <li className={styles.list} key={_id}>
              <DragIcon
                className={cn('mr-2', styles.iconDrag, {
                  [styles.hidden]: type
                })}
                type="primary"
              />

              <ConstructorElement
                extraClass="mb-4"
                isLocked={!!type}
                text={text}
                price={price}
                thumbnail={image}
                type={type}
              />
            </li>
          );
        })}
      </ul>

      <footer className={styles.footer}>
        <div className="text text_type_digits-medium">{sum}</div>
        <CurrencyIcon
          className={cn('mr-10 ml-2', styles.icon)}
          type={'primary'}
        />
        <Button htmlType="button" type="primary">
          Оформить заказ
        </Button>
      </footer>
    </section>
  );
};

BurgerConstructor.propTypes = {
  data: PropTypes.arrayOf(
    dataPropTypes
  ).isRequired
};

export default BurgerConstructor;
