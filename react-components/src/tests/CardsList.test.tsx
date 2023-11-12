/**
 * @jest-environment jsdom
 */

import { render /*, screen*/ } from '@testing-library/react';
import CardsList from '../components/CardsList';
import { PageContext } from '../contexts';
import '@testing-library/jest-dom';
// import { CardsPage } from '../api/api';
import { MemoryRouter } from 'react-router-dom';
import { mockCardsPage } from './mocks/CardsPage';

it('Cards list renders the specified number of cards', () => {
  const { container } = render(
    <MemoryRouter initialEntries={['/cards/1']}>
      <PageContext.Provider value={mockCardsPage}>
        <CardsList />
      </PageContext.Provider>
    </MemoryRouter>
  );
  const cardsCount = container.querySelectorAll('.pokemon-card').length;
  expect(cardsCount).toBe(4);
});
