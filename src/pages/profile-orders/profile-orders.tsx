import React, { useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router';

import OrderFeed from '../../components/order-feed/order-feed';
import ProfileMenu from '../../components/profile-menu/profile-menu';
import { baseUrlWs, ROUTES } from '../../constants';
import { ordersConnect, ordersDisconnect } from '../../services/reducers/orders/actions';
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
      {!orders.length && <h3 className="text text_type_digits-medium mt-10 mb-5">Загрузка...</h3>}
      <OrderFeed data={orders} handleChoseFeed={handleChoseFeed} />
    </section>
  );
};

export default ProfileOrders;
