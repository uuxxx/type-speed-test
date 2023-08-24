import styles from '@styles/letter.module.scss';

type LetterType = 'default' | 'correct' | 'incorrect';

interface LetterProps {
  value: string;
  type: LetterType;
}

export function Letter({value, type}: LetterProps) {
  const className = `${styles.letter} ${
    type === 'default' ? '' : styles[type]
  }`;
  return <span className={className}>{value}</span>;
}
