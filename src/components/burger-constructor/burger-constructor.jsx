import React, { useMemo } from 'react';
import cn from 'classnames';
import {
  Button,
  ConstructorElement,
  CurrencyIcon,
  DragIcon
} from '@ya.praktikum/react-developer-burger-ui-components';

import { data } from '../../utils/data';

import styles from './burger-constructor.module.css';

const BurgerConstructor = () => {
  const sum = 610;
  var img = '';

  return (
    <section className={cn('pt-25', styles.main)}>
      <ul className={cn('mt-4 mb-10 custom-scroll', styles.content)}>
        {data.map(({ _id, name, price, image }, inx) => {
          let type = undefined;
          if (inx === 0) {
            type = 'top';
          } else if (inx === data.length - 1) {
            type = 'bottom';
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
                isLocked={false}
                text={name}
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

export default BurgerConstructor;
