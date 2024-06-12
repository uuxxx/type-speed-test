import {useActions, useAppSelector} from '@/redux/hooks';
import {selectTextLanguage} from '@/redux/selectors/text';
import styles from '@/styles/selectLangButton.module.scss';
import {Button} from '../button';
import LanguageIcon from '@/assets/icons/language.svg?react';

export function SelectLangButton() {
  const {openSelectLangModal} = useActions();
  const language = useAppSelector(selectTextLanguage);

  return (
    <Button className={styles.button} onClick={() => openSelectLangModal()}>
      <LanguageIcon className={styles.icon} />
      <span>{language || 'loading...'}</span>
    </Button>
  );
}
