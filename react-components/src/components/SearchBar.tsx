import { ChangeEvent, Component, ReactNode } from 'react';
import { getPokemonData, getPokemonsData, PokemonData } from '../api/api';

type DataState = {
  pokemonData: PokemonData[];
};

type Props = {
  setPokemonData: (state: DataState) => void;
};

const initialValue = {
  query: '',
};

export default class SearchBar extends Component<Props> {
  state = initialValue;

  constructor(props: Props) {
    super(props);
  }

  handleChange(e: ChangeEvent) {
    const target = e.target;
    if (target && target instanceof HTMLInputElement) {
      this.setState({
        query: target.value,
      });
    }
  }

  handleSearch() {
    const query = this.state.query.toLowerCase();
    if (query === '') {
      console.log('fetch all');
      getPokemonsData().then((data) => {
        this.props.setPokemonData({
          pokemonData: data,
        });
      });
    } else {
      console.log(`fetch ${query}`);
      getPokemonData(query).then((data) => {
        this.props.setPokemonData({
          pokemonData: [data],
        });
      });
    }

    localStorage.setItem('query', this.state.query);
  }

  componentDidMount(): void {
    const query = localStorage.getItem('query');
    if (query) {
      this.setState({ query });
    }
  }

  // componentWillUnmount(): void {
  //   localStorage.setItem('query', this.state.query);
  // }

  render(): ReactNode {
    return (
      <div>
        <input
          onChange={(e) => this.handleChange(e)}
          type="text"
          value={this.state.query}
        />
        <button onClick={() => this.handleSearch()}>Search</button>
      </div>
    );
  }
}
