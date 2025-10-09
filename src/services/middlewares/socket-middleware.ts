import type {
  ActionCreatorWithoutPayload,
  ActionCreatorWithPayload,
  Middleware,
} from '@reduxjs/toolkit';

import { fetchRefreshToken } from '../actions/user';
import { RootState } from '../store';

export type TWsActions<R, S> = {
  connect: ActionCreatorWithPayload<string>;
  disconnect: ActionCreatorWithoutPayload;
  onConnecting?: ActionCreatorWithoutPayload;
  onOpen?: ActionCreatorWithoutPayload;
  onClose?: ActionCreatorWithoutPayload;
  onError: ActionCreatorWithPayload<string>;
  sendMessage?: ActionCreatorWithPayload<S>;
  onMessage: ActionCreatorWithPayload<R>;
};

export const socketMiddleware = <R, S>(
  wsActions: TWsActions<R, S>,
  withTokenRefresh: boolean = false
): Middleware<object, RootState> => {
  return store => {
    let socket: WebSocket | null = null;
    const { connect, sendMessage, onOpen, onClose, onError, onMessage, onConnecting, disconnect } =
      wsActions;
    const { dispatch } = store;
    let isConnected = false;
    let url = '';
    let reconnectId: NodeJS.Timeout | null = null;

    return next => action => {
      if (connect.match(action)) {
        socket = new WebSocket(action.payload);
        url = action.payload;
        isConnected = true;
        onConnecting && dispatch(onConnecting());

        socket.onopen = () => {
          onOpen && dispatch(onOpen());
        };

        socket.onerror = () => {
          dispatch(onError('Unknown error'));
        };

        socket.onclose = () => {
          onClose && dispatch(onClose());

          if (isConnected) {
            reconnectId = setTimeout(() => {
              dispatch(connect(url));
            }, 3000);
          }
        };

        socket.onmessage = event => {
          const { data } = event;
          try {
            console.log('url', url);
            const parsedData = JSON.parse(data);

            if (withTokenRefresh && parsedData.message === 'Invalid or missing token') {
              fetchRefreshToken();

              dispatch(disconnect());
              return;
            }

            dispatch(onMessage(parsedData));
          } catch (error) {
            dispatch(onError((error as Error).message));
          }
        };

        return;
      }

      if (sendMessage?.match(action) && socket) {
        try {
          socket.send(JSON.stringify(action.payload));
        } catch (error) {
          dispatch(onError((error as Error).message));
        }

        return;
      }

      if (disconnect.match(action)) {
        if (reconnectId) {
          clearTimeout(reconnectId);
          reconnectId = null;
        }
        isConnected = false;
        socket?.close();
        socket = null;

        return;
      }

      next(action);
    };
  };
};
