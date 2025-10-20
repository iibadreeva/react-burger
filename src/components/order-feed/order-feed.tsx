import { FC } from 'react';

import { OrderType } from '../../services/types/types';
import OrderFeedItem from './order-feed-item/order-feed-item';
import styles from './order-feed.module.css';

type Props = {
  data: OrderType[];
  handleChoseFeed: (item: OrderType) => void;
};

const OrderFeed: FC<Props> = ({ handleChoseFeed, data }) => {
  return (
    <ul className={styles.wrap} data-testid="feed-lists">
      {data.map(item => (
        <OrderFeedItem key={item._id} data={item} handleChoseFeed={handleChoseFeed} />
      ))}
    </ul>
  );
};

export default OrderFeed;
