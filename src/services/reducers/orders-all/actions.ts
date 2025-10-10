import { createAction } from '@reduxjs/toolkit';

import { OrderResponseType } from '../../types/types';

export const ordersAllConnect = createAction<string>('ordersAll/connect');
export const ordersAllDisconnect = createAction('ordersAll/disconnect');

export const ordersAllOnConnecting = createAction('ordersAll/onConnecting');
export const ordersAllOnOpen = createAction('ordersAll/onOpen');
export const ordersAllOnClose = createAction('ordersAll/onClose');
export const ordersAllOnError = createAction<string>('ordersAll/onError');
export const ordersAllOnMessage = createAction<OrderResponseType>('ordersAll/onMessage');
