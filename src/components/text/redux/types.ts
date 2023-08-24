export interface Letter {
  type: 'default' | 'correct' | 'incorrect' | 'incorrect-extra';
  pointerPos: 'none' | 'before' | 'after';
  value: string;
}

export interface Word {
  letters: Letter[];
  extraIncorrectLettersAdded: number;
  isCurrent: boolean;
  currentLetterId: number;
  length: number;
  type: 'default' | 'correct' | 'incorrect';
}

export interface InfoAboutText {
  currentWordId: number;
  mistakesMade: number;
  words: Word[];
  length: number;
  source: string;
  language: string;
}

export interface InitialState {
  isLoading: boolean;
  errorWhileFetchingQuotes: null | string;
  infoAboutText: InfoAboutText;
}
