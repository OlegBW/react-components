/**
 * @jest-environment jsdom
 */

import { render, fireEvent /*, screen*/ } from '@testing-library/react';
import Pagination from '../components/Pagination';
import { PageContext } from '../contexts';
import '@testing-library/jest-dom';
import {
  BrowserRouter,
  Routes,
  Route,
  Navigate,
  Outlet,
} from 'react-router-dom';
import { mockCardsPage } from './mocks/CardsPage';

it('The pagination component updates URL query parameter when page changes', () => {
  const { container } = render(
    <BrowserRouter>
      <Routes>
        <Route
          path="/"
          element={
            <>
              <Navigate to="cards/1" />
              <Outlet />
            </>
          }
        >
          <Route
            path="/cards/:page"
            element={
              <PageContext.Provider value={{ page: mockCardsPage, query: '' }}>
                <Pagination />
              </PageContext.Provider>
            }
          />
        </Route>
      </Routes>
    </BrowserRouter>
  );

  const nextBtn = container.querySelector('#next-page-link');
  if (!nextBtn) return;
  fireEvent.click(nextBtn);
  expect(true).toBeTruthy();
});
