import {useActions, useAppSelector} from '@/redux/hooks';
import {
  selectTextErrorWhileFetchingQuotes,
  selectTextIsLoading,
  selectTextIsTypingFinished,
  selectTextLanguage,
  selectTextMode,
} from '@/redux/selectors/text';
import styles from '@/styles/text.module.scss';
import ReplayIcon from '@/assets/icons/replay.svg?react';
import {useCallback, useEffect, useRef} from 'react';
import {useNavigate} from 'react-router-dom';
import {Button} from '../button';
import {Menu} from '../menu';
import {SelectLangButton} from '../selectLangButton';
import {Spinner} from '../spinner';
import {Timer} from '../timer';
import {TypedWordsCounter} from '../typedWordsCounter';
import {Words} from '../words';
import {
  getLastSelectedLangFromLocalStorage,
  setSelectedLangToLocalStorage,
} from './redux/utils';

export function Text() {
  const {fetchQuotes, resetTypingProgress} = useActions();

  const isLoading = useAppSelector(selectTextIsLoading);
  const error = useAppSelector(selectTextErrorWhileFetchingQuotes);
  const mode = useAppSelector(selectTextMode);
  const language = useAppSelector(selectTextLanguage);
  const isTypingFinished = useAppSelector(selectTextIsTypingFinished);

  const navigate = useNavigate();

  const textContainerRef = useRef<HTMLDivElement>(null);
  const fakeInputRef = useRef<HTMLInputElement>(null);

  const prevDefault = useCallback((e: Event) => e.preventDefault(), []);

  useEffect(() => {
    const lastSelectedLang = getLastSelectedLangFromLocalStorage();
    fetchQuotes(lastSelectedLang);
  }, []);

  useEffect(() => {
    if (isTypingFinished) {
      navigate('/analytics');
    }
  }, [isTypingFinished]);

  useEffect(() => {
    setSelectedLangToLocalStorage(language);
  }, [language]);

  useEffect(() => {
    const textContainer = textContainerRef.current;
    textContainer?.addEventListener('wheel', prevDefault, {passive: false});
    textContainer?.addEventListener('touchmove', prevDefault, {passive: false});
    textContainer?.addEventListener('click', focusFakeInput);
    return () => {
      textContainer?.removeEventListener('wheel', prevDefault);
      textContainer?.removeEventListener('touchmove', prevDefault);
      textContainer?.removeEventListener('click', focusFakeInput);
    };
  });

  function replayClickHandler() {
    resetTypingProgress();
    fetchQuotes(language);
  }

  function focusFakeInput() {
    fakeInputRef.current?.focus();
  }

  if (error) {
    return (
      <div className={styles.wrapper}>
        <div>{error}</div>
        <Button onClick={replayClickHandler}>
          <span className="material-symbols-outlined">replay</span>
        </Button>
      </div>
    );
  }

  if (isLoading) {
    return (
      <div className={styles.wrapper}>
        <Spinner />
      </div>
    );
  }

  return (
    <div className={styles.wrapper}>
      <input ref={fakeInputRef} className={styles.fakeInput} />
      <Menu />
      <SelectLangButton />
      {mode === 'time' ? <Timer /> : <TypedWordsCounter />}
      <div ref={textContainerRef} className={styles.textContainer}>
        <Words />
      </div>
      <Button className={styles['replay-btn']} onClick={replayClickHandler}>
        <ReplayIcon className={styles.icon} />
      </Button>
    </div>
  );
}
