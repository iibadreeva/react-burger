import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';

import { api } from '../../api/api-call';
import { deleteCookie, getCookie, setCookie } from '../../utils/cookie';
import { LoginType, RegisterType, ResetPasswordType, UserType } from '../../utils/types';

type UserInitialType = {
  isAuth: boolean | null;
  isLoginRequest: boolean;
  user: UserType | null;
  resetEmail: string | null;
  isLoading: boolean;
  error: string | null;
};

const initialState: UserInitialType = {
  isAuth: null,
  isLoginRequest: false,
  user: null,
  resetEmail: null,
  isLoading: false,
  error: null,
};

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
  const options: any = {
    headers: {
      authorization: getCookie('token'),
    },
  };

  return api.get('/auth/user', options).then(res => {
    return res.user;
  });
});

export const fetchUpdateUser = createAsyncThunk(
  'user/fetchUpdateUser',
  async ({ name, password, email }: RegisterType) => {
    const options: any = {
      headers: {
        authorization: getCookie('token'),
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

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    reset: state => {
      state.isAuth = false;
      state.isLoginRequest = false;
      state.user = null;
      state.resetEmail = null;
      state.isLoading = false;
      state.error = null;
    },
    resetLoad: state => {
      state.isLoading = false;
      state.error = null;
    },
    authFailed: state => {
      state.isAuth = false;
    },
  },
  extraReducers: builder => {
    builder
      .addCase(fetchForgotPassword.pending, state => {
        state.isLoading = true;
        state.error = null;
        state.resetEmail = null;
      })
      .addCase(fetchForgotPassword.fulfilled, (state, action) => {
        state.resetEmail = action.payload;
        state.isLoading = false;
        state.error = null;
      })
      .addCase(fetchForgotPassword.rejected, (state, action) => {
        state.error = action.error.message || 'Произошла ошибка';
        state.isLoading = false;
        state.resetEmail = null;
      })
      .addCase(fetchResetPassword.pending, state => {
        state.isLoading = true;
        state.error = null;
        state.isLoginRequest = false;
      })
      .addCase(fetchResetPassword.fulfilled, (state, action) => {
        state.isLoginRequest = true;
        state.isLoading = false;
        state.error = null;
      })
      .addCase(fetchResetPassword.rejected, (state, action) => {
        state.error = action.error.message || 'Произошла ошибка';
        state.isLoading = false;
      })
      .addCase(fetchRegister.pending, state => {
        state.isLoading = true;
        state.error = null;
        state.isLoginRequest = true;
      })
      .addCase(fetchRegister.fulfilled, (state, action) => {
        state.isAuth = true;
        state.isLoading = false;
        state.error = null;
        state.isLoginRequest = false;
        state.user = action.payload;
      })
      .addCase(fetchRegister.rejected, (state, action) => {
        state.error = action.error.message || 'Произошла ошибка';
        state.isLoading = false;
        state.isLoginRequest = false;
      })
      .addCase(fetchLogin.pending, state => {
        state.isLoading = true;
        state.error = null;
        state.isLoginRequest = true;
      })
      .addCase(fetchLogin.fulfilled, (state, action) => {
        state.isAuth = true;
        state.isLoading = false;
        state.error = null;
        state.isLoginRequest = false;
        state.user = action.payload;
      })
      .addCase(fetchLogin.rejected, (state, action) => {
        state.error = action.error.message || 'Произошла ошибка';
        state.isLoading = false;
        state.isLoginRequest = false;
      })
      .addCase(fetchUpdateUser.pending, state => {
        state.isLoading = true;
        state.error = null;
        state.isLoginRequest = true;
      })
      .addCase(fetchUpdateUser.fulfilled, (state, action) => {
        state.isLoading = false;
        state.error = null;
        state.isLoginRequest = false;
        state.user = action.payload;
      })
      .addCase(fetchUpdateUser.rejected, (state, action) => {
        state.error = action.error.message || 'Произошла ошибка';
        state.isLoading = false;
        state.isLoginRequest = false;
      })
      .addCase(fetchGetUser.pending, state => {
        state.isLoading = true;
        // state.isLoginRequest = true;
        state.isAuth = null;
      })
      .addCase(fetchGetUser.fulfilled, (state, action) => {
        state.isAuth = true;
        state.isLoading = false;
        // state.isLoginRequest = false;
        state.user = action.payload;
      })
      .addCase(fetchGetUser.rejected, (state, action) => {
        state.isLoading = false;
        // state.isLoginRequest = false;
      })
      .addCase(fetchLogout.pending, state => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(fetchLogout.fulfilled, (state, action) => {
        state.isAuth = false;
        state.isLoading = false;
      })
      .addCase(fetchLogout.rejected, (state, action) => {
        state.error = action.error.message || 'Произошла ошибка';
      });
  },
});

export const { reset, resetLoad, authFailed } = userSlice.actions;

export default userSlice.reducer;
