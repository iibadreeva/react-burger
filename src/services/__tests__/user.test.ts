import { mockNewUser } from '../../utils/mocks';
import {
  fetchForgotPassword,
  fetchGetUser,
  fetchLogin,
  fetchLogout,
  fetchRegister,
  fetchResetPassword,
  fetchUpdateUser,
} from '../actions/user';
import userSlice, { authFailed, initialState, reset, resetLoad } from '../reducers/user';

describe('user slice', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('should return the initial state', () => {
    const result = userSlice(undefined, { type: '' });
    expect(result).toEqual(initialState);
  });

  it('should reset', () => {
    const stateWithOrder = {
      ...initialState,
      user: mockNewUser,
    };

    const action = reset();
    const result = userSlice(stateWithOrder, action);

    expect(result).toEqual({ ...initialState, isAuth: false });
  });

  it('should resetLoad', () => {
    const stateWithOrder = {
      ...initialState,
      isLoading: true,
      error: '55',
    };

    const action = resetLoad();
    const result = userSlice(stateWithOrder, action);

    expect(result).toEqual({ ...initialState, isLoading: false, error: null });
  });

  it('should reset auth', () => {
    const stateWithOrder = {
      ...initialState,
      isAuth: true,
    };

    const action = authFailed();
    const result = userSlice(stateWithOrder, action);

    expect(result).toEqual({ ...initialState, isAuth: false });
  });

  it('should successful fetchForgotPassword', () => {
    const fulfilledAction = {
      type: fetchForgotPassword.fulfilled.type,
      payload: mockNewUser.email,
    };
    const fulfilledResult = userSlice(initialState, fulfilledAction);
    expect(fulfilledResult.resetEmail).toBe(mockNewUser.email);
    expect(fulfilledResult.isLoading).toBe(false);
    expect(fulfilledResult.error).toBe(null);
    expect(fulfilledResult.user).toBe(null);
  });

  it('should successful fetchResetPassword', () => {
    const fulfilledAction = {
      type: fetchResetPassword.fulfilled.type,
    };
    const fulfilledResult = userSlice(initialState, fulfilledAction);
    expect(fulfilledResult.isLoading).toBe(false);
    expect(fulfilledResult.error).toBe(null);
    expect(fulfilledResult.isLoginRequest).toBe(true);
  });

  it('should successful fetchRegister', () => {
    const fulfilledAction = {
      type: fetchRegister.fulfilled.type,
      payload: mockNewUser,
    };
    const fulfilledResult = userSlice(initialState, fulfilledAction);
    expect(fulfilledResult.isAuth).toBe(true);
    expect(fulfilledResult.isLoading).toBe(false);
    expect(fulfilledResult.error).toBe(null);
    expect(fulfilledResult.isLoginRequest).toBe(false);
    expect(fulfilledResult.user).toEqual(mockNewUser);
  });

  it('should successful fetchLogin', () => {
    const fulfilledAction = {
      type: fetchLogin.fulfilled.type,
      payload: mockNewUser,
    };
    const fulfilledResult = userSlice(initialState, fulfilledAction);
    expect(fulfilledResult).toEqual({
      ...initialState,
      isAuth: true,
      isLoading: false,
      error: null,
      isLoginRequest: false,
      user: mockNewUser,
    });
  });

  it('should successful fetchUpdateUser', () => {
    const fulfilledAction = {
      type: fetchUpdateUser.fulfilled.type,
      payload: mockNewUser,
    };
    const fulfilledResult = userSlice(initialState, fulfilledAction);
    expect(fulfilledResult).toEqual({
      ...initialState,
      isLoading: false,
      error: null,
      isLoginRequest: false,
      user: mockNewUser,
    });
  });

  it('should successful fetchGetUser', () => {
    const fulfilledAction = {
      type: fetchGetUser.fulfilled.type,
      payload: mockNewUser,
    };
    const fulfilledResult = userSlice(initialState, fulfilledAction);
    expect(fulfilledResult).toEqual({
      ...initialState,
      isAuth: true,
      isLoading: false,
      user: mockNewUser,
    });
  });

  it('should successful fetchLogout', () => {
    const fulfilledAction = {
      type: fetchLogout.fulfilled.type,
    };
    const fulfilledResult = userSlice(initialState, fulfilledAction);
    expect(fulfilledResult).toEqual({
      ...initialState,
      isAuth: false,
      isLoading: false,
    });
  });
});
