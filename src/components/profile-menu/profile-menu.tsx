import cn from 'classnames';
import { Link } from 'react-router-dom';

import { ROUTES } from '../../constants';
import { fetchLogout } from '../../services/slices/user';
import { useAppDispatch } from '../../services/store';
import styles from './profile-menu.module.css';

const ProfileMenu = () => {
  const dispatch = useAppDispatch();

  const handleLogout = () => {
    dispatch(fetchLogout());
  };

  return (
    <aside className={cn('mr-15', styles.aside)}>
      <nav className={cn('mb-20', styles.nav)}>
        <li className={cn('text text_type_main-medium', styles.list)}>Профиль</li>
        <li>
          <Link
            to={ROUTES.PROFILE_ORDERS}
            className={cn('text text_type_main-medium', styles.list, styles.link)}
          >
            История заказов
          </Link>
        </li>
        <li
          className={cn('text text_type_main-medium', styles.list, styles.link)}
          onClick={handleLogout}
        >
          Выход
        </li>
      </nav>

      <p className="text text_type_main-default text_color_inactive">
        В этом разделе вы можете изменить свои персональные данные
      </p>
    </aside>
  );
};

export default ProfileMenu;
