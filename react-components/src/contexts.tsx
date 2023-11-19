import { createContext } from 'react';
import { CardsPage } from './types';

type initialContext = {
  page: CardsPage;
  query: string;
};

export const PageContext = createContext({
  page: {},
  query: '',
} as initialContext);
