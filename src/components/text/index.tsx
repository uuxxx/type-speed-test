import {useEffect, useRef} from 'react';
import {useActions, useAppSelector} from '@/redux/hooks';
import {Word} from '../word';
import {TypedWordsCounter} from '../typedWordsCounter';
import styles from '@styles/text.module.scss';

export function Text() {
  const {fetchQuotes, onKeyDown} = useActions();
  const {words, currentWordId} = useAppSelector(
      (state) => state.text.infoAboutText,
  );
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

    fetchQuotes('russian');

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
    </div>
  );
}
