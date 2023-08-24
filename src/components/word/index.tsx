import {Letter} from '../letter';
import {useAppSelector} from '@/redux/hooks';
import styles from '@styles/word.module.scss';

export function Word({id}: {id: number}) {
  const {words} = useAppSelector((state) => state.text.infoAboutText);
  const word = words[id];

  const letters: JSX.Element[] = [];
  for (let i = 0; i < word.letters.length; i++) {
    const {type, value} = word.letters[i];
    letters.push(<Letter key={i} type={type} value={value} />);
  }
  return <span className={styles.word}>{letters}</span>;
}
