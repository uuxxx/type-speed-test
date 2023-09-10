declare type WordType = 'default' | 'correct' | 'incorrect';
declare type LetterType =
  | 'default'
  | 'correct'
  | 'incorrect'
  | 'incorrectExtra';

declare type Mode = 'words' | 'time';

declare interface Letter {
  type: LetterType;
  pointerPos: 'none' | 'before' | 'after';
  value: string;
}

declare interface Word {
  letters: Letter[];
  extraIncorrectLettersAdded: number;
  currentLetterId: number;
  length: number;
  type: WordType;
  wasTouched: boolean;
}

declare interface InfoAboutText {
  currentWordId: number;
  words: Word[];
  length: number;
  source: string;
  language: string;
  wordsTyped: number;
  secondsSinceStartedTyping: number;
}

declare interface InitialState {
  isLoading: boolean;
  errorWhileFetchingQuotes: null | string;
  infoAboutText: InfoAboutText;
  isTypingFinished: boolean;
  isTypingStarted: boolean;
  totalKeysPressed: number;
  correctKeysPressed: number;
  afkDetected: boolean;
  mode: Mode;
}
