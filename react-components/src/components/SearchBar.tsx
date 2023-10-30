import { ChangeEvent, Component, ReactNode, MouseEvent } from 'react';
import { getPokemonsData, PokemonData, getQueryPokemonsData } from '../api/api';
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
  isPending: false,
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

  handleSearch(term: string) {
    const query = term.toLowerCase();

    this.setState({
      ...this.state,
      isPending: true,
    });

    if (query === '') {
      getPokemonsData()
        .then((data) => {
          this.setState({
            ...this.state,
            isPending: false,
          });

          this.props.setPokemonData({
            pokemonData: data,
          });
        })
        .catch((/* err */) => {
          this.setState({
            ...this.state,
            isPending: false,
          });
        });
    } else {
      getQueryPokemonsData(query)
        .then((data) => {
          this.setState({
            ...this.state,
            isPending: false,
          });

          this.props.setPokemonData({
            pokemonData: data,
          });
        })
        .catch((/* err */) => {
          this.setState({
            ...this.state,
            isPending: false,
          });
        });
    }

    localStorage.setItem('query', query);
  }

  handleFallback(e: MouseEvent) {
    this.setState({
      ...this.state,
      hasError: true,
    });
    e.preventDefault();
  }

  componentDidMount(): void {
    let query = localStorage.getItem('query');
    if (query === null) query = '';

    this.handleSearch(query);
    this.setState({ query });
  }

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
          onClick={() => this.handleSearch(this.state.query)}
          onContextMenu={(e) => this.handleFallback(e)}
        >
          Search
        </button>
        {this.state.isPending ? <div className="loader"></div> : ''}
      </div>
    );
  }
}
