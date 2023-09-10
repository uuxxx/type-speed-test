export class StatsCalculator {
  private incorrect: number = 0;
  private missed: number;
  private correct: number;
  private extra: number;

  constructor(
    private wordsTyped: number,
    private secSpentOnTyping: number,
    private correctKeysPressed: number,
    private totalKeysPressed: number,
    private words: Word[],
  ) {
    this.incorrect = 0;
    this.missed = 0;
    this.correct = 0;
    this.extra = 0;

    this.analyzeText();
  }

  get wpm() {
    return Math.round(this.wordsTyped / (this.secSpentOnTyping / 60));
  }

  get acc() {
    return Math.round((this.correctKeysPressed / this.totalKeysPressed) * 100);
  }

  get incorrectCharacters() {
    return this.incorrect;
  }

  get correctCharacters() {
    return this.correct;
  }

  get extraCharacters() {
    return this.extra;
  }

  get missedCharacters() {
    return this.missed;
  }

  private analyzeText() {
    for (const word of this.words) {
      const {wasTouched, letters, length, type} = word;
      if (!wasTouched) {
        this.missed += length;
        continue;
      }

      if (type === 'correct') {
        this.correct += length;
        continue;
      }

      if (type === 'default') {
        this.missed += length;
        continue;
      }

      for (const letter of letters) {
        switch (letter.type) {
          case 'correct':
            this.correct++;
            break;
          case 'default':
            this.missed++;
            break;
          case 'incorrect':
            this.incorrect++;
            break;
          case 'incorrectExtra':
            this.extra++;
            break;
          default:
            break;
        }
      }
    }
  }
}
