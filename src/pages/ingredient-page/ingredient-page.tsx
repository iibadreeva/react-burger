import React, { useEffect } from 'react';
import { useParams } from 'react-router';

import styles from '../../components/app/app.module.css';
import IngredientDetails from '../../components/ingredient-details/ingredient-details';
import { setCurrentIngredient } from '../../services/slices/ingredients';
import { useAppDispatch, useAppSelector } from '../../services/store';

const IngredientPage = () => {
  const dispatch = useAppDispatch();
  const { id } = useParams();

  const { isLoading, error, data } = useAppSelector(state => state.ingredients);

  useEffect(() => {
    if (data.length > 0) {
      dispatch(setCurrentIngredient(id));
    }
  }, [dispatch, id, data]);

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
        <h3 className="text text_type_digits-medium mt-10 mb-5">Загрузка...</h3>
      ) : (
        <IngredientDetails isPage />
      )}
    </>
  );
};

export default IngredientPage;
