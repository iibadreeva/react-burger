import { FormEvent, useEffect } from 'react';
import {
  Button,
  EmailInput,
  PasswordInput,
} from '@ya.praktikum/react-developer-burger-ui-components';
import { Link, useNavigate } from 'react-router-dom';

import Loading from '../../components/loading/loading';
import { ROUTES } from '../../constants';
import { useForm } from '../../hooks/use-form';
import { fetchLogin } from '../../services/actions/user';
import { useAppDispatch, useAppSelector } from '../../services/store';
import { LoginType } from '../../services/types/types';
import styles from './login.module.css';

const Login = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const { isLoading, error, isAuth, isLoginRequest } = useAppSelector(state => state.user);

  const { values, handleChange } = useForm<LoginType>({
    email: '',
    password: '',
  });

  const handleSubmit = async (event: FormEvent) => {
    event.preventDefault();

    dispatch(fetchLogin(values));
  };

  useEffect(() => {
    if (isAuth) {
      navigate(ROUTES.ROOT);
    }
  }, [isAuth, navigate]);

  if (isLoading && !isLoginRequest) {
    return <Loading />;
  }

  return (
    <form className={styles.form} onSubmit={handleSubmit}>
      {isLoading && <Loading />}

      <h3 className="text text_type_main-medium mb-6">Вход</h3>
      {error && <h4 className="text text_type_main-medium mb-6">{error}</h4>}

      <EmailInput extraClass="mb-6" onChange={handleChange} value={values.email} name="email" />
      <PasswordInput
        extraClass="mb-6"
        onChange={handleChange}
        value={values.password}
        name="password"
      />

      <Button extraClass="mb-20" htmlType="submit" type="primary" size="large">
        Войти
      </Button>

      <footer>
        <p className="text text_type_main-default text_color_inactive mb-4">
          Вы - новый пользователь?{' '}
          <Link className={styles.link} to={ROUTES.REGISTER}>
            Зарегистрироваться
          </Link>
        </p>
        <p className="text text_type_main-default text_color_inactive">
          Забыли пароль?{' '}
          <Link className={styles.link} to={ROUTES.FORGOT_PASSWORD}>
            Восстановить пароль
          </Link>
        </p>
      </footer>
    </form>
  );
};

export default Login;
