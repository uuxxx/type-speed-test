import {useAppSelector} from '@/redux/hooks';
import {selectTextLength, selectTextWordsTyped} from '@/redux/selectors/text';
import styles from '@styles/typedWordsCounter.module.scss';

export function TypedWordsCounter() {
  const wordsTyped = useAppSelector(selectTextWordsTyped);
  const textLength = useAppSelector(selectTextLength);

  return (
    <div className={styles.container}>{`${wordsTyped}/${textLength}`}</div>
  );
}
