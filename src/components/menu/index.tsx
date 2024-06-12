import {useActions, useAppSelector} from '@/redux/hooks';
import {selectTextLanguage, selectTextMode} from '@/redux/selectors/text';
import styles from '@/styles/menu.module.scss';
import {useEffect} from 'react';
import {Button} from '../button';
import {
  getLastSelectedModeFromLocalStorage,
  setSelectedModeToLocalStorage,
} from './utils';
import TimerIcon from '@/assets/icons/timer.svg?react';
import TitleIcon from '@/assets/icons/title.svg?react';

export function Menu() {
  const currentMode = useAppSelector(selectTextMode);
  const language = useAppSelector(selectTextLanguage);
  const {switchMode, resetTypingProgress, fetchQuotes} = useActions();

  useEffect(() => {
    const mode = getLastSelectedModeFromLocalStorage();
    switchMode(mode);
  }, []);

  const clickHandler = (userSelectedMode: Mode) => {
    if (userSelectedMode === currentMode) {
      return;
    }

    resetTypingProgress();
    switchMode(userSelectedMode);
    setSelectedModeToLocalStorage(userSelectedMode);
    fetchQuotes(language);
  };

  return (
    <div className={styles.container}>
      <Button
        onClick={() => clickHandler('time')}
        className={`${styles.btn} ${
          currentMode === 'time' && styles.highlighted
        }`}
      >
        <TimerIcon className={styles.icon} />
        <span>time</span>
      </Button>
      <Button
        onClick={() => clickHandler('words')}
        className={`${styles.btn} ${
          currentMode === 'words' && styles.highlighted
        }`}
      >
        <TitleIcon className={styles.icon} />
        <span>words</span>
      </Button>
    </div>
  );
}
