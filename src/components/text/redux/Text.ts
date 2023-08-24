import {InfoAboutText, InitialState} from './types';

export class Text {
  private infoAboutText: InfoAboutText;

  constructor(state: InitialState) {
    this.infoAboutText = state.infoAboutText;
  }

  get currentLetter() {
    const {currentLetterId, letters} = this.currentWord;
    return letters[currentLetterId];
  }

  get currentWord() {
    const {words, currentWordId} = this.infoAboutText;
    return words[currentWordId];
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

  addExtraLetter(letterTypedByUser: string) {
    const currentWord = this.currentWord;
    currentWord.letters.push({
      type: 'incorrectExtra',
      value: letterTypedByUser,
      pointerPos: 'after',
    });
    currentWord.length++;
  }
}
