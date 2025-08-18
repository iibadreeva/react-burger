import React, { useEffect } from 'react';
import { HTML5Backend } from 'react-dnd-html5-backend';
import { DndProvider } from 'react-dnd';

import AppHeader from '../app-header/app-header';
import BurgerIngredients from '../burger-ingredients/burger-ingredients';
import BurgerConstructor from '../burger-constructor/burger-constructor';

import { fetchIngredients } from '../../services/slices/ingredients';
import { useAppDispatch, useAppSelector } from '../../services/store';

import styles from './app.module.css';

function App() {
  const dispatch = useAppDispatch();

  const { data, isLoading, error } = useAppSelector(
    (state) => state.ingredients
  );

  useEffect(() => {
    dispatch(fetchIngredients());
  }, [dispatch]);

  if (error) {
    return (
      <section className={styles.main}>
        <h1 className="mt-10 mb-5 text text_type_main-large">{error}</h1>
      </section>
    );
  }

  return (
    <div className={styles.container}>
      <AppHeader />

      <main className={styles.main}>
        {isLoading ? (
          <h3 className="mt-10 mb-5 text text_type_digits-medium">
            Загрузка...
          </h3>
        ) : (
          <DndProvider backend={HTML5Backend}>
            <BurgerIngredients data={data} />
            <BurgerConstructor data={data} />
          </DndProvider>
        )}
      </main>
    </div>
  );
}

export default App;
