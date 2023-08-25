declare type WordType = 'default' | 'correct' | 'incorrect';
declare type LetterType =
  | 'default'
  | 'correct'
  | 'incorrect'
  | 'incorrectExtra';

declare interface Letter {
  type: LetterType;
  pointerPos: 'none' | 'before' | 'after';
  value: string;
}

declare interface Word {
  letters: Letter[];
  extraIncorrectLettersAdded: number;
  isCurrent: boolean;
  currentLetterId: number;
  length: number;
  type: WordType;
}

declare interface InfoAboutText {
  currentWordId: number;
  mistakesMade: number;
  words: Word[];
  length: number;
  source: string;
  language: string;
}

declare interface InitialState {
  isLoading: boolean;
  errorWhileFetchingQuotes: null | string;
  infoAboutText: InfoAboutText;
}
