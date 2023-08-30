import {useActions} from '@redux/hooks';
import styles from '@styles/restartTestBtn.module.scss';

export function RestartButton({lang}: {lang: AvailableLangs}) {
  const {fetchQuotes, reset} = useActions();

  function onClick() {
    reset();
    fetchQuotes(lang);
  }

  return (
    <button
      onClick={onClick}
      className={`${styles.restartBtn} material-symbols-outlined`}
    >
      replay
    </button>
  );
}
