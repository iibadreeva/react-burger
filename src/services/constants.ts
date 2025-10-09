import { socketMiddleware } from './middlewares/socket-middleware';
import {
  ordersAllConnect,
  ordersAllDisconnect,
  ordersAllOnClose,
  ordersAllOnConnecting,
  ordersAllOnError,
  ordersAllOnMessage,
  ordersAllOnOpen,
} from './reducers/orders-all/actions';
import {
  ordersConnect,
  ordersDisconnect,
  ordersOnClose,
  ordersOnConnecting,
  ordersOnError,
  ordersOnMessage,
  ordersOnOpen,
} from './reducers/orders/actions';

export const ordersAllMiddleware = socketMiddleware({
  connect: ordersAllConnect,
  disconnect: ordersAllDisconnect,
  onConnecting: ordersAllOnConnecting,
  onOpen: ordersAllOnOpen,
  onClose: ordersAllOnClose,
  onError: ordersAllOnError,
  onMessage: ordersAllOnMessage,
}) as any;

export const ordersMiddleware = socketMiddleware(
  {
    connect: ordersConnect,
    disconnect: ordersDisconnect,
    onConnecting: ordersOnConnecting,
    onOpen: ordersOnOpen,
    onClose: ordersOnClose,
    onError: ordersOnError,
    onMessage: ordersOnMessage,
  },
  true
) as any;
