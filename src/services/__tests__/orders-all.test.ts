import { emptyOrderResponse, mockOrderResponse } from '../../utils/mocks';
import { ordersAllOnMessage } from '../reducers/orders-all/constants';
import { initialState, ordersAllSlice } from '../reducers/orders-all/slice';

describe('Orders All', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('should return the initial state', () => {
    expect(ordersAllSlice.reducer(undefined, { type: '' })).toEqual(initialState);
  });

  it('should handle empty order data', () => {
    const result = ordersAllSlice.reducer(initialState, ordersAllOnMessage(emptyOrderResponse));
    expect(result).toEqual({
      ordersResponse: emptyOrderResponse,
    });
  });

  it('should handle  order with data', () => {
    const result = ordersAllSlice.reducer(initialState, ordersAllOnMessage(mockOrderResponse));
    expect(result).toEqual({
      ordersResponse: mockOrderResponse,
    });
  });
});
