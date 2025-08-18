// @ts-ignore
import PropTypes from 'prop-types';

export const dataPropTypes = PropTypes.shape({
  __id: PropTypes.string.isRequired,
  type: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  price: PropTypes.number.isRequired,
  image: PropTypes.string.isRequired,
  calories: PropTypes.string.isRequired,
  proteins: PropTypes.string.isRequired,
  fat: PropTypes.string.isRequired,
  carbohydrates: PropTypes.string.isRequired
});

export const enum INGREDIENT_TYPE {
  Bun = 'bun',
  Sauce = 'sauce',
  Main = 'main'
}

export type IngredientType = {
  _id: string;
  carbohydrates: number;
  calories: number;
  fat: number;
  image: string;
  image_mobile: string;
  image_large: string;
  name: string;
  price: number;
  proteins: number;
  type: INGREDIENT_TYPE;
};
