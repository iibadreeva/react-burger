import React, { useEffect, useMemo } from 'react';
import cn from 'classnames';
import { useLocation, useNavigate } from 'react-router';

import Loading from '../../components/loading/loading';
import OrderFeed from '../../components/order-feed/order-feed';
import { baseUrlWs, ROUTES } from '../../constants';
import {
  ordersAllConnect,
  ordersAllDisconnect,
} from '../../services/reducers/orders-all/constants';
import {
  ordersAllResponseSelector,
  ordersAllSelector,
} from '../../services/reducers/orders-all/slice';
import { useAppDispatch, useAppSelector } from '../../services/store';
import { OrderType } from '../../services/types/types';
import { splitToCols } from '../../utils/split-to-cols';
import styles from './feed.module.css';

const Feed = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const dispatch = useAppDispatch();

  const ordersAllResponse = useAppSelector(ordersAllResponseSelector);
  const ordersAll = useAppSelector(ordersAllSelector) as OrderType[];

  const { done, pending } = useMemo(() => {
    const doneNumbers: number[] = [];
    const pendingNumbers: number[] = [];
    for (const o of ordersAll) {
      if (o.status === 'done') doneNumbers.push(o.number);
      else if (o.status === 'pending') pendingNumbers.push(o.number);
    }
    return { done: doneNumbers, pending: pendingNumbers };
  }, [ordersAll]);

  const [doneCol1, doneCol2] = splitToCols(done, 10);
  const [pendCol1, pendCol2] = splitToCols(pending, 10);

  const total = (ordersAllResponse?.total ?? 0).toLocaleString('ru-RU');
  const totalToday = (ordersAllResponse?.totalToday ?? 0).toLocaleString('ru-RU');

  const handleChoseFeed = (item: OrderType) => {
    navigate(`${ROUTES.FEED}/${item._id}`, {
      state: {
        backgroundLocation: location,
        ingredient: item,
      },
    });
  };

  useEffect(() => {
    dispatch(ordersAllConnect(`${baseUrlWs}/all`));
    return () => {
      dispatch(ordersAllDisconnect());
    };
  }, [dispatch]);

  return (
    <div className={styles.page}>
      <h1 className="text text_type_main-large mt-10 mb-5">Лента заказов</h1>
      <div className={styles.wrap}>
        {!ordersAll.length && <Loading />}
        <OrderFeed data={ordersAll} handleChoseFeed={handleChoseFeed} />

        <section className={styles.content}>
          <div className={styles.columns}>
            <div className={styles.column}>
              <h6 className="text text_type_main-default mb-6">Готовы:</h6>
              <div className={styles.grid}>
                <ul className={styles.orders}>
                  {doneCol1.map(item => (
                    <li key={item} className={cn('text text_type_digits-small', styles.green)}>
                      {item}
                    </li>
                  ))}
                </ul>
                <ul className={styles.orders}>
                  {doneCol2.map(item => (
                    <li key={item} className={cn('text text_type_digits-small', styles.green)}>
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
            <div className={styles.column}>
              <h6 className="text text_type_main-default mb-6">В работе:</h6>
              <div className={styles.grid}>
                <ul className={styles.orders}>
                  {pendCol1.map(item => (
                    <li key={item} className="text text_type_digits-small">
                      90442
                    </li>
                  ))}
                </ul>
                <ul className={styles.orders}>
                  {pendCol2.map(item => (
                    <li key={item} className="text text_type_digits-small">
                      90442
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>

          <div>
            <h2 className="text text_type_main-default mt-15">Выполнено за все время:</h2>
            <p className="text text_type_digits-large">{total}</p>
          </div>

          <div>
            <h2 className="text text_type_main-default mt-15">Выполнено за сегодня:</h2>
            <p className="text text_type_digits-large">{totalToday}</p>
          </div>
        </section>
      </div>
    </div>
  );
};

export default Feed;
