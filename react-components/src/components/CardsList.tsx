import { Component, ReactNode } from 'react';
import { PokemonCard } from '../api/api';
import Card from './Card';
import '../styles/card-list.css';

function capitalize(str: string) {
  return str.charAt(0).toUpperCase() + str.slice(1);
}

type Props = {
  pokemonData: PokemonCard[];
};

export default class CardsList extends Component<Props> {
  constructor(props: Props) {
    super(props);
  }

  render(): ReactNode {
    return (
      <div className="card-list">
        {this.props.pokemonData.map((pokemon) => {
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
}
