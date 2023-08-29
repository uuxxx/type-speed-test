import {memo, forwardRef} from 'react';
import {useAppSelector} from '@/redux/hooks';
import {Letter} from '../letter';
import styles from '@styles/word.module.scss';

interface WordProps {
  id: number;
}

export const Word = memo(
    forwardRef<HTMLSpanElement, WordProps>(({id}, ref) => {
      const word = useAppSelector((state) => state.text.infoAboutText.words[id]);

      const letters: JSX.Element[] = [];
      for (let i = 0; i < word.letters.length; i++) {
        const infoAboutLetter = word.letters[i];
        letters.push(<Letter key={i} {...infoAboutLetter} />);
      }

      const className = `${styles.word} ${
      word.type === 'incorrect' ? styles.incorrect : ''
      }`;

      return (
        <span ref={ref || undefined} data-id={id} className={className}>
          {letters}
        </span>
      );
    }),
);
