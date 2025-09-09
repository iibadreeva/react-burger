import { FormEvent, MouseEvent, useEffect, useRef, useState } from 'react';
import {
  Button,
  EmailInput,
  Input,
  PasswordInput,
} from '@ya.praktikum/react-developer-burger-ui-components';
import { useNavigate } from 'react-router-dom';

import Loading from '../../components/loading/loading';
import ProfileMenu from '../../components/profile-menu/profile-menu';
import { useForm } from '../../hooks/use-form';
import { fetchUpdateUser, resetLoad } from '../../services/slices/user';
import { useAppDispatch, useAppSelector } from '../../services/store';
import { RegisterType } from '../../utils/types';
import styles from './profile.module.css';

const Profile = () => {
  const dispatch = useAppDispatch();

  const { isLoading, error, user } = useAppSelector(state => state.user);

  const { values, handleChange, setValues } = useForm<RegisterType>({
    name: user?.name || '',
    email: user?.email || '',
    password: '',
  });

  const [isDisableName, setDisableName] = useState<boolean>(true);
  const inputNameRef = useRef<HTMLInputElement>(null);

  const handleSubmit = async (event: FormEvent) => {
    event.preventDefault();

    dispatch(fetchUpdateUser(values));
  };

  const handleReset = () => {
    setValues({
      email: user?.email || '',
      name: user?.name || '',
      password: '',
    });
  };

  const handleDisableName = (event: FormEvent) => {
    setDisableName(false);

    const timer: ReturnType<typeof setTimeout> = setTimeout(() => {
      if (inputNameRef.current !== null) {
        inputNameRef.current.focus();
      }

      clearTimeout(timer);
    });
  };

  useEffect(() => {
    return () => {
      dispatch(resetLoad());
    };
  }, [dispatch]);

  return (
    <section className={styles.wrap}>
      {isLoading && <Loading />}

      <ProfileMenu />

      <form className={styles.form} onSubmit={handleSubmit}>
        {error && <h4 className="text text_type_main-medium mb-6">{error}</h4>}
        <Input
          ref={inputNameRef}
          extraClass="mb-6"
          type="text"
          placeholder="Имя"
          onChange={handleChange}
          onBlur={() => setDisableName(true)}
          icon="EditIcon"
          value={values.name}
          name="name"
          onPointerEnterCapture={(e: MouseEvent<HTMLInputElement>) => console.log(e)}
          onPointerLeaveCapture={(e: MouseEvent<HTMLInputElement>) => console.log(e)}
          disabled={isDisableName}
          onIconClick={handleDisableName}
        />

        <EmailInput
          placeholder="Логин"
          extraClass="mb-6"
          onChange={handleChange}
          value={values.email}
          name="email"
          isIcon
        />

        <PasswordInput
          icon="EditIcon"
          extraClass="mb-6"
          onChange={handleChange}
          value={values.password}
          name="password"
        />

        <Button
          extraClass="mb-20 mr-30 ml-5"
          htmlType="button"
          onClick={handleReset}
          type="primary"
          size="large"
        >
          Отмена
        </Button>

        <Button extraClass="mb-20 " htmlType="submit" type="primary" size="large">
          сохранить
        </Button>
      </form>
    </section>
  );
};

export default Profile;
