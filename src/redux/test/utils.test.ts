import {serialize} from '@/components/text/redux/utils';
import {getReduxStateBoilerplate} from './utils';

describe('getReduxStateBoilerplate', () => {
  it('empty changes obj', () => {
    const returnedVal = getReduxStateBoilerplate();
    expect(returnedVal).toEqual({
      text: {
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
          length: 5,
          source: 'test test',
          language: 'english',
          wordsTyped: 0,
        },
      },
      modals: {
        isAnyModalOpened: false,
        selectLangModal: {
          isOpened: false,
          availableLangs: [],
          isListLoading: false,
          errorWhileLoading: null,
        },
      },
    });
  });

  it('nested changes', () => {
    const returnedVal = getReduxStateBoilerplate({
      text: {
        infoAboutText: {
          length: 2,
          words: serialize('This is a test text!'),
        },
        mode: 'words',
      },
    });

    const defaultState = getReduxStateBoilerplate();
    const {infoAboutText} = defaultState.text;

    infoAboutText.length = 2;
    infoAboutText.words = serialize('This is a test text!');
    defaultState.text.mode = 'words';

    expect(returnedVal).toEqual(defaultState);
  });
});
