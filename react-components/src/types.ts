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
  flavorText: string;
  evolvesTo?: string[];
  evolvesFrom?: string;
};

export type CardsPage = {
  data: PokemonCard[];
  page: number;
  pageSize: number;
  count: number;
  totalCount: number;
};
