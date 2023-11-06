import { MouseEvent } from 'react';
import { useSearchParams } from 'react-router-dom';
import '../styles/page-size.css';

export default function PageSize() {
  const [params, setParams] = useSearchParams();

  function handleClick(e: MouseEvent) {
    const btn = e.target as HTMLButtonElement;
    if (!btn.textContent) return;
    const prev = Object.fromEntries(params);
    setParams({ ...prev, size: btn.textContent });
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
