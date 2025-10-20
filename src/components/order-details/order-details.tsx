import { FC } from 'react';
import cn from 'classnames';

import img from '../../images/done.svg';
import Modal from '../modal/modal';
import styles from './order-details.module.css';

type Props = {
  number: number;
  onClose: () => void;
};

const OrderDetails: FC<Props> = ({ onClose, number }) => {
  return (
    <Modal onClose={onClose}>
      <div className={cn('pt-30 pr-25 pb-30 pl-25', styles.modal)} data-testid="order-modal">
        <p className={cn('text text_type_digits-large mb-8', styles.number)}>{number}</p>
        <p className="text text_type_main-medium mb-15 text-center">идентификатор заказа</p>
        <img src={img} className={cn('mb-15 text-center', styles.image)} alt="Заказ принят" />
        <p className="text text_type_main-default mb-2 text-center">Ваш заказ начали готовить</p>
        <p className="text text_type_main-default text_color_inactive text-center">
          Дождитесь готовности на орбитальной станции
        </p>
      </div>
    </Modal>
  );
};

export default OrderDetails;
