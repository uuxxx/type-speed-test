import {useRef, useEffect} from 'react';
import {useAppSelector, useActions} from '@/redux/hooks';
import {Word} from '../word';
import {selectModalsIsAnyModalOpened} from '@/redux/selectors/modals/modals';
import {
  selectTextCurrentWordId,
  selectTextIsTypingFinished,
  selectTextIsTypingStarted,
  selectTextWords,
} from '@/redux/selectors/text';

export function Words() {
  const {incrementTimerBy1Sec, onKeyDown, setAfkDetected} = useActions();
  const words = useAppSelector(selectTextWords);
  const currentWordId = useAppSelector(selectTextCurrentWordId);

  const isTypingStarted = useAppSelector(selectTextIsTypingStarted);
  const isTypingFinished = useAppSelector(selectTextIsTypingFinished);
  const isAnyModalOpened = useAppSelector(selectModalsIsAnyModalOpened);

  const activeWordRef = useRef<HTMLSpanElement>(null);

  const intervalIdRef = useRef<NodeJS.Timeout>();

  function handleUserType(e: KeyboardEvent) {
    e.preventDefault();
    clearTimeout(intervalIdRef.current);

    onKeyDown({
      letterTypedByUser: e.key,
      ctrlKey: e.ctrlKey,
    });

    intervalIdRef.current = setTimeout(setAfkDetected, 10_000);
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
