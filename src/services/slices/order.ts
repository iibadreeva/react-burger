import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';

import { api } from '../../api/api-call';
import { getCookie } from '../../utils/cookie';

type IngredientType = {
  id: string;
  uniqueId: string;
};

type OrderType = {
  order: number | null;
  ingredients: IngredientType[];
  bun: string | null;
  isLoading: boolean;
  error: string | null;
};

const initialState: OrderType = {
  order: null,
  ingredients: [],
  bun: null,
  isLoading: false,
  error: null,
};

export const sendOrder = createAsyncThunk('order/sendOrder', async (ids: string[]) => {
  const data = {
    ingredients: ids,
  };
  const options: any = {
    headers: {
      authorization: getCookie('token'),
    },
  };
  return api.post('/orders', data, options).then(res => res?.order?.number);
});

const orderSlice = createSlice({
  name: 'order',
  initialState,
  reducers: {
    reset: state => {
      state.order = null;
      state.isLoading = false;
      state.error = null;
      state.bun = null;
      state.ingredients = [];
    },
    addBun: (state, action) => {
      state.bun = action.payload;
    },
    addIngredient: (state, action) => {
      state.ingredients.push(action.payload);
    },
    moveIngredient: (state, action) => {
      const { dragIndex, hoverIndex } = action.payload;
      const draggedItem = state.ingredients[dragIndex];
      state.ingredients.splice(dragIndex, 1);
      state.ingredients.splice(hoverIndex, 0, draggedItem);
    },
    removeIngredient: (state, action) => {
      state.ingredients = state.ingredients.filter(item => item.uniqueId !== action.payload);
    },
  },
  extraReducers: builder => {
    builder
      .addCase(sendOrder.pending, state => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(sendOrder.fulfilled, (state, action) => {
        state.isLoading = false;
        state.order = action.payload;
      })
      .addCase(sendOrder.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.error.message || 'Произошла ошибка';
      });
  },
});

export const { reset, addBun, addIngredient, moveIngredient, removeIngredient } =
  orderSlice.actions;

export default orderSlice.reducer;
