import { createAsyncThunk } from '@reduxjs/toolkit';

import { api } from '../../api/api-call';

export const fetchIngredients = createAsyncThunk(
  'ingredients/fetchIngredients',
  async (options: RequestInit = {}) => {
    return api.get('/ingredients', options).then(ingredients => ingredients.data);
  }
);
