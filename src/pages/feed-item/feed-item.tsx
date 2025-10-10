import React, { FC, useEffect, useMemo } from 'react';
import { useParams } from 'react-router';

import OrderInfo from '../../components/order-info/order-info';
import { baseUrlWs } from '../../constants';
import { ordersAllConnect, ordersAllDisconnect } from '../../services/reducers/orders-all/actions';
import { ordersAllSelector } from '../../services/reducers/orders-all/slice';
import { useAppDispatch, useAppSelector } from '../../services/store';
import { OrderType } from '../../services/types/types';

type Props = {
  isPage?: boolean;
};

const FeedItem: FC<Props> = ({ isPage }) => {
  const dispatch = useAppDispatch();
  const { number } = useParams();
  const ordersAll = useAppSelector(ordersAllSelector);
  const order = useMemo(
    () => ordersAll.find(item => item._id === number) || [],
    [number, ordersAll]
  ) as OrderType;

  useEffect(() => {
    dispatch(ordersAllConnect(`${baseUrlWs}/all`));

    return () => {
      dispatch(ordersAllDisconnect());
    };
  }, [dispatch, order]);

  if (!order) {
    return <h3 className="text text_type_digits-medium mt-10 mb-5">Загрузка...</h3>;
  }

  return <OrderInfo isPage data={order} />;
};

export default FeedItem;
