import { CardsPage } from '../api/api';
import CardsList from './CardsList';
import SearchBar from './SearchBar';
import Pagination from './Pagination';
import PageSize from './PageSize';
import {
  useLoaderData,
  Outlet,
  useNavigate,
  useSearchParams,
} from 'react-router-dom';
import '../styles/search-page.css';
import { PageContext } from '../contexts';

export default function SearchPage() {
  const cards = useLoaderData() as CardsPage;
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
        <PageContext.Provider
          value={{
            page: cards,
            query: params.get('search') ?? '',
          }}
        >
          <CardsList />
          <Pagination />
        </PageContext.Provider>
      </div>
      <Outlet></Outlet>
    </div>
  );
}
