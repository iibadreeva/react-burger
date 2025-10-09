import { FormEvent, MouseEvent, useEffect } from 'react';
import {
  Button,
  EmailInput,
  Input,
  PasswordInput,
} from '@ya.praktikum/react-developer-burger-ui-components';
import { Link, useNavigate } from 'react-router-dom';

import Loading from '../../components/loading/loading';
import { ROUTES } from '../../constants';
import { useForm } from '../../hooks/use-form';
import { fetchRegister } from '../../services/actions/user';
import { resetLoad } from '../../services/reducers/user';
import { useAppDispatch, useAppSelector } from '../../services/store';
import { RegisterType } from '../../services/types/types';
import styles from './register.module.css';

const Register = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const { isLoading, error, isAuth, isLoginRequest } = useAppSelector(state => state.user);

  const { values, handleChange } = useForm<RegisterType>({
    name: '',
    email: '',
    password: '',
  });

  const handleSubmit = async (event: FormEvent) => {
    event.preventDefault();

    dispatch(fetchRegister(values));
  };

  useEffect(() => {
    if (isAuth) {
      navigate(ROUTES.ROOT);
    }
  }, [isAuth, navigate]);

  useEffect(() => {
    return () => {
      dispatch(resetLoad());
    };
  }, [dispatch]);

  if (isLoading && !isLoginRequest) {
    return <Loading />;
  }

  return (
    <form className={styles.form} onSubmit={handleSubmit}>
      {isLoading && <Loading />}

      <h3 className="text text_type_main-medium mb-6">Регистрация</h3>
      {error && <h4 className="text text_type_main-medium mb-6">{error}</h4>}

      <Input
        extraClass="mb-6"
        type="text"
        placeholder="Имя"
        onChange={handleChange}
        value={values.name}
        name="name"
        error={false}
        errorText={'Ошибка'}
        onPointerEnterCapture={(e: MouseEvent<HTMLInputElement>) => console.log(e)}
        onPointerLeaveCapture={(e: MouseEvent<HTMLInputElement>) => console.log(e)}
      />

      <EmailInput extraClass="mb-6" onChange={handleChange} value={values.email} name="email" />

      <PasswordInput
        extraClass="mb-6"
        onChange={handleChange}
        value={values.password}
        name="password"
      />

      <Button extraClass="mb-20" htmlType="submit" type="primary" size="large">
        Зарегистрироваться
      </Button>

      <footer>
        <p className="text text_type_main-default text_color_inactive mb-4">
          Уже зарегистрированы?{' '}
          <Link className={styles.link} to={ROUTES.LOGIN}>
            Войти
          </Link>
        </p>
      </footer>
    </form>
  );
};

export default Register;
