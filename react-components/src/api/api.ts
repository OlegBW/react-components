const API_KEY = '990a7910-7099-4459-8238-fc39b0d4d6ee';
const API_BASE_URL = 'https://api.pokemontcg.io/v2/cards';

export type RequestQuery = {
  q?: string;
  page?: number;
  pageSize?: number;
  orderBy?: string;
  select?: string;
};

export type PokemonCard = {
  id: string;
  name: string;
  images: {
    small: string;
    large: string;
  };
};

export type CardsPage = {
  data: PokemonCard[];
  page: number;
  pageSize: number;
  count: number;
  totalCount: number;
};

function parseUrl(base: string, query: RequestQuery): string {
  const url = new URL(base);
  for (const [k, v] of Object.entries(query)) {
    url.searchParams.set(k, typeof v === 'string' ? v : String(v));
  }
  return String(url);
}

export async function getCards(query: RequestQuery): Promise<CardsPage> {
  // Temporary
  query = {
    ...query,
    pageSize: 20,
    page: 1,
  };

  const url = parseUrl(API_BASE_URL, query);

  const resp = await fetch(url, {
    method: 'GET',
    headers: {
      'X-Api-Key': API_KEY,
    },
  });

  if (resp.ok) {
    return resp.json();
  }

  throw new Error(`Status:${resp.status} - ${resp.statusText}`);
}
