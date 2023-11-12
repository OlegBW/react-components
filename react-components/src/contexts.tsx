import { createContext } from 'react';
import { CardsPage } from './api/api';

export const SearchContext = createContext('');
export const PageContext = createContext({} as CardsPage);
