/**
 * @jest-environment jsdom
 */

import { fireEvent, render /*, screen*/ } from '@testing-library/react';
import SearchBar from '../components/SearchBar';
import '@testing-library/jest-dom';
import { MemoryRouter } from 'react-router-dom';

type Store = {
  [key: string]: string;
};

const localStorageMock = (function () {
  let store = {} as Store;

  return {
    getItem(key: string) {
      return store[key];
    },

    setItem(key: string, value: string) {
      store[key] = value;
    },

    clear() {
      store = {};
    },

    removeItem(key: string) {
      delete store[key];
    },

    getAll() {
      return store;
    },
  };
})();

Object.defineProperty(window, 'localStorage', { value: localStorageMock });

const mockedUsedNavigation = jest.fn();

jest.mock('react-router-dom', () => ({
  ...jest.requireActual('react-router-dom'),
  useNavigation: () => mockedUsedNavigation,
}));

beforeEach(() => {
  window.localStorage.clear();
});

it('The search bar retrieves the value from the local storage upon mounting', () => {
  window.localStorage.setItem('query', 'char');

  const { container } = render(
    <MemoryRouter initialEntries={['/cards/1']}>
      <SearchBar />
    </MemoryRouter>
  );

  const input = container.querySelector('.search-bar__input');
  const value = (input as HTMLInputElement).value;

  expect(value).toBe('char');
});

it('Clicking the Search button saves the entered value to the local storage', () => {
  window.localStorage.setItem('query', 'red');

  const { container } = render(
    <MemoryRouter initialEntries={['/cards/1']}>
      <SearchBar />
    </MemoryRouter>
  );

  window.localStorage.clear();

  const searchBtn = container.querySelector('.search-bar__button');
  if (!searchBtn) return;

  fireEvent.click(searchBtn);
  const value = window.localStorage.getItem('query');

  expect(value).toBe('red');
});
