import {
  createBrowserRouter,
  createRoutesFromElements,
  Route,
  Navigate,
  Outlet,
} from 'react-router-dom';
import SearchPage from './components/SearchPage';
import Details from './components/Details';
import Page404 from './components/Page404';

export const router = createBrowserRouter(
  createRoutesFromElements(
    <>
      <Route
        path="/"
        element={
          <>
            <Navigate to="cards/1" />
            <Outlet />
          </>
        }
      >
        <Route element={<SearchPage />} path="/cards/:page">
          <Route path="details/:detailId" element={<Details />} />
        </Route>
      </Route>
      <Route path="*" element={<Page404 />} />
    </>
  )
);
