import {useEffect, useRef, useCallback} from 'react';
import {useActions, useAppSelector} from '@/redux/hooks';
import {Word} from '../word';
import {TypedWordsCounter} from '../typedWordsCounter';
import {RestartButton} from '../restartButton';
import {Spinner} from '../spinner';
import {SelectLangButton} from '../selectLangButton';
import styles from '@styles/text.module.scss';

interface TextProps {
  lang: AvailableLangs;
}

export function Text({lang}: TextProps) {
  const {fetchQuotes, onKeyDown, incrementTimerBy1Sec} = useActions();
  const words = useAppSelector(state => state.text.infoAboutText.words);
  const currentWordId = useAppSelector(
    state => state.text.infoAboutText.currentWordId,
  );
  const isTypingStarted = useAppSelector(state => state.text.isTypingStarted);
  const isTypingFinished = useAppSelector(state => state.text.isTypingFinished);
  const isLoading = useAppSelector(state => state.text.isLoading);
  const error = useAppSelector(state => state.text.errorWhileFetchingQuotes);
  const isAnyModalOpened = useAppSelector(
    state => state.modals.isAnyModalOpened,
  );

  const textContainerRef = useRef<HTMLDivElement>(null);
  const activeWordRef = useRef<HTMLSpanElement>(null);

  const handleUserType = useCallback(function (e: KeyboardEvent) {
    e.preventDefault();
    onKeyDown({
      letterTypedByUser: e.key,
      ctrlKey: e.ctrlKey,
    });
  }, []);

  useEffect(() => {
    fetchQuotes('english');
  }, []);

  useEffect(() => {
    if (!isAnyModalOpened) {
      document?.addEventListener('keydown', handleUserType);
    }

    return () => document?.removeEventListener('keydown', handleUserType);
  }, [isAnyModalOpened]);

  useEffect(() => {
    if (!textContainerRef.current || !activeWordRef.current) {
      return;
    }
    activeWordRef.current.scrollIntoView({block: 'center', behavior: 'smooth'});
  }, [currentWordId]);

  useEffect(() => {
    if (!isTypingStarted) {
      return;
    }

    let id: NodeJS.Timeout;

    if (!isTypingFinished) {
      id = setInterval(incrementTimerBy1Sec, 1000);
    }

    return () => clearInterval(id);
  }, [isTypingStarted, isTypingFinished]);

  if (error) {
    return (
      <div className={styles.wrapper}>
        <div>{error}</div>
        <RestartButton lang={lang} />
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
      <SelectLangButton />
      <TypedWordsCounter />
      <div ref={textContainerRef} className={styles.textContainer}>
        {words.map((_, i) => {
          return (
            <Word
              id={i}
              key={i}
              ref={currentWordId === i ? activeWordRef : undefined}
            />
          );
        })}
      </div>
      <RestartButton lang={lang} />
    </div>
  );
}
