import {useAppSelector} from '@/redux/hooks';
import styles from '@styles/typedWordsCounter.module.scss';

export function TypedWordsCounter() {
  const wordsTyped = useAppSelector(
      (state) => state.text.infoAboutText.wordsTyped,
  );

  const textLength = useAppSelector((state) => state.text.infoAboutText.length);

  return (
    <div className={styles.container}>{`${wordsTyped}/${textLength}`}</div>
  );
}
