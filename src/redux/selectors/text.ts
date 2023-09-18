import {RootState} from '..';

export const selectTextIsLoading = (state: RootState) => state.text.isLoading;
export const selectTextErrorWhileFetchingQuotes = (state: RootState) =>
  state.text.errorWhileFetchingQuotes;
export const selectTextMode = (state: RootState) => state.text.mode;
export const selectTextLanguage = (state: RootState) =>
  state.text.infoAboutText.language;
export const selectTextIsTypingFinished = (state: RootState) =>
  state.text.isTypingFinished;
export const selectTextIsTypingStarted = (state: RootState) =>
  state.text.isTypingStarted;
export const selectTextSecondsSinceStartedTyping = (state: RootState) =>
  state.text.infoAboutText.secondsSinceStartedTyping;
export const selectTextLength = (state: RootState) =>
  state.text.infoAboutText.length;
export const selectTextWords = (state: RootState) =>
  state.text.infoAboutText.words;
export const selectTextCurrentWordId = (state: RootState) =>
  state.text.infoAboutText.currentWordId;
export const selectTextWordsTyped = (state: RootState) =>
  state.text.infoAboutText.wordsTyped;
export const selectTextWordById = (state: RootState, id: number) =>
  state.text.infoAboutText.words[id];
export const selectTextTotalKeysPressed = (state: RootState) =>
  state.text.totalKeysPressed;
export const selectTextAfkDetected = (state: RootState) =>
  state.text.afkDetected;
export const selectTextCorrectKeysPressed = (state: RootState) =>
  state.text.correctKeysPressed;
