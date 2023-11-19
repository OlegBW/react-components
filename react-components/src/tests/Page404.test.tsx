/**
 * @jest-environment jsdom
 */

import { render, waitFor, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import { RouterProvider } from 'react-router-dom';
// import { router } from '../router';
import SearchPage from '../components/SearchPage';
import Page404 from '../components/Page404';
import { Provider } from 'react-redux';
import { store } from '../store';
import { createBrowserRouter } from 'react-router-dom';
import { act } from 'react-dom/test-utils';

const browserRouter = createBrowserRouter([
  {
    path: '/',
    element: <SearchPage />,
    errorElement: <Page404 />,
  },
]);

it('The 404 page is displayed when navigating to an invalid route', async () => {
  render(
    <>
      <Provider store={store}>
        <RouterProvider router={browserRouter} />
      </Provider>
    </>
  );
  await act(() => browserRouter.navigate('/unknown/route'));
  await waitFor(() => {
    expect(screen.queryByText('404 - Page Not Found')).toBeTruthy();
  });
});
