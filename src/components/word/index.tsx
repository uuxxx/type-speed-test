import {useAppSelector} from '@/redux/hooks';
import {selectTextWordById} from '@/redux/selectors/text';
import styles from '@/styles/word.module.scss';
import {forwardRef} from 'react';
import {Letter} from '../letter';

interface WordProps {
  id: number;
}

export const Word = forwardRef<HTMLSpanElement, WordProps>(({id}, ref) => {
  const word = useAppSelector((state) => selectTextWordById(state, id));

  const letters: JSX.Element[] = [];
  for (let i = 0; i < word.letters.length; i++) {
    const infoAboutLetter = word.letters[i];
    letters.push(<Letter key={i} {...infoAboutLetter} />);
  }

  const className = `${styles.word} ${
    word.type === 'incorrect' ? styles.incorrect : ''
  }`;

  return (
    <span
      ref={ref || undefined}
      data-id={id}
      data-testid="word"
      className={className}
    >
      {letters}
    </span>
  );
});
