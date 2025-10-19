import { emptyOrderResponse, mockOrderResponse } from '../../utils/mocks';
import { ordersOnMessage } from '../reducers/orders/constants';
import { initialState, ordersSlice } from '../reducers/orders/slice';

describe('orders slice', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('should return the initial state', () => {
    const result = ordersSlice.reducer(undefined, { type: '' });
    expect(result).toEqual(initialState);
  });

  it('should handle empty order data', () => {
    const result = ordersSlice.reducer(initialState, ordersOnMessage(emptyOrderResponse));
    expect(result).toEqual({
      ordersResponse: emptyOrderResponse,
    });
  });

  it('should handle  order with data', () => {
    const result = ordersSlice.reducer(initialState, ordersOnMessage(mockOrderResponse));
    expect(result).toEqual({
      ordersResponse: mockOrderResponse,
    });
  });

  it('should handle unknown actions gracefully', () => {
    const stateWithOrders = {
      ordersResponse: mockOrderResponse,
    };
    const result = ordersSlice.reducer(stateWithOrders, { type: 'unknown/action' });

    expect(result).toEqual(stateWithOrders);
  });
});
