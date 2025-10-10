import React, { FC, useEffect } from 'react';
import { useParams } from 'react-router';

import OrderInfo from '../../components/order-info/order-info';
import { baseUrlWs } from '../../constants';
import { ordersConnect, ordersDisconnect } from '../../services/reducers/orders/actions';
import { ordersSelector } from '../../services/reducers/orders/slice';
import { useAppDispatch, useAppSelector } from '../../services/store';
import { getCookie } from '../../utils/cookie';

type Props = {
  isPage?: boolean;
};

const ProfileOrderItem: FC<Props> = ({ isPage }) => {
  const { number } = useParams();
  const dispatch = useAppDispatch();
  const orders = useAppSelector(ordersSelector);
  const order = orders.find((item: any) => item._id === number);

  useEffect(() => {
    const cookie = getCookie('token')?.replace('Bearer ', '');

    dispatch(ordersConnect(`${baseUrlWs}?token=${cookie}`));

    return () => {
      dispatch(ordersDisconnect());
    };
  }, [dispatch]);

  if (!order) {
    return <h3 className="text text_type_digits-medium mt-10 mb-5">Загрузка...</h3>;
  }

  return <OrderInfo data={order} isPage />;
};

export default ProfileOrderItem;
