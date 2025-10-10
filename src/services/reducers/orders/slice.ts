import { createSelector, createSlice } from '@reduxjs/toolkit';

import { RootState } from '../../store';
import { OrderResponseType, OrderWithIngredients } from '../../types/types';
import { ingredientsMapSelector } from '../ingredients-slice';
import { ordersOnMessage } from './actions';

export interface OrdersState {
  ordersResponse: OrderResponseType | null;
}

const initialState: OrdersState = {
  ordersResponse: null,
};

export const ordersSlice = createSlice({
  name: 'orders',
  initialState,
  reducers: {},
  extraReducers: builder =>
    builder.addCase(ordersOnMessage, (state, action) => {
      state.ordersResponse = action.payload;
    }),
});

export const ordersResponseSelector = (state: RootState) => state.orders.ordersResponse;

export const ordersSelector = createSelector(
  ordersResponseSelector,
  ingredientsMapSelector,
  (ordersResponse, ingredientsMap) => {
    if (ordersResponse) {
      return ordersResponse.orders.map<OrderWithIngredients>(order => ({
        ...order,
        ingredients:
          order.ingredients.map(ingredientId => ingredientsMap[ingredientId as any]) ?? [],
      }));
    }

    return [];
  }
);
