import {useAppSelector, useActions} from '@/redux/hooks';
import styles from '@styles/selectLangButton.module.scss';

export function SelectLangButton() {
  const {openSelectLangModal} = useActions();
  const language = useAppSelector((state) => state.text.infoAboutText.language);

  return (
    <div className={styles.button} onClick={() => openSelectLangModal()}>
      <span className={`${styles.langIcon} material-symbols-outlined`}>
        language
      </span>
      <span>{language || 'loading...'}</span>
    </div>
  );
}
