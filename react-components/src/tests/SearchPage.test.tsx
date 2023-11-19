/**
 * @jest-environment jsdom
 */

import { fireEvent, render /*, screen*/ } from '@testing-library/react';
import SearchBar from '../components/SearchBar';
import '@testing-library/jest-dom';
import { MemoryRouter } from 'react-router-dom';
import { Provider } from 'react-redux';
import { store } from '../store';
import { set as setQuery } from '../features/query/querySlice';
import { set as setLoading } from '../features/isLoading/isLoadingSlice';
import { set as setPageSize } from '../features/pageSize/pageSizeSlice';

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
    <Provider store={store}>
      <MemoryRouter initialEntries={['/cards/1']}>
        <SearchBar />
      </MemoryRouter>
    </Provider>
  );

  const input = container.querySelector('.search-bar__input');
  const value = (input as HTMLInputElement).value;

  expect(value).toBe('char');
});

it('Clicking the Search button saves the entered value to the local storage', () => {
  window.localStorage.setItem('query', 'red');

  const { container } = render(
    <Provider store={store}>
      <MemoryRouter initialEntries={['/cards/1']}>
        <SearchBar />
      </MemoryRouter>
    </Provider>
  );

  window.localStorage.clear();

  const searchBtn = container.querySelector('.search-bar__button');
  if (!searchBtn) return;

  fireEvent.click(searchBtn);
  const value = window.localStorage.getItem('query');

  expect(value).toBe('red');
});

it('querySlice action creator returns valid action object', () => {
  const payload = 'char';
  const expected = { type: 'query/set', payload };

  expect(setQuery(payload)).toMatchObject(expected);
});

it('isLoadingSlice action creator returns valid action object', () => {
  const payload = false;
  const expected = { type: 'isLoading/set', payload };

  expect(setLoading(payload)).toMatchObject(expected);
});

it('pageSizeSlice action creator returns valid action object', () => {
  const payload = 20;
  const expected = { type: 'pageSize/set', payload };

  expect(setPageSize(payload)).toMatchObject(expected);
});
