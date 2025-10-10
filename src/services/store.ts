import { configureStore } from '@reduxjs/toolkit';
import { TypedUseSelectorHook, useDispatch, useSelector } from 'react-redux';

import { ordersAllMiddleware, ordersMiddleware } from './constants';
import ingredients from './reducers/ingredients';
import order from './reducers/order';
import { ordersAllSlice } from './reducers/orders-all/slice';
import { ordersSlice } from './reducers/orders/slice';
import user from './reducers/user';

export const store = configureStore({
  reducer: {
    ingredients,
    order,
    user,
    ordersAll: ordersAllSlice.reducer,
    orders: ordersSlice.reducer,
  },
  middleware: getDefaultMiddleware =>
    getDefaultMiddleware().concat(ordersAllMiddleware, ordersMiddleware),
  devTools: process.env.NODE_ENV !== 'production',
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export const useAppDispatch = useDispatch.withTypes<AppDispatch>();
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;
