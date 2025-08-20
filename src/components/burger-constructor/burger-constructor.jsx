import React, { useState, memo, useMemo } from 'react';
import cn from 'classnames';
import {
  Button,
  ConstructorElement,
  CurrencyIcon,
  DragIcon
} from '@ya.praktikum/react-developer-burger-ui-components';
import { useDrop } from 'react-dnd';
import { v4 as uuid } from 'uuid';

import OrderDetails from '../order-details/order-details';
import IngredientList from './ingredient-list/ingredient-list';

import {
  sendOrder,
  addBun,
  addIngredient,
  reset
} from '../../services/slices/order';

import styles from './burger-constructor.module.css';
import { useAppDispatch, useAppSelector } from '../../services/store';

const BurgerConstructor = () => {
  const dispatch = useAppDispatch();

  const data = useAppSelector((state) => state.ingredients.data);
  const { order, bun, ingredients, isLoading, error } = useAppSelector(
    (state) => state.order
  );
  const [isModalOpen, setIsModalOpen] = useState(!!order);

  const closeModal = () => {
    setIsModalOpen(false);
    dispatch(reset());
  };

  const handleShowModal = () => {
    setIsModalOpen(true);

    const ids = allItems.reduce((acc, { _id }) => acc.concat(_id), []);
    dispatch(sendOrder(ids));
  };

  const [_, dropTarget] = useDrop({
    accept: 'ingredient',
    drop(item) {
      if (item.type === 'bun') {
        dispatch(addBun(item._id));
      } else {
        dispatch(addIngredient({ id: item._id, uniqueId: uuid() }));
      }
    }
  });

  const bunItem = data.find((ingredient) => ingredient._id === bun);

  const { items, sum, allItems } = useMemo(() => {
    const items = ingredients.reduce((acc, current) => {
      data.forEach((ingredient) => {
        if (ingredient._id === current.id) {
          const newItem = { ...ingredient };

          newItem.uniqueId = current.uniqueId;
          acc.push(newItem);
        }
      });

      return acc;
    }, []);

    const allItems = [...items];
    if (bunItem) {
      allItems.unshift(bunItem);
    }

    const sum = allItems.reduce((acc, current) => acc + current.price, 0);

    return {
      items,
      sum,
      allItems
    };
  }, [bunItem, data, ingredients]);

  return (
    <section className={cn('pt-25', styles.main)}>
      {!error && !isLoading && isModalOpen && (
        <OrderDetails onClose={closeModal} number={order} />
      )}

      <ul
        ref={dropTarget}
        className={cn('mt-4 mb-10 custom-scroll', styles.content)}
      >
        {!bun && (
          <li className={cn('mb-2', styles.titleList)}>
            перенесите сюда булки
          </li>
        )}
        {ingredients.length === 0 && (
          <li className={cn('mb-2', styles.titleList)}>
            перенесите сюда ингредиенты
          </li>
        )}
        {bunItem && (
          <li className={styles.list}>
            <DragIcon
              className={cn('mr-2', styles.iconDrag, styles.hidden)}
              type="primary"
            />
            <ConstructorElement
              extraClass="mb-4 "
              isLocked={true}
              text={bunItem.name + ' (верх)'}
              price={bunItem.price}
              thumbnail={bunItem.image_mobile}
              type="top"
            />
          </li>
        )}
        {items.map((item, index) => (
          <IngredientList key={item.uniqueId} item={item} index={index} />
        ))}

        {bunItem && (
          <li className={styles.list}>
            <DragIcon
              className={cn('mr-2', styles.iconDrag, styles.hidden)}
              type="primary"
            />
            <ConstructorElement
              extraClass="mb-4 "
              isLocked={true}
              text={bunItem.name + ' (низ)'}
              price={bunItem.price}
              thumbnail={bunItem.image_mobile}
              type="bottom"
            />
          </li>
        )}

        {error && <li className={cn('mb-2', styles.titleList)}>{error}</li>}
      </ul>

      <footer className={styles.footer}>
        <div className="text text_type_digits-medium">{sum}</div>
        <CurrencyIcon
          className={cn('mr-10 ml-2', styles.icon)}
          type={'primary'}
        />
        <Button
          htmlType="button"
          type="primary"
          disabled={!isLoading && !bun}
          onClick={handleShowModal}
        >
          {isLoading ? 'Заказ оформляется...' : 'Оформить заказ'}
        </Button>
      </footer>
    </section>
  );
};

export default memo(BurgerConstructor);
