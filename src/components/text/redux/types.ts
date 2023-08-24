export interface Letter {
  type: 'default' | 'correct' | 'incorrect';
  value: string;
  isCurrent: boolean;
}

export interface Word {
  letters: Letter[];
  extraIncorrectLettersAdded: number;
  isCurrent: boolean;
  currentLetterId: number;
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
