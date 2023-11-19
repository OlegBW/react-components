import { useContext } from 'react';
import { PokemonCard } from '../types';
import Card from './Card';
import '../styles/card-list.css';
import { PageContext } from '../contexts';

function capitalize(str: string) {
  return str.charAt(0).toUpperCase() + str.slice(1);
}

export default function CardsList() {
  const pageData = useContext(PageContext);
  const pokemonData = pageData.page.data;

  if (!(pokemonData.length > 0)) {
    return <div className="not-found__msg">Not found</div>;
  }

  return (
    <div className="card-list">
      {pokemonData.map((pokemon: PokemonCard) => {
        return (
          <Card
            key={pokemon.id}
            title={capitalize(pokemon.name)}
            img={pokemon.images.small}
            id={pokemon.id}
          />
        );
      })}
    </div>
  );
}
