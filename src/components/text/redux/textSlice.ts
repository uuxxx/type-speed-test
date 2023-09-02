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
  isTypingFinished: false,
  isTypingStarted: false,

  infoAboutText: {
    secondsSinceStartedTyping: 0,
    currentWordId: 0,
    mistakesMade: 0,
    words: [],
    length: 0,
    source: '',
    language: '',
    wordsTyped: 0,
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
    reset() {
      return initialState;
    },
    incrementTimerBy1Sec(state) {
      state.infoAboutText.secondsSinceStartedTyping++;
    },
    onKeyDown(
        state,
        {payload}: PayloadAction<{letterTypedByUser: string; ctrlKey: boolean}>,
    ) {
      if (state.isTypingFinished) {
        return;
      }

      const {letterTypedByUser, ctrlKey} = payload;
      const text = new Text(state);

      if (isSpace(letterTypedByUser)) {
        if (text.isAnyLetterInWordWasTyped()) {
          if (text.shouldIncrementTypedWordsCounter()) {
            text.incrementTypedWordsCounter();
          }

          if (text.isCurrentWordLast()) {
            text.handlePressingSpaceOnLastWord();
            return;
          }

          text.turnToNextWord();
          text.markPrevWordAsTouched();
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

      if (!state.isTypingStarted) {
        state.isTypingStarted = true;
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
          if (text.isCurrentWordLast() && text.isCurrentLetterLast()) {
            text.handleCorrectlyTypedLastLetterInText();
          }
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
      const {quotes, language} = payload;
      const {infoAboutText} = state;
      const indexOfSuitableQuote =
        getIndexOfNextQuoteAndSaveItAsLatestTypedInLocalStorage(
            language,
            quotes.length,
        );

      const {text, source} = quotes[indexOfSuitableQuote];
      const words = serialize(text);
      infoAboutText.words = words;
      infoAboutText.length = words.length;
      infoAboutText.source = source;
      state.isLoading = false;
      infoAboutText.language = language;
    });

    builder.addCase(fetchQuotes.pending, (state) => {
      state.isLoading = true;
    });

    builder.addCase(fetchQuotes.rejected, (state, {error}) => {
      state.isLoading = false;
      state.errorWhileFetchingQuotes = error.name || 'Something went wrong';
    });
  },
});

export default slice.reducer;
export const {actions} = slice;
