import { FormEvent, useEffect } from 'react';
import { Button, EmailInput } from '@ya.praktikum/react-developer-burger-ui-components';
import { Link, useNavigate } from 'react-router-dom';

import Loading from '../../components/loading/loading';
import { ROUTES } from '../../constants';
import { useForm } from '../../hooks/use-form';
import { fetchForgotPassword } from '../../services/actions/user';
import { useAppDispatch, useAppSelector } from '../../services/store';
import styles from './forgot-password.module.css';

type ForgotPasswordFormProps = {
  email: string;
};

const ForgotPassword = () => {
  const { resetEmail, isLoading, error, isLoginRequest, isAuth } = useAppSelector(
    state => state.user
  );

  const dispatch = useAppDispatch();
  const { values, handleChange } = useForm<ForgotPasswordFormProps>({
    email: '',
  });

  const navigate = useNavigate();

  const handleSubmit = async (event: FormEvent) => {
    event.preventDefault();
    const { email } = values;

    dispatch(fetchForgotPassword(email));
  };

  if (!isAuth && resetEmail) {
    navigate(ROUTES.RESET_PASSWORD, {
      state: {
        resetUser: resetEmail,
      },
    });
  }

  useEffect(() => {
    if (isAuth) {
      navigate(ROUTES.ROOT);
    }
  }, [isAuth, navigate]);

  if (isLoading && isLoginRequest) {
    return <Loading />;
  }

  return (
    <form className={styles.form} onSubmit={handleSubmit}>
      {isLoading && <Loading />}

      <h3 className="text text_type_main-medium mb-6">Восстановление пароля</h3>
      {error && <h4 className="text text_type_main-medium mb-6">{error}</h4>}

      <EmailInput
        extraClass="mb-6"
        placeholder="Укажите e-mail"
        onChange={handleChange}
        value={values.email}
        name="email"
      />
      <Button extraClass="mb-20" htmlType="submit" type="primary" size="large">
        Восстановить
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

export default ForgotPassword;
