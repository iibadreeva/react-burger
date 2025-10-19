import { INGREDIENT_TYPE, TabType } from '../services/types/types';

export const tabs: TabType[] = [
  {
    title: 'Булки',
    type: INGREDIENT_TYPE.Bun,
  },
  {
    title: 'Соусы',
    type: INGREDIENT_TYPE.Sauce,
  },
  {
    title: 'Начинки',
    type: INGREDIENT_TYPE.Main,
  },
];
