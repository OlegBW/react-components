/**
 * @jest-environment jsdom
 */

import { render, waitFor, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
// import { CardsPage } from '../api/api';
import { RouterProvider } from 'react-router-dom';
import { router } from '../router';

it('The 404 page is displayed when navigating to an invalid route', () => {
  render(
    <>
      <RouterProvider router={router} />
    </>
  );
  router.state.location.pathname = '/unknown';
  waitFor(() => {
    expect(screen.queryByText('404 - Page Not Found')).toBeTruthy();
  });
});
