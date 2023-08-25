import {memoizedDownloadQuotes} from '@/firebase/quotes/download_quotes';
import {createSlice, createAsyncThunk, PayloadAction} from '@reduxjs/toolkit';
import {
  getIndexOfNextQuoteAndSaveItAsLatestTypedInLocalStorage,
  isBackspace,
  isSpecialKey,
  isSpace,
  serialize,
} from './utils';
import {Text} from './Text';

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
        state,
        {payload}: PayloadAction<{letterTypedByUser: string; ctrlKey: boolean}>,
    ) {
      const {letterTypedByUser, ctrlKey} = payload;
      const text = new Text(state);

      if (isSpace(letterTypedByUser)) {
        if (text.isAnyLetterInWordWasTyped()) {
          text.turnToNextWord();
        }
        return;
      }

      if (isBackspace(letterTypedByUser)) {
        if (ctrlKey) {
          if (text.isCtrlBackSpaceDeleteAllowed()) {
            text.clearWord();
          }
          return;
        }

        if (text.isRequiredTurnToPrevWord()) {
          if (text.isAllowedTurnToPrevWord()) {
            text.turnToPrevWord();
          }
          return;
        }
        if (text.isPossibleToRemove()) {
          if (text.shouldRemoveExtra()) {
            text.removeExtraLetter();
            text.turnToPrevLetterAfterRemovingExtraLetter();
          } else {
            text.turnToPrevLetter();
          }
        }
        return;
      }

      if (isSpecialKey(letterTypedByUser)) {
        return;
      }

      if (text.isExtraLetterRequired()) {
        text.incrementMistakeCounter();
        if (text.isLimitOfExtraLettersExeeded()) {
          return;
        }
        text.addExtraLetter(letterTypedByUser);
        text.turnToNextAfterAddingIncorrectExtra();
      } else {
        if (text.isCorrectLetterTyped(letterTypedByUser)) {
          text.markCurrentLetterAsCorrect();
          text.turnToNextLetter();
        } else {
          text.markCurrentLetterAsIncorrect();
          text.turnToNextLetter();
          text.incrementMistakeCounter();
        }
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
