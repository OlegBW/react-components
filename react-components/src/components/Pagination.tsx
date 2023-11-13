import { useContext } from 'react';
import '../styles/pagination.css';
import { NavLink, useSearchParams } from 'react-router-dom';
import { PageContext } from '../contexts';

export default function Pagination() {
  const pageData = useContext(PageContext).page;
  const currentPage = pageData.page;
  const lastPage = Math.ceil(pageData.totalCount / pageData.pageSize);
  const [params] = useSearchParams();

  return (
    <div className="pagination">
      <button className="pagination__btn" id="first-page">
        <NavLink
          id="first-page-link"
          to={{ pathname: '../1', search: params.toString() }}
          relative="path"
        >
          First
        </NavLink>
      </button>
      <button className="pagination__btn" id="prev-page">
        <NavLink
          id="prev-page-link"
          to={{ pathname: `../${currentPage - 1}`, search: params.toString() }}
          relative="path"
        >
          Prev
        </NavLink>
      </button>
      <button className="pagination__btn" id="current-page">
        {currentPage}
      </button>
      <button className="pagination__btn" id="next-page">
        <NavLink
          id="next-page-link"
          to={{ pathname: `../${currentPage + 1}`, search: params.toString() }}
          relative="path"
        >
          Next
        </NavLink>
      </button>
      <button className="pagination__btn" id="last-page">
        <NavLink
          id="last-page-link"
          to={{ pathname: `../${lastPage}`, search: params.toString() }}
          relative="path"
        >
          Last
        </NavLink>
      </button>
    </div>
  );
}
