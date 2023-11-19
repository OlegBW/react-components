import { CardsPage } from '../../api/api';

export const mockCardsPage: CardsPage = {
  data: [
    {
      id: '1',
      name: 'Bulbasaur',
      images: {
        small: 'bulbasaur_small_image_url',
        large: 'bulbasaur_large_image_url',
      },
      flavorText: 'A strange seed was planted on its back at birth.',
      evolvesTo: ['Ivysaur'],
    },
    {
      id: '2',
      name: 'Charmander',
      images: {
        small: 'charmander_small_image_url',
        large: 'charmander_large_image_url',
      },
      flavorText:
        'Obviously prefers hot places. When it rains, steam is said to spout from the tip of its tail.',
      evolvesTo: ['Charmeleon'],
      evolvesFrom: 'Charizard',
    },
    {
      id: '3',
      name: 'Squirtle',
      images: {
        small: 'squirtle_small_image_url',
        large: 'squirtle_large_image_url',
      },
      flavorText:
        'After birth, its back swells and hardens into a shell. It powerfully sprays foam from its mouth.',
      evolvesTo: ['Wartortle'],
      evolvesFrom: 'Blastoise',
    },
    {
      id: '4',
      name: 'Pikachu',
      images: {
        small: 'pikachu_small_image_url',
        large: 'pikachu_large_image_url',
      },
      flavorText:
        'When several of these Pokémon gather, their electricity could build and cause lightning storms.',
      evolvesTo: ['Raichu'],
      evolvesFrom: 'Pichu',
    },
  ],
  page: 1,
  pageSize: 4,
  count: 4,
  totalCount: 100, // Assuming there are 100 Pokemon cards in total
};

export const emptyCardsPage: CardsPage = {
  data: [],
  page: 1,
  pageSize: 20,
  count: 0,
  totalCount: 100, // Assuming there are 100 Pokemon cards in total
};
