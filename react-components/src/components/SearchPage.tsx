import CardsList from './CardsList';
import SearchBar from './SearchBar';
import Pagination from './Pagination';
import PageSize from './PageSize';
import {
  Outlet,
  useNavigate,
  useSearchParams,
  useParams,
} from 'react-router-dom';
import '../styles/search-page.css';
import { PageContext } from '../contexts';

import { useGetCardsQuery } from '../api/api';
import { useSelector, useDispatch } from 'react-redux';
import { RootState } from '../store';
import { set } from '../features/isLoading/isLoadingSlice';

export default function SearchPage() {
  const dispatch = useDispatch();
  const query = useSelector((state: RootState) => state.query.value);
  const pageSize = useSelector((state: RootState) => state.pageSize.value);
  const { page } = useParams();
  const { data, error, isLoading } = useGetCardsQuery({
    q: `name:${query}*`,
    pageSize,
    page: Number(page),
  });
  dispatch(set(isLoading));
  const navigate = useNavigate();
  const [params] = useSearchParams();

  function handleNavigate() {
    const url = window.location;
    if (!url.href.includes('details')) return;
    navigate(`../../?${params.toString()}`, { relative: 'path' });
  }

  return (
    <div className="search-wrapper" onClick={() => handleNavigate()}>
      <div className="search-page">
        <SearchBar />
        <PageSize />
        {error ? (
          <div>Error</div>
        ) : isLoading ? (
          <div>Loading</div>
        ) : data ? (
          <>
            <PageContext.Provider
              value={{
                page: data,
                query: params.get('search') ?? '',
              }}
            >
              <CardsList />
              <Pagination />
            </PageContext.Provider>
            <Outlet></Outlet>
          </>
        ) : null}
      </div>
    </div>
  );
}
