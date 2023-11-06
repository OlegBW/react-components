import '../styles/pagination.css';
import { NavLink, useSearchParams } from 'react-router-dom';

type Props = {
  currentPage: number;
  lastPage: number;
};

export default function Pagination({ currentPage, lastPage }: Props) {
  const [params] = useSearchParams();

  return (
    <div className="pagination">
      <button className="pagination__btn">
        <NavLink to={`../1?${params.toString()}`} relative="path">
          First
        </NavLink>
      </button>
      <button className="pagination__btn">
        <NavLink
          to={`../${currentPage - 1}?${params.toString()}`}
          relative="path"
        >
          Prev
        </NavLink>
      </button>
      <button className="pagination__btn">{currentPage}</button>
      <button className="pagination__btn">
        <NavLink
          to={`../${currentPage + 1}?${params.toString()}`}
          relative="path"
        >
          Next
        </NavLink>
      </button>
      <button className="pagination__btn">
        <NavLink to={`../${lastPage}?${params.toString()}`} relative="path">
          Last
        </NavLink>
      </button>
    </div>
  );
}
