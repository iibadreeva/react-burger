import React from 'react';
import { createPortal } from 'react-dom';

import { CloseIcon } from '@ya.praktikum/react-developer-burger-ui-components';

import ModalOverlay from '../modal-overlay/modal-overlay';

import styles from './modal.module.css';
import PropTypes from 'prop-types';

const Modal = ({ onClose, children }) => {
  return createPortal(
    <>
      <ModalOverlay onClose={onClose} />
      <dialog className={styles.modal}>
        <div className={`${styles.container} text-center`}>
          <CloseIcon
            aria-label="Закрыть"
            className={styles.close}
            type="primary"
            onClick={onClose}
          />
          {children}
        </div>
      </dialog>
    </>,
    document.getElementById('modal')
  );
};

Modal.propTypes = {
  onClose: PropTypes.func.isRequired,
  children: PropTypes.element.isRequired
};

export default Modal;
