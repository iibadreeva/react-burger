import { createSelector, createSlice } from '@reduxjs/toolkit';

import { RootState } from '../../store';
import { OrderResponseType, OrderWithIngredients } from '../../types/types';
import { ingredientsMapSelector } from '../ingredients-slice';
import { ordersAllOnMessage } from './actions';

export interface OrdersAllState {
  ordersResponse: OrderResponseType | null;
}

const initialState: OrdersAllState = {
  ordersResponse: null,
};

export const ordersAllSlice = createSlice({
  name: 'ordersAll',
  initialState,
  reducers: {},
  extraReducers: builder =>
    builder.addCase(ordersAllOnMessage, (state, action) => {
      state.ordersResponse = action.payload;
    }),
});

export const ordersAllResponseSelector = (state: RootState) => state.ordersAll.ordersResponse;

export const ordersAllSelector = createSelector(
  ordersAllResponseSelector,
  ingredientsMapSelector,
  (ordersAllResponse, ingredientsMap) => {
    if (ordersAllResponse) {
      return ordersAllResponse.orders.map<OrderWithIngredients>(order => ({
        ...order,
        ingredients:
          order.ingredients.map((ingredientId: any) => ingredientsMap[ingredientId]) ?? [],
      }));
    }

    return [];
  }
);
