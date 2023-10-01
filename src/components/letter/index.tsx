import styles from '@/styles/letter.module.scss';

export function Letter({pointerPos, type, value}: Letter) {
  const className = `${styles.letter} ${
    type === 'default' ? '' : styles[type]
  } ${styles[pointerPos]}`;
  return <span className={className}>{value}</span>;
}
