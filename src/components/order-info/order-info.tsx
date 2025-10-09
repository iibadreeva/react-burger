import React, { FC, useMemo } from 'react';
import { CurrencyIcon, FormattedDate } from '@ya.praktikum/react-developer-burger-ui-components';
import cn from 'classnames';

import { OrderType } from '../../services/types/types';
import styles from './order-info.module.css';

type Props = {
  isPage?: boolean;
  data: OrderType;
};

const OrderInfo: FC<Props> = ({ isPage, data }) => {
  const { createdAt, name, number, status, ingredients } = data;

  const sum = useMemo(
    () => ingredients.reduce((accumulate: any, { price }: any) => accumulate + price, 0),
    [ingredients]
  );

  return (
    <div
      className={cn({
        [styles.wrap]: isPage,
        [styles.wrapModal]: !isPage,
      })}
    >
      <header className="mt-10 mb-5">
        <h2
          className={cn('text text_type_main-large mb-10', {
            [styles.title]: isPage,
          })}
        >
          #{number}
        </h2>
        <p className="text text_type_main-medium">{name}</p>
        {status === 'pending' && (
          <p className={cn('text text_type_main-default mb-10', styles.green)}>Выполнен</p>
        )}
        {status === 'done' && <p className={cn('text text_type_main-default mb-10')}>Выполнен</p>}

        <p className="text text_type_main-medium">Состав:</p>
      </header>

      <ul className={cn('mb-10', styles.lists)}>
        {ingredients.map((item: any, inx: number) => (
          <li key={inx} className={styles.list}>
            <div className={styles.wrapImg}>
              <img className={styles.image} src={item.image_mobile} alt={item.name} />
            </div>
            <p className={cn('text text_type_main-default ml-4', styles.text)}>{item.name}</p>
            <div className={styles.price}>
              <div className="text text_type_main-default">{item.price}</div>
              <CurrencyIcon className={cn('ml-5', styles.icon)} type={'primary'} />
            </div>
          </li>
        ))}
      </ul>

      <footer className={styles.footer}>
        <FormattedDate
          className="text text_type_main-default text_color_inactive"
          date={new Date(createdAt)}
        />

        <div className={styles.price}>
          <div className="text text_type_digits-medium">{sum}</div>
          <CurrencyIcon className={cn('ml-5', styles.icon)} type={'primary'} />
        </div>
      </footer>
    </div>
  );
};

export default OrderInfo;
