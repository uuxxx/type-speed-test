import {memoizedDownloadQuotes} from '@/firebase/quotes/fetch_quotes';
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
  correctKeysPressed: 0,
  totalKeysPressed: 0,
  afkDetected: false,
  mode: 'words',

  infoAboutText: {
    secondsSinceStartedTyping: 0,
    currentWordId: 0,
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
    finishTyping(state) {
      state.isTypingFinished = true;
    },
    switchMode(state, {payload}: PayloadAction<Mode>) {
      state.mode = payload;
    },
    setAfkDetected(state) {
      if (state.isTypingStarted && !state.isTypingFinished) {
        state.afkDetected = true;
      }
    },
    resetTypingProgress(state) {
      state.isTypingStarted = false;
      state.isTypingFinished = false;
      state.correctKeysPressed = 0;
      state.afkDetected = false;
      const {infoAboutText} = state;
      infoAboutText.wordsTyped = 0;
      infoAboutText.currentWordId = 0;
      infoAboutText.secondsSinceStartedTyping = 0;
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
        text.incrementTotalKeysPressed();
        if (text.isAnyLetterInWordWasTyped()) {
          if (text.isCurrentWordTypedCorrectly()) {
            text.incrementCorrectKeysPressed();
          }
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
        text.incrementTotalKeysPressed();
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

      text.incrementTotalKeysPressed();

      if (text.isExtraLetterRequired()) {
        if (text.isLimitOfExtraLettersExeeded()) {
          return;
        }
        text.addExtraLetter(letterTypedByUser);
        text.turnToNextAfterAddingIncorrectExtra();
      } else {
        if (text.isCorrectLetterTyped(letterTypedByUser)) {
          text.incrementCorrectKeysPressed();
          text.markCurrentLetterAsCorrect();
          text.turnToNextLetter();
          if (text.isCurrentWordLast() && text.isCurrentLetterLast()) {
            text.handleCorrectlyTypedLastLetterInText();
          }
        } else {
          text.markCurrentLetterAsIncorrect();
          text.turnToNextLetter();
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
      state.errorWhileFetchingQuotes = null;
    });

    builder.addCase(fetchQuotes.rejected, (state, {error}) => {
      state.isLoading = false;
      state.errorWhileFetchingQuotes = error.name || 'Something went wrong';
    });
  },
});

export default slice.reducer;
export const {actions} = slice;
