import React from 'react';
import ReactDOM from 'react-dom/client';
import {
  createBrowserRouter,
  RouterProvider,
  createRoutesFromElements,
  Route,
  Navigate,
  Outlet,
} from 'react-router-dom';

import SearchPage from './components/SearchPage';
import Details from './components/Details';
import { getCard, getCards, RequestQuery } from './api/api';
import ErrorBoundary from './components/ErrorBoundary';

import './index.css';

const router = createBrowserRouter(
  createRoutesFromElements(
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
        element={<SearchPage />}
        path="/cards/:page"
        loader={async ({ params, request }) => {
          const { page } = params;
          const url = new URL(request.url);
          const searchTerm = url.searchParams.get('q');
          const size = url.searchParams.get('size');

          const reqObj: RequestQuery = { page: Number(page) };
          if (searchTerm) {
            reqObj['q'] = `name:${searchTerm}*`;
          }

          if (size) {
            reqObj['pageSize'] = Number(size);
          }

          const cards = await getCards(reqObj);
          return cards;
        }}
      >
        <Route
          path="details/:detailId"
          loader={async ({ params }) => {
            const { detailId } = params;
            if (!detailId) return;

            const card = await getCard(detailId);
            return card;
          }}
          element={<Details />}
        ></Route>
      </Route>
    </Route>
  )
);

//alert('Right click on search button generates an error to check ErrorBoundary');

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <ErrorBoundary>
      <RouterProvider router={router} />
    </ErrorBoundary>
  </React.StrictMode>
);
