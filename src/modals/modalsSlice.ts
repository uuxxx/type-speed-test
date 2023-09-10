import {createSlice, createAsyncThunk} from '@reduxjs/toolkit';
import {fetchListOfAllAvailableQuotes} from '@/firebase/quotes/fetch_quotes';
import {InitialState, Modal} from './types';

const initialState = {
  isAnyModalOpened: false,
  selectLangModal: {
    isOpened: false,
    availableLangs: [],
    isListLoading: false,
    errorWhileLoading: null,
  },
} as InitialState;

export const fetchListOfQuotes = createAsyncThunk(
    'text/fetchListOfAvailableQuotes',
    async () => {
      return await fetchListOfAllAvailableQuotes();
    },
);

function ifAnyModalOpened(state: InitialState) {
  for (const key in state) {
    if (key === 'isAnyModalOpened') {
      continue;
    }

    const modal = <Modal>state[key as keyof InitialState];

    if (modal.isOpened) {
      return true;
    }
  }
  return false;
}

const slice = createSlice({
  name: 'modals',
  initialState,
  reducers: {
    openSelectLangModal(state) {
      if (state.isAnyModalOpened) {
        return;
      }
      const {selectLangModal} = state;
      state.isAnyModalOpened = true;
      selectLangModal.isOpened = true;
    },
    closeSelectLangModal(state) {
      state.selectLangModal.isOpened = false;
      state.isAnyModalOpened = ifAnyModalOpened(state);
    },
  },
  extraReducers: (builder) => {
    builder.addCase(fetchListOfQuotes.fulfilled, (state, {payload}) => {
      const {selectLangModal} = state;
      selectLangModal.errorWhileLoading = null;
      selectLangModal.isListLoading = false;
      selectLangModal.availableLangs = payload;
    });

    builder.addCase(fetchListOfQuotes.pending, (state) => {
      const {selectLangModal} = state;
      selectLangModal.isListLoading = true;
      selectLangModal.errorWhileLoading = null;
    });

    builder.addCase(fetchListOfQuotes.rejected, (state, {error}) => {
      const {selectLangModal} = state;
      selectLangModal.errorWhileLoading =
        error.message || 'something went wrong...';
      selectLangModal.isListLoading = false;
    });
  },
});

export default slice.reducer;
export const {actions} = slice;
