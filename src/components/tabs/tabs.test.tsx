import { render, screen } from '@testing-library/react';

import { INGREDIENT_TYPE, TabType } from '../../services/types/types';
import Tabs from './tabs';

describe('Meal', () => {
  const tabs: TabType[] = [
    {
      title: 'Булки',
      type: INGREDIENT_TYPE.Bun,
    },
    {
      title: 'Соусы',
      type: INGREDIENT_TYPE.Sauce,
    },
  ];
  const cb = jest.fn();
  it('renders correctly without data', () => {
    render(<Tabs data={[]} current="bun" onClick={cb} />);

    expect(screen.getByTestId('tabs')).toBeInTheDocument();
    expect(screen.queryByText('Булки')).not.toBeInTheDocument();
  });

  it('should renders correctly with received data', () => {
    render(<Tabs data={tabs} current="bun" onClick={cb} />);

    expect(screen.getByText('Булки')).toBeInTheDocument();
    expect(screen.getByText('Соусы')).toBeInTheDocument();
  });
});
