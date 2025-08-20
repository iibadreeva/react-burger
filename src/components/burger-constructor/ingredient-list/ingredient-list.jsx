import React from 'react';
import cn from 'classnames';
import { useDrag, useDrop } from 'react-dnd';
import {
  ConstructorElement,
  DragIcon
} from '@ya.praktikum/react-developer-burger-ui-components';

import {
  moveIngredient,
  removeIngredient
} from '../../../services/slices/order';
import { useAppDispatch } from '../../../services/store';

import styles from '../burger-constructor.module.css';

const IngredientList = ({ item, index }) => {
  const dispatch = useAppDispatch();
  const { name, price, image_mobile, type, uniqueId } = item;
  const ref = React.useRef(null);

  const handleRemove = () => {
    dispatch(removeIngredient(uniqueId));
  };

  const [, drop] = useDrop({
    accept: 'move',
    hover(item, monitor) {
      if (!ref.current) return;
      const dragIndex = item.index;
      const hoverIndex = index;

      dispatch(moveIngredient({ dragIndex, hoverIndex }));
      item.index = hoverIndex;
    }
  });

  const [{ opacity }, drag] = useDrag({
    type: 'move',
    item: { index },
    collect: (monitor) => ({
      opacity: monitor.isDragging() ? 0.3 : 1
    })
  });

  drag(drop(ref));

  return (
    <li
      className={styles.list}
      ref={type !== 'bun' ? ref : null}
      style={{ opacity }}
    >
      <DragIcon className={cn('mr-2', styles.iconDrag)} type="primary" />

      <ConstructorElement
        extraClass="mb-4 "
        isLocked={false}
        text={name}
        price={price}
        thumbnail={image_mobile}
        handleClose={handleRemove}
      />
    </li>
  );
};

export default IngredientList;
