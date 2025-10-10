export const enum INGREDIENT_TYPE {
  Bun = 'bun',
  Sauce = 'sauce',
  Main = 'main',
}

export type OrderStatus = 'done' | 'pending' | 'created';

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
  count?: number;
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

export type OrderType = {
  createdAt: string;
  ingredients: IngredientType[];
  name: string;
  number: number;
  status: OrderStatus;
  updatedAt: string;
  _id: string;
};

export type OrderResponseType = {
  orders: OrderType[];
  success: boolean;
  total: number;
  totalToday: number;
};

export type OrderWithIngredients = Omit<OrderType, 'ingredients'>;
