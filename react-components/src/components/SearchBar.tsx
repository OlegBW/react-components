import { ChangeEvent, Component, ReactNode, MouseEvent } from 'react';
import { getPokemonData, getPokemonsData, PokemonData } from '../api/api';
import '../styles/search-bar.css';

type DataState = {
  pokemonData: PokemonData[];
};

type Props = {
  setPokemonData: (state: DataState) => void;
};

const initialValue = {
  query: '',
  hasError: false,
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

  handleFallback(e: MouseEvent) {
    this.setState({
      ...this.state,
      hasError: true,
    });
    e.preventDefault();
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
    if (this.state.hasError) throw new Error('Fallback');
    return (
      <div className="search-bar">
        <input
          className="search-bar__input"
          onChange={(e) => this.handleChange(e)}
          type="text"
          value={this.state.query}
        />
        <button
          className="search-bar__button"
          onClick={() => this.handleSearch()}
          onContextMenu={(e) => this.handleFallback(e)}
        >
          Search
        </button>
      </div>
    );
  }
}
