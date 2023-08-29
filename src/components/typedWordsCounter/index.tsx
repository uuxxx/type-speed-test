import {useAppSelector} from '@/redux/hooks';
import styles from '@styles/typedWordsCounter.module.scss';

export function TypedWordsCounter() {
  const {wordsTyped, length: textLength} = useAppSelector(
      (state) => state.text.infoAboutText,
  );

  return (
    <div className={styles.container}>{`${wordsTyped}/${textLength}`}</div>
  );
}
