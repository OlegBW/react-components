import { configureStore } from '@reduxjs/toolkit';
import queryReducer from './features/query/querySlice';
import pageSizeReducer from './features/pageSize/pageSizeSlice';
import isLoadingReducer from './features/isLoading/isLoadingSlice';
import { pokemonApi } from './api/api';
import { setupListeners } from '@reduxjs/toolkit/query';

export const store = configureStore({
  reducer: {
    query: queryReducer,
    pageSize: pageSizeReducer,
    isLoading: isLoadingReducer,
    [pokemonApi.reducerPath]: pokemonApi.reducer,
  },
  middleware: (getDefaultMiddleware) => {
    return getDefaultMiddleware().concat(pokemonApi.middleware);
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

setupListeners(store.dispatch);
