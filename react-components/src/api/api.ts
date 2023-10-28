const API_BASE_URL = 'https://pokeapi.co/api/v2/';

type Stat = {
  base_stat: number;
  effort: number;
  stat: {
    name: string;
  };
};

type Stats = Stat[];

type Sprites = {
  other: {
    'official-artwork': {
      front_default: string;
    };
  };
};

type Pokemon = {
  id: number;
  name: string;
  sprites: Sprites;
  stats: Stats;
};

type FlavorText = {
  flavor_text: string;
  language: {
    name: string;
  };
};

type PokemonSpecies = {
  flavor_text_entries: FlavorText[];
};

export type PokemonData = Pokemon & PokemonSpecies;

type PokemonListItem = {
  name: string;
  url: string;
};

type PokemonList = {
  count: number;
  next: string;
  previous: string | null;
  results: PokemonListItem[];
};

export async function getPokemon(
  term: string = ''
): Promise<Pokemon | PokemonList> {
  const resp = await fetch(`${API_BASE_URL}pokemon/${term}`);
  if (resp.ok) {
    return resp.json();
  }

  throw new Error(`Status:${resp.status} - ${resp.statusText}`);
}

export async function getPokemonSpecies(
  term: string = ''
): Promise<PokemonSpecies | PokemonList> {
  const resp = await fetch(`${API_BASE_URL}pokemon-species/${term}`);
  if (resp.ok) {
    return resp.json();
  }

  throw new Error(`Status:${resp.status} - ${resp.statusText}`);
}

export async function getPokemonData(term: string): Promise<PokemonData> {
  const pokemon = await getPokemon(term);
  const pokemonSpecies = await getPokemonSpecies(term);
  const res = {
    ...(pokemon as Pokemon),
    ...(pokemonSpecies as PokemonSpecies),
  };
  return res;
}

export async function getPokemonsData(): Promise<PokemonData[]> {
  const pokemonList = (await getPokemon()) as PokemonList;
  const pokemons = pokemonList.results;
  const res = [];

  for (const pokemon of pokemons) {
    res.push(getPokemonData(pokemon.name));
  }

  return Promise.all(res);
}
