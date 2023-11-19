import { MouseEvent } from 'react';
import { useSearchParams, useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { set } from '../features/pageSize/pageSizeSlice';
import '../styles/page-size.css';

export default function PageSize() {
  const [params] = useSearchParams();
  const navigate = useNavigate();
  const dispatch = useDispatch();

  function handleClick(e: MouseEvent) {
    const btn = e.target as HTMLButtonElement;
    if (!btn.textContent) return;
    params.set('size', btn.textContent);
    dispatch(set(Number(btn.textContent)));
    navigate(`../1?${params.toString()}`, { relative: 'path' });
  }

  return (
    <div className="page-size__wrapper">
      <button className="page-size__btn" onClick={(e) => handleClick(e)}>
        10
      </button>
      <button className="page-size__btn" onClick={(e) => handleClick(e)}>
        20
      </button>
      <button className="page-size__btn" onClick={(e) => handleClick(e)}>
        40
      </button>
    </div>
  );
}
