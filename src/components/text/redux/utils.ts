import {
  ALT,
  BACKSPACE,
  CAPSLOCK,
  CTRL,
  LAST_SELECTED_LANG,
  QUOTES,
  SHIFT,
  TAB,
} from '@/constants';

export function getIndexOfNextQuoteAndSaveItAsLatestTypedInLocalStorage(
    lang: string,
    amountOfQutes: number,
): number {
  let storage = JSON.parse(localStorage.getItem(QUOTES)!);
  if (storage) {
    if (lang in storage && storage[lang] < amountOfQutes) {
      storage[lang]++;
    } else {
      storage[lang] = 0;
    }
  } else {
    storage = {[lang]: 0};
  }

  localStorage.setItem(QUOTES, JSON.stringify(storage));
  return storage[lang];
}

export function getLastSelectedLangFromLocalStorage(): string {
  const lastSelectedLang = localStorage.getItem(LAST_SELECTED_LANG);

  if (lastSelectedLang) {
    return lastSelectedLang;
  }

  localStorage.setItem(LAST_SELECTED_LANG, 'english');
  return 'english';
}

export function setSelectedLangToLocalStorage(lang: string) {
  localStorage.setItem(LAST_SELECTED_LANG, lang);
}

export function serialize(quote: string) {
  const res: Word[] = [];
  const wordDefault = () =>
    ({
      letters: [],
      extraIncorrectLettersAdded: 0,
      currentLetterId: 0,
      type: 'default',
      length: 0,
      wasTouched: false,
    } as Word);

  let word: Word = wordDefault();

  for (const letter of quote) {
    if (letter === ' ') {
      res.push(word);
      word = wordDefault();
    } else {
      word.length++;
      word.letters.push({
        type: 'default',
        value: letter,
        pointerPos: 'none',
      });
    }
  }

  res.push(word);
  res[0].letters[0].pointerPos = 'before';
  return res;
}

export function isSpace(letter: string) {
  return letter === ' ';
}

export function isSpecialKey(letter: string) {
  return letter.length > 1;
}

export function isBackspace(letter: string) {
  return letter === BACKSPACE;
}

export function isCaps(letter: string) {
  return letter === CAPSLOCK;
}

export function isShift(letter: string) {
  return letter === SHIFT;
}

export function isOtherModifierKey(letter: string) {
  return letter === ALT || letter === TAB || letter === CTRL;
}
