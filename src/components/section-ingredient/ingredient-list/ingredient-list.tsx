import { FC } from 'react';
import { Counter, CurrencyIcon } from '@ya.praktikum/react-developer-burger-ui-components';
import cn from 'classnames';
import { useDrag } from 'react-dnd';

import { useAppSelector } from '../../../services/store';
import { IngredientType } from '../../../services/types/types';
import styles from '../section-ingredient.module.css';

type Props = {
  item: IngredientType;
  handleChoseBurger: (item: IngredientType) => void;
};

const IngredientList: FC<Props> = ({ item, handleChoseBurger }) => {
  const { ingredients, bun } = useAppSelector(state => state.order);

  const { _id, name, price, image } = item;

  const [{ opacity }, ref] = useDrag({
    type: 'ingredient',
    item: item,
    collect: monitor => ({
      opacity: monitor.isDragging() ? 0.3 : 1,
    }),
  });

  const count = ingredients.reduce(
    (acc, current) => {
      if (current.id === _id) {
        acc++;
      }

      return acc;
    },
    bun === _id ? 1 : 0
  );

  return (
    <li
      className={cn(styles.list)}
      onClick={() => handleChoseBurger(item)}
      style={{ opacity }}
      ref={ref as any}
      data-testid={_id}
    >
      {count > 0 && <Counter count={count} size="default" />}

      <img className={cn('mr-4 mb-1 ml-4', styles.image)} src={image} alt={name} />

      <div className={cn('mb-1', styles.priceBox)}>
        <span className={cn('text text_type_main-medium mr-2', styles.price)}>{price}</span>
        <CurrencyIcon type="primary" />
      </div>

      <div className="text text_type_main-default">{name}</div>
    </li>
  );
};

export default IngredientList;
