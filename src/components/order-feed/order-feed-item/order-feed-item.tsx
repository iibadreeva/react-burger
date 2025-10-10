import React, { FC, useMemo } from 'react';
import { CurrencyIcon, FormattedDate } from '@ya.praktikum/react-developer-burger-ui-components';
import cn from 'classnames';

import { OrderType } from '../../../services/types/types';
import styles from './order-feed-item.module.css';

type Props = {
  data: OrderType;
  handleChoseFeed: (item: OrderType) => void;
};

const OrderFeedItem: FC<Props> = ({ handleChoseFeed, data }) => {
  const { createdAt, name, number, status, ingredients } = data;

  const sum = useMemo(
    () => ingredients.reduce((accumulate: any, { price }: any) => accumulate + price, 0),
    [ingredients]
  );

  return (
    <li className={styles.wrap} onClick={() => handleChoseFeed(data)}>
      <header className={styles.header}>
        <p className="text text_type_digits-default">#{number}</p>
        <FormattedDate date={new Date(createdAt)} />
      </header>

      <div className="mb-6">
        <p className="text text_type_main-medium">{name}</p>

        {status === 'pending' && (
          <p className={cn('text text_type_main-default', styles.green)}>Готовится</p>
        )}
        {status === 'done' && <p className="text text_type_main-default">Выполнен</p>}
      </div>

      <div className={styles.body}>
        <ul className={styles.images}>
          {ingredients.map((item, inx: number) => (
            <li key={inx} className={styles.list}>
              <img className={styles.image} src={item.image_mobile} alt={item.name} />
            </li>
          ))}
        </ul>

        <div className={styles.price}>
          <div className="text text_type_digits-medium">{sum}</div>
          <CurrencyIcon className={cn('ml-5', styles.icon)} type={'primary'} />
        </div>
      </div>
    </li>
  );
};

export default OrderFeedItem;
