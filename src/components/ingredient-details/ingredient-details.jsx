import cn from 'classnames';
import PropTypes from 'prop-types';

import Modal from '../modal/modal';

import styles from './ingredient-details.module.css';

const IngredientDetails = ({
  onClose,
  name,
  image,
  calories,
  proteins,
  fat,
  carbohydrates
}) => {
  return (
    <Modal onClose={onClose}>
      <main className="pt-10 pl-10 pr-10 pb-15">
        <header className="text text_type_main-large mt-10 mb-5">
          Детали ингредиента
        </header>
        <figure className="mb-8">
          <img
            className={cn('mb-4', styles.image)}
            src={image}
            alt={name}
            width="480"
            height="240"
          />

          <figcaption className="text-center text text_type_main-medium">
            {name}
          </figcaption>
        </figure>

        <ul className={styles.footer}>
          <li className={styles.list}>
            <span className="text text_type_main-default text_color_inactive mb-2">
              Калории,ккал
            </span>
            <span className="text text_type_digits-default text_color_inactive">
              {calories}
            </span>
          </li>
          <li className={styles.list}>
            <span className="text text_type_main-default text_color_inactive mb-2">
              Белки, г
            </span>
            <span className="text text_type_digits-default text_color_inactive">
              {proteins}
            </span>
          </li>
          <li className={styles.list}>
            <span className="text text_type_main-default text_color_inactive mb-2">
              Жиры, г
            </span>
            <span className="text text_type_digits-default text_color_inactive">
              {fat}
            </span>
          </li>
          <li className={styles.list}>
            <span className="text text_type_main-default text_color_inactive mb-2">
              Углеводы, г{' '}
            </span>
            <span className="text text_type_digits-default text_color_inactive">
              {carbohydrates}
            </span>
          </li>
        </ul>
      </main>
    </Modal>
  );
};

IngredientDetails.propTypes = {
  onClose: PropTypes.func.isRequired,
  name: PropTypes.string.isRequired,
  image: PropTypes.string.isRequired,
  calories: PropTypes.string.isRequired,
  proteins: PropTypes.string.isRequired,
  fat: PropTypes.string.isRequired,
  carbohydrates: PropTypes.string.isRequired
};

export default IngredientDetails;
