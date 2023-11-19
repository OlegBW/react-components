import { createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';

type Query = {
  value: string;
};

const initialState: Query = {
  value: '',
};

export const querySlice = createSlice({
  name: 'query',
  initialState,
  reducers: {
    set: (state, action: PayloadAction<string>) => {
      state.value = action.payload;
    },
  },
});

export const { set } = querySlice.actions;
export default querySlice.reducer;
