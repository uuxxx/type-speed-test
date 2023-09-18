import {useAppSelector, useActions} from '@/redux/hooks';
import {Button} from '../button';
import {selectTextLanguage} from '@/redux/selectors/text';
import styles from '@styles/selectLangButton.module.scss';

export function SelectLangButton() {
  const {openSelectLangModal} = useActions();
  const language = useAppSelector(selectTextLanguage);

  return (
    <Button className={styles.button} onClick={() => openSelectLangModal()}>
      <span className={'material-symbols-outlined'}>language</span>
      <span>{language || 'loading...'}</span>
    </Button>
  );
}
