import { useState, useEffect } from 'react';
import { ChangeEvent, MouseEvent } from 'react';
import { getCards, RequestQuery, CardsPage } from '../api/api';
import '../styles/search-bar.css';

type Props = {
  setPokemonData: (state: CardsPage) => void;
};

const initialValue = {
  query: '',
  hasError: false,
  isPending: false,
};

export default function SearchBar({ setPokemonData }: Props) {
  const [state, setState] = useState(initialValue);

  useEffect(() => {
    let query = localStorage.getItem('query');
    if (query === null) query = '';

    handleSearch(query);
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

    setState((prevState) => {
      return {
        ...prevState,
        query,
        isPending: true,
      };
    });

    const queryObj = {} as RequestQuery;

    if (query) {
      queryObj['q'] = `name:${query}*`;
    }

    try {
      const cards = await getCards(queryObj);

      setState((prevState) => {
        return {
          ...prevState,
          isPending: false,
        };
      });

      setPokemonData({
        ...cards,
      });
    } catch (err) {
      setState((prevState) => {
        return {
          ...prevState,
          isPending: false,
        };
      });
    }

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

  console.log(`render search`, state);

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
      {state.isPending ? <div className="loader"></div> : ''}
    </div>
  );
}
