import {memoizedDownloadQuotes} from '@/firebase/quotes/download_quotes';
import {createSlice, createAsyncThunk, PayloadAction} from '@reduxjs/toolkit';
import {
  getIndexOfNextQuoteAndSaveItAsLatestTypedInLocalStorage,
  isBackspace,
  isCaps,
  isFunctional,
  isOtherModifierKey,
  isShift,
  isSpace,
  serialize,
} from './utils';
import {InitialState, InfoAboutText, Word} from './types';

const initialState = {
  isLoading: false,
  errorWhileFetchingQuotes: null,
  infoAboutText: {
    currentWordId: 0,
    mistakesMade: 0,
    words: [],
    length: 0,
    source: '',
    language: '',
  },
} as InitialState;

export const fetchQuotes = createAsyncThunk(
    'text/getRandomQuote',
    memoizedDownloadQuotes,
);

const slice = createSlice({
  name: 'text',
  initialState,
  reducers: {
    onKeyDown(
        {infoAboutText},
        {payload: letterTypedByUser}: PayloadAction<string>,
    ) {
      if (isSpace(letterTypedByUser)) {
        return;
      }

      if (isShift(letterTypedByUser)) {
        return;
      }

      if (isBackspace(letterTypedByUser)) {
        return;
      }

      if (isCaps(letterTypedByUser)) {
        return;
      }

      if (
        isOtherModifierKey(letterTypedByUser) ||
        isFunctional(letterTypedByUser)
      ) {
        return;
      }
    },
  },
  extraReducers: (builder) => {
    builder.addCase(fetchQuotes.fulfilled, (state, {payload}) => {
      const {amountOfQuotes, quotes, language} = payload;
      const {infoAboutText} = state;
      const indexOfSuitableQuote =
        getIndexOfNextQuoteAndSaveItAsLatestTypedInLocalStorage(
            language,
            amountOfQuotes,
        );

      const {text, length, source} = quotes[indexOfSuitableQuote];
      infoAboutText.words = serialize(text);
      infoAboutText.length = length;
      infoAboutText.source = source;
      state.isLoading = false;
      infoAboutText.language = language;
    });

    builder.addCase(fetchQuotes.pending, (state) => {
      state.isLoading = true;
    });

    builder.addCase(fetchQuotes.rejected, (state, {error}) => {
      state.errorWhileFetchingQuotes = error.name || 'Something went wrong';
      state.isLoading = false;
    });
  },
});

export default slice.reducer;
export const {actions} = slice;