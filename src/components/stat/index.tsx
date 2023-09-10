import styles from '@styles/stat.module.scss';

interface StatProps {
  statName: string;
  statValue: string | number;
}

export function Stat({statName, statValue}: StatProps) {
  return (
    <div className={styles.stat}>
      <div className={styles.statName}>{statName}</div>
      <div className={styles.statValue}>{statValue}</div>
    </div>
  );
}
