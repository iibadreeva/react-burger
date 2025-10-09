import { createSelector } from '@reduxjs/toolkit';

import { RootState } from '../store';
import { IngredientType } from '../types/types';

export const allIngredientsSelector = (store: RootState) => store.ingredients.data;

export const ingredientsMapSelector = createSelector(allIngredientsSelector, allIngredients =>
  allIngredients.reduce<Record<string, IngredientType>>((accumulate, ingredient) => {
    accumulate[ingredient._id] = ingredient;

    return accumulate;
  }, {})
);
