import React from 'react';

import AppHeader from '../app-header/app-header';
import BurgerIngredients from '../burger-ingredients/burger-ingredients';
import BurgerConstructor from '../burger-constructor/burger-constructor';

import { useApiIngredients } from '../../hooks/use-api-ingredients';

import styles from './app.module.css';

function App() {
  const { isLoading, data, isError } = useApiIngredients();

  return (
    <div className={styles.container}>
      <AppHeader />
      <main className={styles.main}>
        {isLoading && 'Loading'}
        {isError && 'Error'}
        {!isLoading && !isError && (
          <>
            <BurgerIngredients data={data} />
            <BurgerConstructor data={data} />
          </>
        )}
      </main>
    </div>
  );
}

export default App;
