import {useEffect, useRef, useCallback} from 'react';
import {useNavigate} from 'react-router-dom';
import {useActions, useAppSelector} from '@/redux/hooks';
import {TypedWordsCounter} from '../typedWordsCounter';
import {Spinner} from '../spinner';
import {SelectLangButton} from '../selectLangButton';
import {Words} from '../words';
import {
  getLastSelectedLangFromLocalStorage,
  setSelectedLangToLocalStorage,
} from './redux/utils';
import {Menu} from '../menu';
import {Timer} from '../timer';
import {Button} from '../button';
import {
  selectTextErrorWhileFetchingQuotes,
  selectTextIsLoading,
  selectTextIsTypingFinished,
  selectTextLanguage,
  selectTextMode,
} from '@/redux/selectors/text';
import styles from '@styles/text.module.scss';

export function Text() {
  const {fetchQuotes, resetTypingProgress} = useActions();

  const isLoading = useAppSelector(selectTextIsLoading);
  const error = useAppSelector(selectTextErrorWhileFetchingQuotes);
  const mode = useAppSelector(selectTextMode);
  const language = useAppSelector(selectTextLanguage);
  const isTypingFinished = useAppSelector(selectTextIsTypingFinished);

  const navigate = useNavigate();

  const textContainerRef = useRef<HTMLDivElement>(null);

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
    return () => {
      textContainer?.removeEventListener('wheel', prevDefault);
      textContainer?.removeEventListener('touchmove', prevDefault);
    };
  });

  function replayClickHandler() {
    resetTypingProgress();
    fetchQuotes(language);
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
      <Menu />
      <SelectLangButton />
      {mode === 'time' ? <Timer /> : <TypedWordsCounter />}
      <div ref={textContainerRef} className={styles.textContainer}>
        <Words />
      </div>
      <Button onClick={replayClickHandler}>
        <span className="material-symbols-outlined">replay</span>
      </Button>
    </div>
  );
}
