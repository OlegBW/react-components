import { RequestQuery, PokemonCard, CardsPage } from '../types';
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

const API_KEY = '990a7910-7099-4459-8238-fc39b0d4d6ee';
const API_BASE_URL = 'https://api.pokemontcg.io/v2/cards';

function parseParams(query: RequestQuery): string {
  const params = new URLSearchParams();
  for (const [k, v] of Object.entries(query)) {
    params.set(k, typeof v === 'string' ? v : String(v));
  }
  return String(params);
}

export const pokemonApi = createApi({
  reducerPath: 'pokemonApi',
  baseQuery: fetchBaseQuery({
    baseUrl: API_BASE_URL,
    prepareHeaders: (headers) => {
      headers.set('X-Api-Key', API_KEY);
    },
  }),
  endpoints: (builder) => ({
    getCard: builder.query<{ data: PokemonCard }, string>({
      query: (id) => `/${id}`,
    }),
    getCards: builder.query<CardsPage, RequestQuery>({
      query: (query) => `?${parseParams(query)}`,
    }),
  }),
});

export const { useGetCardQuery, useGetCardsQuery } = pokemonApi;

// function parseUrl(base: string, query: RequestQuery): string {
//   const url = new URL(base);
//   for (const [k, v] of Object.entries(query)) {
//     url.searchParams.set(k, typeof v === 'string' ? v : String(v));
//   }
//   return String(url);
// }

// export async function getCard(id: string): Promise<PokemonCard> {
//   const url = `${API_BASE_URL}/${id}`;

//   const resp = await fetch(url, {
//     method: 'GET',
//     headers: {
//       'X-Api-Key': API_KEY,
//     },
//   });

//   if (resp.ok) {
//     return resp.json();
//   }

//   throw new Error(`Status:${resp.status} - ${resp.statusText}`);
// }

// export async function getCards(query: RequestQuery): Promise<CardsPage> {
//   if (!query.pageSize) query.pageSize = 20;

//   const url = parseUrl(API_BASE_URL, query);

//   const resp = await fetch(url, {
//     method: 'GET',
//     headers: {
//       'X-Api-Key': API_KEY,
//     },
//   });

//   if (resp.ok) {
//     return resp.json();
//   }

//   throw new Error(`Status:${resp.status} - ${resp.statusText}`);
// }
