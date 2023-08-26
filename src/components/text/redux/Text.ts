const LIMIT_OF_INCORRECT_EXTRA_LETTERS = 6;

export class Text {
  private infoAboutText: InfoAboutText;

  constructor(private state: InitialState) {
    this.infoAboutText = this.state.infoAboutText;
  }

  get currentLetter() {
    const {currentLetterId, letters} = this.currentWord;
    return letters[currentLetterId];
  }

  get currentWord() {
    const {words, currentWordId} = this.infoAboutText;
    return words[currentWordId];
  }

  get prevWord() {
    const {words, currentWordId} = this.infoAboutText;
    return words[currentWordId - 1];
  }

  isCorrectLetterTyped(letterTypedByUser: string) {
    return (
      this.currentWord.extraIncorrectLettersAdded === 0 &&
      this.currentLetter.value === letterTypedByUser
    );
  }

  isExtraLetterRequired() {
    const {currentLetterId, length} = this.currentWord;
    return currentLetterId === length;
  }

  markCurrentLetterAsCorrect() {
    this.currentLetter.type = 'correct';
  }

  markCurrentLetterAsIncorrect() {
    this.currentLetter.type = 'incorrect';
  }

  turnToNextLetter() {
    const currentWord = this.currentWord;
    const {length, currentLetterId} = currentWord;
    if (currentLetterId === length - 1) {
      this.currentLetter.pointerPos = 'after';
      currentWord.currentLetterId++;
    } else {
      this.currentLetter.pointerPos = 'none';
      currentWord.currentLetterId++;
      this.currentLetter.pointerPos = 'before';
    }
  }

  turnToNextAfterAddingIncorrectExtra() {
    const currentWord = this.currentWord;
    const {letters} = currentWord;
    letters[currentWord.length - 2].pointerPos = 'none';
    currentWord.currentLetterId++;
  }

  incrementMistakeCounter() {
    this.infoAboutText.mistakesMade++;
  }

  isLimitOfExtraLettersExeeded() {
    return (
      this.currentWord.extraIncorrectLettersAdded >
      LIMIT_OF_INCORRECT_EXTRA_LETTERS
    );
  }

  addExtraLetter(letterTypedByUser: string) {
    const currentWord = this.currentWord;
    currentWord.letters.push({
      type: 'incorrectExtra',
      value: letterTypedByUser,
      pointerPos: 'after',
    });
    currentWord.extraIncorrectLettersAdded++;
    currentWord.length++;
  }

  isPossibleToRemove() {
    return this.currentWord.currentLetterId > 0;
  }

  shouldRemoveExtra() {
    return this.currentWord.extraIncorrectLettersAdded > 0;
  }

  turnToPrevLetter() {
    if (this.currentWord.currentLetterId < this.currentWord.length) {
      this.currentLetter.pointerPos = 'none';
    }
    this.currentWord.currentLetterId--;
    this.currentLetter.type = 'default';
    this.currentLetter.pointerPos = 'before';
  }

  turnToPrevLetterAfterRemovingExtraLetter() {
    const currentWord = this.currentWord;
    currentWord.currentLetterId--;
    currentWord.letters[currentWord.length - 1].pointerPos = 'after';
  }

  removeExtraLetter() {
    const currentWord = this.currentWord;
    currentWord.letters.pop();
    currentWord.length--;
    currentWord.extraIncorrectLettersAdded--;
  }

  isAnyLetterInWordWasTyped() {
    return this.currentWord.currentLetterId > 0;
  }

  isCurrentWordTypedCorrectly() {
    const currentWord = this.currentWord;
    const {letters, extraIncorrectLettersAdded} = currentWord;
    if (extraIncorrectLettersAdded > 0) {
      return false;
    }
    for (const letter of letters) {
      if (letter.type !== 'correct') {
        return false;
      }
    }

    return true;
  }

  turnToNextWord() {
    const type: WordType = this.isCurrentWordTypedCorrectly() ?
      'correct' :
      'incorrect';

    const {letters, length, currentLetterId} = this.currentWord;
    if (currentLetterId < length) {
      this.currentLetter.pointerPos = 'none';
    } else {
      letters[length - 1].pointerPos = 'none';
    }
    this.currentWord.type = type;
    this.infoAboutText.currentWordId++;
    this.currentLetter.pointerPos = 'before';
  }

  isRequiredTurnToPrevWord() {
    return this.currentWord.currentLetterId === 0;
  }

  isAllowedTurnToPrevWord() {
    if (this.infoAboutText.currentWordId === 0) {
      return false;
    }

    return this.prevWord.type === 'incorrect';
  }

  turnToPrevWord() {
    this.currentLetter.pointerPos = 'none';
    this.infoAboutText.currentWordId--;
    const currentWord = this.currentWord;

    currentWord.currentLetterId = currentWord.length;
    currentWord.letters[currentWord.length - 1].pointerPos = 'after';
  }

  removeExtraLettersFromCurrentWord() {
    while (this.currentWord.extraIncorrectLettersAdded) {
      this.removeExtraLetter();
    }
  }

  isCtrlBackSpaceDeleteAllowed() {
    if (this.isAnyLetterInWordWasTyped()) {
      return true;
    }

    return this.isTurnToPrevWordAfterPressingCtrlBackspaceRequired();
  }

  isTurnToPrevWordAfterPressingCtrlBackspaceRequired() {
    if (this.infoAboutText.currentWordId > 0) {
      if (
        this.currentWord.currentLetterId === 0 &&
        this.prevWord.type === 'incorrect'
      ) {
        return true;
      }
    }
    return false;
  }

  clearWord() {
    if (this.isTurnToPrevWordAfterPressingCtrlBackspaceRequired()) {
      this.turnToPrevWord();
      return;
    }

    const {letters} = this.currentWord;

    this.removeExtraLettersFromCurrentWord();

    for (const letter of letters) {
      letter.pointerPos = 'none';
      letter.type = 'default';
    }

    this.currentWord.currentLetterId = 0;
    this.currentLetter.pointerPos = 'before';
    this.currentWord.type = 'default';
  }

  markPrevWordAsTouched() {
    this.prevWord.wasTouched = true;
  }

  shouldIncrementTypedWordsCounter() {
    return !this.currentWord.wasTouched;
  }

  incrementTypedWordsCounter() {
    this.infoAboutText.wordsTyped++;
  }

  isAllWordsBesidesLastWasTyped() {
    const {length, wordsTyped} = this.infoAboutText;
    return wordsTyped === length;
  }

  isCurrentWordLast() {
    const {length, currentWordId} = this.infoAboutText;
    return currentWordId === length - 1;
  }

  isCurrentLetterLast() {
    const {length, currentLetterId} = this.currentWord;
    return length === currentLetterId;
  }

  handlePressingSpaceOnLastWord() {
    this.currentLetter.pointerPos = 'none';
    this.currentWord.currentLetterId = this.currentWord.length - 1;
    this.currentLetter.pointerPos = 'after';
    this.currentWord.type = 'incorrect';
    this.state.isTypingFinished = true;
  }

  handleCorrectlyTypedLastLetterInText() {
    this.incrementTypedWordsCounter();
    if (!this.isCurrentWordTypedCorrectly()) {
      this.currentWord.type = 'incorrect';
    }
    this.state.isTypingFinished = true;
  }
}
