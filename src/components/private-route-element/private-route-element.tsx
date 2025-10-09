import React, { FC, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

import { ROUTES } from '../../constants';
import Loading from '../loading/loading';

type PrivateRouteProps = {
  component: FC;
  isAuth: null | boolean;
};

const ProtectedRouteElement: FC<PrivateRouteProps> = ({ component: Component, isAuth }) => {
  const navigate = useNavigate();

  useEffect(() => {
    if (isAuth === false) {
      navigate(ROUTES.LOGIN);
    }
  }, [isAuth, navigate]);

  if (isAuth === null) {
    return <Loading />;
  }

  if (!isAuth) {
    return null;
  }

  return <Component />;
};

export default ProtectedRouteElement;
