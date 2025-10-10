import { createAsyncThunk } from '@reduxjs/toolkit';

import { api } from '../../api/api-call';
import { deleteCookie, getCookie, setCookie } from '../../utils/cookie';
import { LoginType, RegisterType, ResetPasswordType } from '../types/types';

export const fetchForgotPassword = createAsyncThunk(
  'user/fetchForgotPassword',
  async (email: string) => {
    const data = {
      email,
    };

    return api.post('/password-reset', data).then(_ => {
      return email;
    });
  }
);

export const fetchResetPassword = createAsyncThunk(
  'user/fetchResetPassword',
  async ({ password, token }: ResetPasswordType) => {
    const data = {
      password,
      token,
    };

    return api.post('/password-reset/reset', data).then(data => {
      return data;
    });
  }
);

export const fetchRegister = createAsyncThunk(
  'user/fetchRegister',
  async ({ email, password, name }: RegisterType) => {
    const data = {
      email,
      password,
      name,
    };

    return api.post('/auth/register', data).then(res => {
      setCookie('token', res.accessToken, { expires: 60 * 20 });
      localStorage.setItem('refreshToken', res.refreshToken);

      return res.user;
    });
  }
);

export const fetchLogin = createAsyncThunk(
  'user/fetchLogin',
  async ({ email, password }: LoginType) => {
    const data = {
      email,
      password,
    };

    return api.post('/auth/login', data).then(res => {
      setCookie('token', res.accessToken, { expires: 60 * 20 });
      localStorage.setItem('refreshToken', res.refreshToken);

      return res.user;
    });
  }
);

export const fetchRefreshToken = createAsyncThunk('user/fetchRefreshToken', async () => {
  const token = localStorage.getItem('refreshToken');

  if (!token) {
    return null;
  }

  return api.post('/auth/token', { token }).then(res => {
    setCookie('token', res.accessToken, { expires: 60 * 20 });
    localStorage.setItem('refreshToken', res.refreshToken);
  });
});

export const fetchGetUser = createAsyncThunk('user/fetchGetUser', async () => {
  const options = {
    headers: {
      authorization: getCookie('token') || '',
    },
  };

  return api.get('/auth/user', options).then(res => {
    return res.user;
  });
});

export const fetchUpdateUser = createAsyncThunk(
  'user/fetchUpdateUser',
  async ({ name, password, email }: RegisterType) => {
    const options = {
      headers: {
        authorization: getCookie('token') || '',
      },
    };
    const data: { [s: string]: string } = {
      name,
      email,
    };
    if (password) {
      data.password = password;
    }

    return api.patch('/auth/user', data, options).then(res => {
      return res.user;
    });
  }
);

export const fetchLogout = createAsyncThunk('user/fetchLogout', async () => {
  const token = localStorage.getItem('refreshToken');
  return api.post('/auth/logout', { token }).then(res => {
    localStorage.clear();
    deleteCookie('token');
    return res;
  });
});
