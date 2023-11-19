import { createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';

type PageSize = {
  value: number;
};

const initialState: PageSize = {
  value: 20,
};

export const pageSizeSlice = createSlice({
  name: 'pageSize',
  initialState,
  reducers: {
    set: (state, action: PayloadAction<number>) => {
      state.value = action.payload;
    },
  },
});

export const { set } = pageSizeSlice.actions;
export default pageSizeSlice.reducer;
