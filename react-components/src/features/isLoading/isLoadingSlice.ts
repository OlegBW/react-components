import { createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';

type isLoading = {
  value: boolean;
};

const initialState: isLoading = {
  value: true,
};

export const isLoadingSlice = createSlice({
  name: 'isLoading',
  initialState,
  reducers: {
    set: (state, action: PayloadAction<boolean>) => {
      state.value = action.payload;
    },
  },
});

export const { set } = isLoadingSlice.actions;
export default isLoadingSlice.reducer;
