import React, { FC, useEffect } from 'react';
import { useParams } from 'react-router';

import OrderInfo from '../../components/order-info/order-info';
import { baseUrlWs } from '../../constants';
import { ordersAllConnect, ordersAllDisconnect } from '../../services/reducers/orders-all/actions';
import { ordersAllSelector } from '../../services/reducers/orders-all/slice';
import { useAppDispatch, useAppSelector } from '../../services/store';

type Props = {
  isPage?: boolean;
};

const FeedItem: FC<Props> = ({ isPage }) => {
  const dispatch = useAppDispatch();
  const { number } = useParams();
  const ordersAll = useAppSelector(ordersAllSelector);
  const order = ordersAll.find((item: any) => item._id === number);

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
