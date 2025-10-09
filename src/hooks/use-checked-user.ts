import { useEffect } from 'react';

import { fetchGetUser, fetchRefreshToken } from '../services/actions/user';
import { authFailed } from '../services/reducers/user';
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
