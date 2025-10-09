import React, { FC, useEffect } from 'react';
import { Route, Routes, useLocation, useNavigate } from 'react-router-dom';

import { useCheckedUser } from '../../hooks/use-checked-user';
import { fetchIngredients } from '../../services/actions/ingredients';
import { useAppDispatch, useAppSelector } from '../../services/store';
import AppHeader from '../app-header/app-header';
import { withErrorBoundary } from '../error-boundary/error-boundary';
import IngredientDetails from '../ingredient-details/ingredient-details';
import Modal from '../modal/modal';
import OrderInfo from '../order-info/order-info';
import PrivateRoute from '../private-route-element/private-route-element';
import styles from './app.module.css';
import { routes } from './routes';

function App() {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const location = useLocation();
  const background = location.state && location.state.backgroundLocation;
  const ingredient = location.state && location.state.ingredient;

  const { isAuth } = useAppSelector(state => state.user);

  const handleCloseModal = () => {
    navigate(-1);
  };

  useCheckedUser();

  useEffect(() => {
    dispatch(fetchIngredients());
  }, [dispatch]);

  return (
    <div className={styles.container}>
      <AppHeader />

      <main className={styles.main}>
        <Routes location={background || location}>
          {routes.map(({ path, component, isPrivate, ...rest }) => {
            const Component = component as FC;
            const RouteComponent = isPrivate ? PrivateRoute : Component;

            return (
              <Route
                path={path}
                element={
                  <RouteComponent
                    {...rest}
                    isAuth={isAuth}
                    component={withErrorBoundary(component as FC) as FC}
                  />
                }
              />
            );
          })}
        </Routes>

        {background && (
          <Routes>
            <Route
              path="/ingredients/:id"
              element={
                <Modal onClose={handleCloseModal}>
                  <IngredientDetails />
                </Modal>
              }
            />
            <Route
              path="/feed/:id"
              element={
                <Modal onClose={handleCloseModal}>
                  <OrderInfo data={ingredient} />
                </Modal>
              }
            />
            <Route
              path="/profile/orders/:id"
              element={
                <Modal onClose={handleCloseModal}>
                  <OrderInfo data={ingredient} />
                </Modal>
              }
            />
          </Routes>
        )}
      </main>
    </div>
  );
}

export default App;
