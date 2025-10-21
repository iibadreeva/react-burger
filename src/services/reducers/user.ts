import { createSlice } from '@reduxjs/toolkit';

import {
  fetchForgotPassword,
  fetchGetUser,
  fetchLogin,
  fetchLogout,
  fetchRegister,
  fetchResetPassword,
  fetchUpdateUser,
} from '../actions/user';
import { UserType } from '../types/types';

type UserInitialType = {
  isAuth: boolean | null;
  isLoginRequest: boolean;
  user: UserType | null;
  resetEmail: string | null;
  isLoading: boolean;
  error: string | null;
};

export const initialState: UserInitialType = {
  isAuth: null,
  isLoginRequest: false,
  user: null,
  resetEmail: null,
  isLoading: false,
  error: null,
};

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
