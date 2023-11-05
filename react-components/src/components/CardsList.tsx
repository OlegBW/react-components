import { PokemonCard } from '../api/api';
import Card from './Card';
import '../styles/card-list.css';

function capitalize(str: string) {
  return str.charAt(0).toUpperCase() + str.slice(1);
}

type Props = {
  pokemonData: PokemonCard[];
};

export default function CardsList({ pokemonData }: Props) {
  return (
    <div className="card-list">
      {pokemonData.map((pokemon) => {
        return (
          <Card
            key={pokemon.id}
            title={capitalize(pokemon.name)}
            img={pokemon.images.large}
          />
        );
      })}
    </div>
  );
}
