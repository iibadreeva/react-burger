import { createSelector, createSlice } from '@reduxjs/toolkit';

import { fetchIngredients } from '../actions/ingredients';
import { RootState } from '../store';
import { IngredientType } from '../types/types';

type IngredientsType = {
  data: IngredientType[];
  current: IngredientType | null;
  isLoading: boolean;
  error: string | null;
};

export const initialState: IngredientsType = {
  data: [],
  current: null,
  isLoading: false,
  error: null,
};

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

export const allIngredientsSelector = (store: RootState) => store.ingredients.data;

export const ingredientsMapSelector = createSelector(allIngredientsSelector, allIngredients =>
  allIngredients.reduce<Record<string, IngredientType>>((accumulate, ingredient) => {
    accumulate[ingredient._id] = ingredient;

    return accumulate;
  }, {})
);

export const { setCurrentIngredient } = ingredientsSlice.actions;

export default ingredientsSlice.reducer;
