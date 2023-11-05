import { useState } from 'react';
import { CardsPage, PokemonCard } from '../api/api';
import CardsList from './CardsList';
import SearchBar from './SearchBar';

const initialState = {
  data: [] as PokemonCard[],
  page: 1,
  pageSize: 20,
  count: 0,
  totalCount: 0,
};

export default function SearchPage() {
  const [state, setState] = useState(initialState as CardsPage);

  return (
    <div className="search-page">
      <SearchBar setPokemonData={(state) => setState(state)} />
      <CardsList pokemonData={state.data} />
    </div>
  );
}
