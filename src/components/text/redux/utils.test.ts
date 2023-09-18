import {QUOTES} from '@/constants';
import {
  getIndexOfNextQuoteAndSaveItAsLatestTypedInLocalStorage,
  serialize,
} from './utils';

describe('getIndexOfNextQuoteAndSaveItAsLatestTypedInLocalStorage', () => {
  beforeEach(() => {
    localStorage.clear();
  });
  test('lang isn\'t saved in LocalStorage', () => {
    getIndexOfNextQuoteAndSaveItAsLatestTypedInLocalStorage('english', 6000);
    const val = JSON.parse(localStorage.getItem(QUOTES)!);
    expect(val).toEqual({english: 0});
  });

  test('last available quote (can\'t increase counter)', () => {
    localStorage.setItem(QUOTES, JSON.stringify({english: 5000}));
    getIndexOfNextQuoteAndSaveItAsLatestTypedInLocalStorage('english', 5000);
    const curQuoteIndex = JSON.parse(localStorage.getItem(QUOTES)!).english;
    expect(curQuoteIndex).toBe(0);
  });

  test('quotes are alredy in LocalStorage', () => {
    localStorage.setItem(
        QUOTES,
        JSON.stringify({english: 333, french: 244, german: 141}),
    );
    getIndexOfNextQuoteAndSaveItAsLatestTypedInLocalStorage('french', 2000);
    const curQuoteIndex = JSON.parse(localStorage.getItem(QUOTES)!);
    expect(curQuoteIndex).toEqual({english: 333, french: 245, german: 141});
  });
});

describe('serialize', () => {
  const serialized = serialize('ab, c!');
  expect(serialized.length).toBe(2);

  test('works fine', () => {
    expect(serialized).toEqual([
      {
        currentLetterId: 0,
        extraIncorrectLettersAdded: 0,
        length: 3,
        letters: [
          {type: 'default', value: 'a', pointerPos: 'before'},
          {type: 'default', value: 'b', pointerPos: 'none'},
          {type: 'default', value: ',', pointerPos: 'none'},
        ],
        type: 'default',
        wasTouched: false,
      },
      {
        currentLetterId: 0,
        extraIncorrectLettersAdded: 0,
        length: 2,
        letters: [
          {type: 'default', value: 'c', pointerPos: 'none'},
          {type: 'default', value: '!', pointerPos: 'none'},
        ],
        type: 'default',
        wasTouched: false,
      },
    ]);
  });
});
