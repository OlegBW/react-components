import { Component, ReactNode } from 'react';
import { PokemonData } from '../api/api';
import Card from './Card';

function capitalize(str: string) {
  return str.charAt(0).toUpperCase() + str.slice(1);
}

function findDesc(pokemon: PokemonData): string {
  for (const text of pokemon.flavor_text_entries) {
    if (text.language.name === 'en') {
      return text.flavor_text;
    }
  }
  return '';
}

type Props = {
  pokemonData: PokemonData[];
};

export default class CardsList extends Component<Props> {
  constructor(props: Props) {
    super(props);
  }

  render(): ReactNode {
    return (
      <div>
        {this.props.pokemonData.map((pokemon) => {
          return (
            <Card
              key={pokemon.id}
              title={capitalize(pokemon.name)}
              desc={findDesc(pokemon)}
              img={pokemon.sprites.other['official-artwork'].front_default}
            />
          );
        })}
      </div>
    );
  }
}
