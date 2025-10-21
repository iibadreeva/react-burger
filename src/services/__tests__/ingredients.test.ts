import { data } from '../../utils/mocks';
import { fetchIngredients } from '../actions/ingredients';
import ingredientsSlice, { initialState, setCurrentIngredient } from '../reducers/ingredients';

describe('ingredients', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('Should return the initial state', () => {
    const result = ingredientsSlice(undefined, { type: '' });
    expect(result).toEqual(initialState);
  });

  it('Should setCurrentIngredient', () => {
    const newInitialState = { ...initialState, data };
    const id = '60666c42cc7b410027a1a9b5';
    const result = ingredientsSlice(newInitialState, setCurrentIngredient(id));

    expect(result.current).toEqual(data[1]);
  });

  it('Should fetchIngredients', () => {
    const fulfilledAction = {
      type: fetchIngredients.fulfilled.type,
      payload: data,
    };
    const fulfilledResult = ingredientsSlice(initialState, fulfilledAction);

    expect(fulfilledResult).toEqual({
      ...initialState,
      isLoading: false,
      data,
    });
  });
});
