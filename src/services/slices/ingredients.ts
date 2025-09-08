import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';

import { api } from '../../api/api-call';
import { IngredientType } from '../../utils/types';

type IngredientsType = {
  data: IngredientType[];
  current: IngredientType | null;
  isLoading: boolean;
  error: string | null;
};

const initialState: IngredientsType = {
  data: [],
  current: null,
  isLoading: false,
  error: null,
};

export const fetchIngredients = createAsyncThunk(
  'ingredients/fetchIngredients',
  async (options: RequestInit = {}) => {
    return api.get('/ingredients', options).then(ingredients => ingredients.data);
  }
);

const ingredientsSlice = createSlice({
  name: 'ingredients',
  initialState,
  reducers: {
    setCurrentIngredient: (state, action) => {
      state.current = state.data.find(item => item._id === action.payload) || null;
    },
  },
  extraReducers: builder => {
    builder
      .addCase(fetchIngredients.pending, state => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(fetchIngredients.fulfilled, (state, action) => {
        state.isLoading = false;
        state.data = action.payload;
      })
      .addCase(fetchIngredients.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.error.message || 'Произошла ошибка при загрузке ингредиентов';
      });
  },
});

export const { setCurrentIngredient } = ingredientsSlice.actions;

export default ingredientsSlice.reducer;
