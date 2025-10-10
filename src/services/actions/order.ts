import { createAsyncThunk } from '@reduxjs/toolkit';

import { api } from '../../api/api-call';
import { getCookie } from '../../utils/cookie';

export const sendOrder = createAsyncThunk('order/sendOrder', async (ids: string[]) => {
  const data = {
    ingredients: ids,
  };
  const options = {
    headers: {
      authorization: getCookie('token') || '',
    },
  };
  return api.post('/orders', data, options).then(res => res?.order?.number);
});
