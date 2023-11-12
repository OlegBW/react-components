/**
 * @jest-environment jsdom
 */

import { render /*, screen*/ } from '@testing-library/react';
import Card from '../components/Card';
import { PageContext } from '../contexts';
import '@testing-library/jest-dom';
// import { CardsPage } from '../api/api';
import { MemoryRouter } from 'react-router-dom';
import { mockCardsPage } from './mocks/CardsPage';

it('Card component renders the relevant card data', () => {
  const { container } = render(
    <MemoryRouter initialEntries={['/cards/1']}>
      <PageContext.Provider value={mockCardsPage}>
        <Card title="Charmander" id="2" img="charmander_small_image_url" />
      </PageContext.Provider>
    </MemoryRouter>
  );

  const title = container.querySelector('.pokemon-card__title')?.textContent;
  const img = container
    .querySelector('.pokemon-card__img')
    ?.getAttribute('src');

  expect(
    title === 'Charmander' && img === 'charmander_small_image_url'
  ).toBeTruthy();
});
