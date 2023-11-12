import { useContext } from 'react';
// import { PokemonCard } from '../api/api';
import Card from './Card';
import '../styles/card-list.css';
import { PageContext } from '../contexts';

function capitalize(str: string) {
  return str.charAt(0).toUpperCase() + str.slice(1);
}

export default function CardsList() {
  const pageData = useContext(PageContext);
  const pokemonData = pageData.data;

  return (
    <div className="card-list">
      {pokemonData.map((pokemon) => {
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
