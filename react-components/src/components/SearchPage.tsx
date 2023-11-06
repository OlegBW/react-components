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
        <PageSize></PageSize>
        <CardsList pokemonData={cards.data} />
        <Pagination
          currentPage={cards.page}
          lastPage={Math.ceil(cards.totalCount / cards.pageSize)}
        />
      </div>
      <Outlet></Outlet>
    </div>
  );
}
