import {useActions, useAppSelector} from '@/redux/hooks';
import {selectTextLanguage} from '@/redux/selectors/text';
import styles from '@/styles/selectLangButton.module.scss';
import {Button} from '../button';

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
