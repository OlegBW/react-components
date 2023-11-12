import { useContext } from 'react';
import '../styles/pagination.css';
import { NavLink, useSearchParams } from 'react-router-dom';
import { PageContext } from '../contexts';

export default function Pagination() {
  const pageData = useContext(PageContext);
  const currentPage = pageData.page;
  const lastPage = Math.ceil(pageData.totalCount / pageData.pageSize);
  const [params] = useSearchParams();

  return (
    <div className="pagination">
      <button className="pagination__btn">
        <NavLink
          to={{ pathname: '../1', search: params.toString() }}
          relative="path"
        >
          First
        </NavLink>
      </button>
      <button className="pagination__btn">
        <NavLink
          to={{ pathname: `../${currentPage - 1}`, search: params.toString() }}
          relative="path"
        >
          Prev
        </NavLink>
      </button>
      <button className="pagination__btn">{currentPage}</button>
      <button className="pagination__btn">
        <NavLink
          to={{ pathname: `../${currentPage + 1}`, search: params.toString() }}
          relative="path"
        >
          Next
        </NavLink>
      </button>
      <button className="pagination__btn">
        <NavLink
          to={{ pathname: `../${lastPage}`, search: params.toString() }}
          relative="path"
        >
          Last
        </NavLink>
      </button>
    </div>
  );
}
