import cn from 'classnames';

import Modal from '../modal/modal';

import img from '../../images/done.svg';

import styles from './order-details.module.css';
import PropTypes from 'prop-types';

const OrderDetails = ({ onClose, number }) => {
  return (
    <Modal onClose={onClose}>
      <div className={cn('pt-30 pb-30 pr-25 pl-25', styles.modal)}>
        <p className={cn('text text_type_digits-large mb-8', styles.number)}>
          {number}
        </p>
        <p className="text text_type_main-medium mb-15 text-center">
          идентификатор заказа
        </p>
        <img
          src={img}
          className={cn('mb-15 text-center', styles.image)}
          alt="Заказ принят"
        />
        <p className="text text_type_main-default mb-2 text-center">
          Ваш заказ начали готовить
        </p>
        <p className="text text_type_main-default text_color_inactive text-center">
          Дождитесь готовности на орбитальной станции
        </p>
      </div>
    </Modal>
  );
};

OrderDetails.propTypes = {
  onClose: PropTypes.func.isRequired,
  number: PropTypes.string.isRequired
};

export default OrderDetails;
