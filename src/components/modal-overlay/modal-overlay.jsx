import React from 'react';
import PropTypes from 'prop-types';

import { useEscKey } from '../../hooks/use-esc-key';

import styles from './modal-overlay.module.css';

const ModalOverlay = ({ onClose }) => {
  useEscKey(onClose);

  return <div className={styles.modal} onClick={onClose} />;
};

ModalOverlay.propTypes = {
  onClose: PropTypes.func.isRequired
};

export default ModalOverlay;
