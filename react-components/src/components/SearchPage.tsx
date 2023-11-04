import { Component, ReactNode } from 'react';
import CardsList from './CardsList';
import SearchBar from './SearchBar';

const initialState = {
  data: [],
  name: '',
  images: {
    small: '',
    large: '',
  },
};

export default class SearchPage extends Component {
  state = initialState;

  constructor(props: object) {
    super(props);
    this.setState = this.setState.bind(this);
  }

  render(): ReactNode {
    console.log(this.state.data);
    return (
      <div className="search-page">
        <SearchBar setPokemonData={this.setState} />
        <CardsList pokemonData={this.state.data} />
      </div>
    );
  }
}
