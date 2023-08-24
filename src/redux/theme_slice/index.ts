import {createSlice, PayloadAction} from '@reduxjs/toolkit';

interface InitialState {
  name: 'dark' | 'light';
}

const initialState = {
  name: 'dark',
} as InitialState;

const slice = createSlice({
  name: 'theme',
  initialState,
  reducers: {
    switchTheme(_, {payload}: PayloadAction<typeof initialState>) {
      return payload;
    },
  },
});

export const {actions} = slice;
export default slice.reducer;
