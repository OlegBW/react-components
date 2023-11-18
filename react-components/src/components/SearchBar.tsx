import { useState, useEffect } from 'react';
import { ChangeEvent, MouseEvent } from 'react';
import '../styles/search-bar.css';
import { useNavigate, useNavigation, useSearchParams } from 'react-router-dom';
// import { useSelector } from 'react-redux';
import { useDispatch } from 'react-redux';
import { set } from '../features/query/querySlice';

const initialValue = {
  query: '',
  hasError: false,
  isPending: false,
};

export default function SearchBar() {
  const [state, setState] = useState(initialValue);
  const navigate = useNavigate();
  const navigation = useNavigation();
  const [params] = useSearchParams();
  const dispatch = useDispatch();

  useEffect(() => {
    let query = localStorage.getItem('query');
    if (query === null) query = '';

    setState({
      ...state,
      query,
    });

    params.set('q', query);
    dispatch(set(query));

    navigate(`/cards/1?${params.toString()}`, { relative: 'path' });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  function handleChange(e: ChangeEvent) {
    const target = e.target;
    if (target && target instanceof HTMLInputElement) {
      setState({
        ...state,
        query: target.value,
      });
    }
  }

  async function handleSearch(term: string) {
    const query = term.toLowerCase();
    params.set('q', query);
    dispatch(set(query));

    navigate(`../1?${params.toString()}`, { relative: 'path' });

    localStorage.setItem('query', query);
  }

  function handleFallback(e: MouseEvent) {
    setState({
      ...state,
      hasError: true,
    });
    e.preventDefault();
  }

  if (state.hasError) throw new Error('Fallback');

  return (
    <div className="search-bar">
      <input
        className="search-bar__input"
        onChange={(e) => handleChange(e)}
        type="text"
        value={state.query}
      />
      <button
        className="search-bar__button"
        onClick={() => handleSearch(state.query)}
        onContextMenu={(e) => handleFallback(e)}
      >
        Search
      </button>
      {navigation.state === 'loading' ? <div className="loader"></div> : ''}
    </div>
  );
}
