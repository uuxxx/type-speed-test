import styles from '@/styles/notFound.module.scss';

export function NotFound() {
  return (
    <div className={styles.container}>
      <div className={`material-symbols-outlined ${styles.icon}`}>error</div>
      <div>Page not found!</div>
    </div>
  );
}
