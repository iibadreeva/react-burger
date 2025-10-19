import React, { useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router';

import Loading from '../../components/loading/loading';
import OrderFeed from '../../components/order-feed/order-feed';
import ProfileMenu from '../../components/profile-menu/profile-menu';
import { baseUrlWs, ROUTES } from '../../constants';
import { ordersConnect, ordersDisconnect } from '../../services/reducers/orders/constants';
import { ordersSelector } from '../../services/reducers/orders/slice';
import { useAppDispatch, useAppSelector } from '../../services/store';
import { OrderType } from '../../services/types/types';
import { getCookie } from '../../utils/cookie';
import styles from './profile-orders.module.css';

const ProfileOrders = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const dispatch = useAppDispatch();
  const orders = useAppSelector(ordersSelector) as OrderType[];

  const handleChoseFeed = (item: OrderType) => {
    navigate(`${ROUTES.PROFILE_ORDERS}/${item._id}`, {
      state: {
        backgroundLocation: location,
        ingredient: item,
      },
    });
  };

  useEffect(() => {
    const cookie = getCookie('token')?.replace('Bearer ', '');

    dispatch(ordersConnect(`${baseUrlWs}?token=${cookie}`));

    return () => {
      dispatch(ordersDisconnect());
    };
  }, [dispatch]);

  return (
    <section className={styles.wrap}>
      <ProfileMenu />
      {!orders.length && <Loading />}
      <OrderFeed data={orders} handleChoseFeed={handleChoseFeed} />
    </section>
  );
};

export default ProfileOrders;
