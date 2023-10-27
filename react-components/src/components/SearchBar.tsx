import { ChangeEvent, Component, ReactNode } from 'react';

const initialValue = {
  query: '',
};

export default class SearchBar extends Component {
  state = initialValue;

  handleChange(e: ChangeEvent) {
    const target = e.target;
    if (target && target instanceof HTMLInputElement) {
      this.setState({
        query: target.value,
      });
    }
  }

  handleSearch() {
    if (this.state.query === '') {
      console.log('fetch all');
    } else {
      console.log(`fetch ${this.state.query}`);
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
