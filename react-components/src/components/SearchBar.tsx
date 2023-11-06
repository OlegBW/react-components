import { useState, useEffect } from 'react';
import { ChangeEvent, MouseEvent } from 'react';
import '../styles/search-bar.css';
import { useSearchParams, useNavigation } from 'react-router-dom';

const initialValue = {
  query: '',
  hasError: false,
  isPending: false,
};

export default function SearchBar() {
  const [state, setState] = useState(initialValue);
  const [, setSearchParams] = useSearchParams();
  const navigation = useNavigation();

  // Зчитуємо збережені дані і оновлюємо сторінку
  useEffect(() => {
    let query = localStorage.getItem('query');
    if (query === null) query = '';

    setState({
      ...state,
      query,
    });

    setSearchParams({ q: query });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // Оновлюю стан компонента в залежності від вводу
  function handleChange(e: ChangeEvent) {
    const target = e.target;
    if (target && target instanceof HTMLInputElement) {
      setState({
        ...state,
        query: target.value,
      });
    }
  }

  // Ініціюю пошук, оновлюю локальне сховище
  async function handleSearch(term: string) {
    const query = term.toLowerCase();

    setSearchParams({ q: query });

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
