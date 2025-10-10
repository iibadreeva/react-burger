import { FC, useEffect, useState } from 'react';
import cn from 'classnames';
import { useLocation } from 'react-router-dom';

import { useAppSelector } from '../../services/store';
import { IngredientType } from '../../services/types/types';
import styles from './ingredient-details.module.css';

type Props = {
  isPage?: boolean;
};

const IngredientDetails: FC<Props> = ({ isPage }) => {
  const location = useLocation();
  const current = useAppSelector(state => state.ingredients.current);
  const [item, setItem] = useState<IngredientType | null>(current);

  useEffect(() => {
    const ingredient = location.state && location.state.ingredient;

    if (ingredient) {
      setItem(ingredient);
    } else {
      setItem(current);
    }
  }, [location, current]);

  return (
    <div
      className={cn('pt-10 pr-10 pb-15 pl-10', {
        [styles.wrap]: isPage,
      })}
    >
      <header className="text text_type_main-large mt-10 mb-5">Детали ингредиента</header>
      <figure className="mb-8">
        <img
          className={cn('mb-4', styles.image)}
          src={item?.image}
          alt={item?.name}
          width="480"
          height="240"
        />

        <figcaption className="text text_type_main-medium text-center">{item?.name}</figcaption>
      </figure>

      <ul className={styles.footer}>
        <li className={styles.list}>
          <span className="text text_type_main-default text_color_inactive mb-2">Калории,ккал</span>
          <span className="text text_type_digits-default text_color_inactive">
            {item?.calories}
          </span>
        </li>
        <li className={styles.list}>
          <span className="text text_type_main-default text_color_inactive mb-2">Белки, г</span>
          <span className="text text_type_digits-default text_color_inactive">
            {item?.proteins}
          </span>
        </li>
        <li className={styles.list}>
          <span className="text text_type_main-default text_color_inactive mb-2">Жиры, г</span>
          <span className="text text_type_digits-default text_color_inactive">{item?.fat}</span>
        </li>
        <li className={styles.list}>
          <span className="text text_type_main-default text_color_inactive mb-2">Углеводы, г </span>
          <span className="text text_type_digits-default text_color_inactive">
            {item?.carbohydrates}
          </span>
        </li>
      </ul>
    </div>
  );
};

export default IngredientDetails;
