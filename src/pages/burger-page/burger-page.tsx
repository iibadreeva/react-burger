import React from 'react';
import { DndProvider } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';

import styles from '../../components/app/app.module.css';
import BurgerConstructor from '../../components/burger-constructor/burger-constructor';
import BurgerIngredients from '../../components/burger-ingredients/burger-ingredients';
import Loading from '../../components/loading/loading';
import { useAppSelector } from '../../services/store';

const BurgerPage = () => {
  const { isLoading, error } = useAppSelector(state => state.ingredients);

  if (error) {
    return (
      <section className={styles.main}>
        <h1 className="text text_type_main-large mt-10 mb-5">{error}</h1>
      </section>
    );
  }

  return (
    <>
      {isLoading ? (
        <Loading />
      ) : (
        <DndProvider backend={HTML5Backend}>
          <BurgerIngredients />
          <BurgerConstructor />
        </DndProvider>
      )}
    </>
  );
};

export default BurgerPage;
