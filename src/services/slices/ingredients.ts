import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

import { IngredientType } from '../../utils/types';
import { api } from '../../api/api-call';

type IngredientsType = {
  data: IngredientType[];
  isLoading: boolean;
  error: string | null;
};

const initialState: IngredientsType = {
  data: [],
  isLoading: false,
  error: null
};

export const fetchIngredients = createAsyncThunk(
  'ingredients/fetchIngredients',
  async (options: RequestInit = {}) => {
    return api
      .get('ingredients', options)
      .then((ingredients) => ingredients.data)
      .catch((error) => Promise.reject(error));
  }
);

const ingredientsSlice = createSlice({
  name: 'ingredients',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchIngredients.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(fetchIngredients.fulfilled, (state, action) => {
        state.isLoading = false;
        state.data = action.payload;
      })
      .addCase(fetchIngredients.rejected, (state, action) => {
        state.isLoading = false;
        state.error =
          action.error.message || 'Произошла ошибка при загрузке ингредиентов';
      });
  }
});

export default ingredientsSlice.reducer;
