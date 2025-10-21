import { mockSendOrder } from '../../utils/mocks';
import { sendOrder } from '../actions/order';
import orderSlice, {
  addBun,
  addIngredient,
  initialState,
  moveIngredient,
  removeIngredient,
  reset,
} from '../reducers/order';

describe('order', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('should return the initial state', () => {
    const result = orderSlice(undefined, { type: '' });
    expect(result).toEqual(initialState);
  });

  it('should reset', () => {
    const stateWithOrder = {
      ...initialState,
      order: 123,
      ingredients: [{ id: '321', uniqueId: '456' }],
      error: 'Some error',
    };

    const action = reset();
    const result = orderSlice(stateWithOrder, action);

    expect(result).toEqual(initialState);
  });

  it('should addBun only', () => {
    const bun = 'rocket';
    const action = addBun(bun);
    const result = orderSlice(initialState, action);

    expect(result).toEqual({ ...initialState, bun });

    const bun2 = 'ball';
    const action2 = addBun(bun2);
    const result2 = orderSlice(initialState, action2);

    expect(result2).toEqual({ ...initialState, bun: bun2 });
  });

  it('should add ingredients', () => {
    const ingredients = [];

    const ingredientOne = { id: '321', uniqueId: '456' };

    ingredients.push(ingredientOne);

    const resultOrder = orderSlice(initialState, addIngredient(ingredientOne));

    expect(resultOrder.ingredients).toEqual(ingredients);

    // добавляем еще
    const ingredientTwo = { id: '4321', uniqueId: '3456' };
    ingredients.push(ingredientTwo);

    const resultOrderTwo = orderSlice(resultOrder, addIngredient(ingredientTwo));

    expect(resultOrderTwo.ingredients).toEqual(ingredients);
  });

  it('should remove ingredients', () => {
    const ingredients = [
      { id: '147', uniqueId: '741' },
      { id: '258', uniqueId: '852' },
    ];
    const newInitialState = { ...initialState, ingredients };

    const resultOrder = orderSlice(newInitialState, removeIngredient('852'));

    expect(resultOrder.ingredients).toEqual([{ id: '147', uniqueId: '741' }]);
  });

  it('should move ingredients', () => {
    const ingredients = [
      { id: '147', uniqueId: '741' },
      { id: '258', uniqueId: '852' },
      { id: '369', uniqueId: '963' },
    ];
    const newInitialState = { ...initialState, ingredients };
    const resultOrder = orderSlice(
      newInitialState,
      moveIngredient({ dragIndex: 1, hoverIndex: 2 })
    );
    const ingredientsResult = [
      { id: '147', uniqueId: '741' },
      { id: '369', uniqueId: '963' },
      { id: '258', uniqueId: '852' },
    ];
    expect(resultOrder.ingredients).toEqual(ingredientsResult);

    const resultOrderTwo = orderSlice(resultOrder, moveIngredient({ dragIndex: 1, hoverIndex: 0 }));
    const ingredientsResultTwo = [
      { id: '369', uniqueId: '963' },
      { id: '147', uniqueId: '741' },
      { id: '258', uniqueId: '852' },
    ];
    expect(resultOrderTwo.ingredients).toEqual(ingredientsResultTwo);
  });

  it('should sendOrder successful after loading', () => {
    const pendingAction = { type: sendOrder.pending.type };
    const pendingResult = orderSlice(initialState, pendingAction);

    expect(pendingResult.order).toBe(null);
    expect(pendingResult.error).toBe(null);
    expect(pendingResult.isLoading).toBe(true);

    const fulfilledAction = {
      type: sendOrder.fulfilled.type,
      payload: mockSendOrder,
    };
    const fulfilledResult = orderSlice(initialState, fulfilledAction);
    expect(fulfilledResult.isLoading).toBe(false);
    expect(fulfilledResult.error).toBe(null);
    expect(fulfilledResult.order).toEqual(mockSendOrder);
  });
});
