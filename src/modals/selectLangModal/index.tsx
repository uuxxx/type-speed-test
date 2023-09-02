import React from 'react';
import {createPortal} from 'react-dom';
import {useAppSelector} from '@/redux/hooks';
import {useActions} from '@/redux/hooks';
import styles from '@styles/selectLangModal.module.scss';

export function SelectLangModal() {
  const isSelectLangModalOpened = useAppSelector(
      (state) => state.modals.selectLangModal.isOpened,
  );

  const {closeSelectLangModal, fetchQuotes, reset} = useActions();

  async function handleSelectLang(
      e: React.MouseEvent<HTMLDivElement, MouseEvent>,
  ) {
    const $el = e.target as Element;
    if ($el.getAttribute('data-type') === 'suggestedLang') {
      const lang = $el.getAttribute('data-value') as AvailableLangs;
      reset();
      fetchQuotes(lang);
      closeSelectLangModal();
    }
  }

  if (isSelectLangModalOpened) {
    return createPortal(
        <>
          <div
            className={styles.overlay}
            onClick={() => closeSelectLangModal()}
          ></div>
          <div className={styles.modal}>
            <div className={styles.searchBar}>
              <span className={`${styles.searchIcon} material-symbols-outlined`}>
              search
              </span>
              <input
                className={styles.searchInput}
                type="text"
                placeholder="Type to search"
              />
            </div>
            <div className={styles.separator}></div>
            <div className={styles.suggestions} onClick={handleSelectLang}>
              <div
                data-type="suggestedLang"
                data-value="english"
                className={styles.suggestedLanguage}
              >
              english
              </div>
              <div
                data-type="suggestedLang"
                data-value="russian"
                className={styles.suggestedLanguage}
              >
              russian
              </div>
            </div>
          </div>
        </>,
      document.getElementById('popups')!,
    );
  }
  return <></>;
}
