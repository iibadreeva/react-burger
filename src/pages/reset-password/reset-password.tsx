import { FormEvent, useEffect } from 'react';
import { Button, Input, PasswordInput } from '@ya.praktikum/react-developer-burger-ui-components';
import { Link, useLocation, useNavigate } from 'react-router-dom';

import Loading from '../../components/loading/loading';
import { ROUTES } from '../../constants';
import { useForm } from '../../hooks/use-form';
import { fetchResetPassword } from '../../services/actions/user';
import { reset } from '../../services/reducers/user';
import { useAppDispatch, useAppSelector } from '../../services/store';
import { ResetPasswordType } from '../../services/types/types';
import styles from './reset-password.module.css';

const ResetPassword = () => {
  const isAuth = false;
  const location = useLocation();
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const resetUser = location.state && location.state.resetUser;

  const { isLoading, error, isLoginRequest } = useAppSelector(state => state.user);

  const { values, handleChange } = useForm<ResetPasswordType>({
    password: '',
    token: '',
  });

  const handleSubmit = async (event: FormEvent) => {
    event.preventDefault();

    dispatch(fetchResetPassword(values));
  };

  useEffect(() => {
    if (!isAuth && !resetUser) {
      navigate(ROUTES.ROOT, { replace: true });
    }

    if (isLoginRequest) {
      dispatch(reset());

      navigate(ROUTES.LOGIN, {
        state: {
          resetUser: null,
        },
      });
    }

    if (isAuth) {
      navigate(ROUTES.PROFILE);
    }
  }, [isAuth, navigate, resetUser, isLoginRequest, dispatch]);

  return (
    <form className={styles.form} onSubmit={handleSubmit}>
      {isLoading && <Loading />}

      <h3 className="text text_type_main-medium mb-6">Восстановление пароля</h3>
      {error && <h4 className="text text_type_main-medium mb-6">{error}</h4>}

      <PasswordInput
        placeholder="Введите новый пароль"
        extraClass="mb-6"
        onChange={handleChange}
        value={values.password}
        name="password"
      />

      <Input
        extraClass="mb-6"
        type="text"
        placeholder="Введите код из письма"
        onChange={handleChange}
        value={values.token}
        name="token"
        error={false}
        errorText={'Ошибка'}
        onPointerEnterCapture={undefined}
        onPointerLeaveCapture={undefined}
      />

      <Button extraClass="mb-20" htmlType="submit" type="primary" size="large">
        Сохранить
      </Button>

      <footer>
        <p className="text text_type_main-default text_color_inactive mb-4">
          Вспомнили пароль?{' '}
          <Link className={styles.link} to={ROUTES.LOGIN}>
            Войти
          </Link>
        </p>
      </footer>
    </form>
  );
};

export default ResetPassword;
