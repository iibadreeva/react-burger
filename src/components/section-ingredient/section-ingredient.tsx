import { FC } from 'react';
import cn from 'classnames';

import IngredientList from './ingredient-list/ingredient-list';

import { IngredientType } from '../../utils/types';

import styles from './section-ingredient.module.css';

type Props = {
  data: any;
  title: string;
  currentTab: any;
  tabRefs: any;
  handleChoseBurger: (item: IngredientType) => void;
};

const SectionIngredient: FC<Props> = ({
  data,
  title,
  currentTab,
  tabRefs,
  handleChoseBurger
}) => {
  return (
    <>
      <h3
        className="text text_type_main-medium mb-6"
        ref={tabRefs.current[currentTab]}
      >
        {title}
      </h3>

      <ul className={cn('pt-6 pl-4 pr-4 pb-10', styles.content)}>
        {data[currentTab].map((item: IngredientType) => (
          <IngredientList
            key={item._id}
            item={item}
            handleChoseBurger={handleChoseBurger}
          />
        ))}
      </ul>
    </>
  );
};

export default SectionIngredient;
