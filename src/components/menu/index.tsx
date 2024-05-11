import {useActions, useAppSelector} from '@/redux/hooks';
import {selectTextLanguage, selectTextMode} from '@/redux/selectors/text';
import styles from '@/styles/menu.module.scss';
import {useEffect} from 'react';
import {Button} from '../button';
import {
  getLastSelectedModeFromLocalStorage,
  setSelectedModeToLocalStorage,
} from './utils';

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
        highlighted={currentMode === 'time'}
      >
        <span className="material-symbols-outlined">timer</span>
        <span>time</span>
      </Button>
      <Button
        onClick={() => clickHandler('words')}
        highlighted={currentMode === 'words'}
      >
        <span className="material-symbols-outlined">title</span>
        <span>words</span>
      </Button>
    </div>
  );
}
