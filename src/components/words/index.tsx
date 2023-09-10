import {useRef, useEffect} from 'react';
import {useAppSelector, useActions} from '@/redux/hooks';
import {Word} from '../word';

export function Words() {
  const {incrementTimerBy1Sec, onKeyDown, setAfkDetected} = useActions();
  const words = useAppSelector((state) => state.text.infoAboutText.words);
  const currentWordId = useAppSelector(
      (state) => state.text.infoAboutText.currentWordId,
  );

  const isTypingStarted = useAppSelector((state) => state.text.isTypingStarted);
  const isTypingFinished = useAppSelector((state) => state.text.isTypingFinished);
  const isAnyModalOpened = useAppSelector(
      (state) => state.modals.isAnyModalOpened,
  );

  const activeWordRef = useRef<HTMLSpanElement>(null);

  const intervalIdRef = useRef<NodeJS.Timeout>();

  function handleUserType(e: KeyboardEvent) {
    e.preventDefault();
    clearTimeout(intervalIdRef.current);

    onKeyDown({
      letterTypedByUser: e.key,
      ctrlKey: e.ctrlKey,
    });

    intervalIdRef.current = setTimeout(setAfkDetected, 5000);
  }

  useEffect(() => {
    if (!isAnyModalOpened) {
      document?.addEventListener('keydown', handleUserType);
    }

    return () => {
      document?.removeEventListener('keydown', handleUserType);
    };
  }, [isAnyModalOpened]);

  useEffect(() => {
    if (!activeWordRef.current) {
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
    <>
      {words.map((_, i) => {
        return (
          <Word
            id={i}
            key={i}
            ref={currentWordId === i ? activeWordRef : undefined}
          />
        );
      })}
    </>
  );
}
