import { useEffect } from 'react';

import { authFailed, fetchGetUser, fetchRefreshToken } from '../services/slices/user';
import { useAppDispatch } from '../services/store';
import { getCookie } from '../utils/cookie';

export const useCheckedUser = () => {
  const dispatch = useAppDispatch();

  useEffect(() => {
    const checkedUser = async () => {
      if (!getCookie('token')) {
        await dispatch(fetchRefreshToken());
      }

      if (getCookie('token')) {
        await dispatch(fetchGetUser());
      } else {
        dispatch(authFailed());
      }
    };

    checkedUser().then();
  }, [dispatch]);
};
