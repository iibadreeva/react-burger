import { createAction } from '@reduxjs/toolkit';

import { OrderResponseType } from '../../types/types';

export const ordersConnect = createAction<string>('orders/connect');
export const ordersDisconnect = createAction('orders/disconnect');

export const ordersOnConnecting = createAction('orders/onConnecting');
export const ordersOnOpen = createAction('orders/onOpen');
export const ordersOnClose = createAction('orders/onClose');
export const ordersOnError = createAction<string>('orders/onError');
export const ordersOnMessage = createAction<OrderResponseType>('orders/onMessage');
