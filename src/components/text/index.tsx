import {useEffect, useRef} from 'react';
import {useActions, useAppSelector} from '@/redux/hooks';
import {Word} from '../word';
import {TypedWordsCounter} from '../typedWordsCounter';
import styles from '@styles/text.module.scss';
import {RestartButton} from '../restartButton';

interface TextProps {
  lang: AvailableLangs;
}

export function Text({lang}: TextProps) {
  const {fetchQuotes, onKeyDown, incrementTimerBy1Sec} = useActions();
  const words = useAppSelector((state) => state.text.infoAboutText.words);
  const currentWordId = useAppSelector(
      (state) => state.text.infoAboutText.currentWordId,
  );
  const isTypingStarted = useAppSelector((state) => state.text.isTypingStarted);
  const isTypingFinished = useAppSelector((state) => state.text.isTypingFinished);

  const textContainerRef = useRef<HTMLDivElement>(null);
  const activeWordRef = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    function handleUserType(e: KeyboardEvent) {
      e.preventDefault();
      onKeyDown({
        letterTypedByUser: e.key,
        ctrlKey: e.ctrlKey,
      });
    }

    fetchQuotes(lang);

    function disableScroll(e: Event) {
      e.preventDefault();
    }

    const textContainer = textContainerRef.current!;

    document.addEventListener('keydown', handleUserType);
    textContainer.addEventListener('wheel', disableScroll);
    return () => {
      document.removeEventListener('keydown', handleUserType);
      textContainer.removeEventListener('wheel', disableScroll);
    };
  }, []);

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

  return (
    <div className={styles.wrapper}>
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
