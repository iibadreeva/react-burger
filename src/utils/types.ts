export const enum INGREDIENT_TYPE {
  Bun = 'bun',
  Sauce = 'sauce',
  Main = 'main',
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
  uniqueId?: string;
  index?: number;
};

export type TabType = {
  title: string;
  type: INGREDIENT_TYPE;
};

export type UserType = {
  email: string;
  name: string;
};

export type LoginType = {
  email: string;
  password: string;
};

export type RegisterType = {
  email: string;
  name: string;
  password: string;
};

export type ResetPasswordType = {
  password: string;
  token: string;
};
