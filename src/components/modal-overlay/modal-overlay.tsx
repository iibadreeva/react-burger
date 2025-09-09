import { FC } from 'react';

import { useEscKey } from '../../hooks/use-esc-key';

import styles from './modal-overlay.module.css';

type Props = {
  onClose: () => void;
};

const ModalOverlay: FC<Props> = ({ onClose }) => {
  useEscKey(onClose);

  return <div className={styles.modal} onClick={onClose} />;
};

export default ModalOverlay;
