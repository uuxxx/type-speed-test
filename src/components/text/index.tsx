import {Word} from '../word';
import {useEffect} from 'react';
import {useActions, useAppSelector} from '@/redux/hooks';
import styles from '@styles/text.module.scss';

export function Text() {
  const {fetchQuotes, onKeyDown} = useActions();
  const {words} = useAppSelector((state) => state.text.infoAboutText);

  useEffect(() => {
    function handleUserType(e: KeyboardEvent) {
      e.preventDefault();
      onKeyDown(e.key);
    }

    fetchQuotes('russian');
    document.addEventListener('keydown', handleUserType);
    return () => document.removeEventListener('keydown', handleUserType);
  }, []);

  return (
    <div className={styles.textContainer}>
      {words.map((_, i) => (
        <Word id={i} key={i} />
      ))}
    </div>
  );
}
