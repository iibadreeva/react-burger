import React, { FC } from 'react';
import cn from 'classnames';
import { Button } from '@ya.praktikum/react-developer-burger-ui-components';
import { useLocation, useNavigate } from 'react-router';

import { ROUTES } from '../../constants';

import styles from './some-error.module.css';

type Props = {
  match: {
    path: string;
  };
};

const SomeError: FC<Props> = () => {
  const { pathname } = useLocation();
  const navigate = useNavigate();

  const text =
    pathname === '/error'
      ? `Упс! Что-то пошло не так :(`
      : 'Упс! Страница не найдена :(';

  const handleHome = () => {
    navigate(ROUTES.ROOT);
  };

  return (
    <div className={styles.wrap}>
      <div className={styles.sketch}>
        <div className={cn(styles.beeSketch, styles.red)} />
        <div className={cn(styles.beeSketch, styles.blue)} />
      </div>
      <div className={styles.info}>
        <div className={styles.title}>{text}</div>
        <Button
          onClick={handleHome}
          htmlType="submit"
          type="primary"
          size="large"
        >
          На главную?
        </Button>
      </div>
    </div>
  );
};

export default SomeError;
