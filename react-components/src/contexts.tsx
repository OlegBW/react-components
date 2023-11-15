import { createContext } from 'react';
import { CardsPage } from './api/api';

type initialContext = {
  page: CardsPage;
  query: string;
};

export const PageContext = createContext({
  page: {},
  query: '',
} as initialContext);
