import {Stat} from '@/components/stat';
import {useAppSelector, useActions} from '@/redux/hooks';
import {StatsCalculator} from './StatsCalculator';
import {Navigate, useNavigate} from 'react-router-dom';
import {Button} from '@/components/button';
import {
  selectTextAfkDetected,
  selectTextCorrectKeysPressed,
  selectTextIsTypingFinished,
  selectTextLanguage,
  selectTextMode,
  selectTextSecondsSinceStartedTyping,
  selectTextTotalKeysPressed,
  selectTextWords,
  selectTextWordsTyped,
} from '@/redux/selectors/text';
import styles from '@/styles/analytics.module.scss';

export function Analytics() {
  const isTypingFinished = useAppSelector(selectTextIsTypingFinished);
  const secSpentOnTyping = useAppSelector(selectTextSecondsSinceStartedTyping);
  const wordsTyped = useAppSelector(selectTextWordsTyped);
  const words = useAppSelector(selectTextWords);
  const correctKeysPressed = useAppSelector(selectTextCorrectKeysPressed);
  const language = useAppSelector(selectTextLanguage);
  const totalKeysPressed = useAppSelector(selectTextTotalKeysPressed);
  const afkDetected = useAppSelector(selectTextAfkDetected);
  const mode = useAppSelector(selectTextMode);

  const {resetTypingProgress} = useActions();
  const navigate = useNavigate();

  function backToMainPage() {
    resetTypingProgress();
    navigate('/');
  }

  const stats = new StatsCalculator(
      wordsTyped,
      secSpentOnTyping,
      correctKeysPressed,
      totalKeysPressed,
      words,
  );

  if (!isTypingFinished) {
    return <Navigate to={'/'} replace />;
  }

  return (
    <>
      <Button style={{margin: '20px'}} onClick={backToMainPage}>
        <span className={`${styles.icon} material-symbols-outlined`}>undo</span>
      </Button>
      <div className={styles.container}>
        <Stat statName="wpm" statValue={stats.wpm} />

        <Stat statName="acc" statValue={`${stats.acc}%`} />

        <Stat statName="test type" statValue={mode} />

        <Stat statName="language" statValue={language} />

        <Stat statName="other" statValue={afkDetected ? 'afk detected' : '-'} />

        <Stat
          statName="characters"
          statValue={`${stats.correctCharacters}/${stats.incorrectCharacters}/${stats.missedCharacters}/${stats.extraCharacters}`}
        />

        <Stat statName="time" statValue={`${secSpentOnTyping}s`} />
      </div>
    </>
  );
}
