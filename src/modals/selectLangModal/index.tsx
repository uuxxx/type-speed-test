import {Suggestions} from '@/components/suggestions';
import {useActions, useAppSelector} from '@/redux/hooks';
import {selectIsSelectLangModalOpened} from '@/redux/selectors/modals/selectLangModals';
import styles from '@/styles/selectLangModal.module.scss';
import SearhIcon from '@/assets/icons/search.svg?react';
import {useDeferredValue, useState} from 'react';
import {createPortal} from 'react-dom';

export function SelectLangModal() {
  const isSelectLangModalOpened = useAppSelector(selectIsSelectLangModalOpened);

  const {closeSelectLangModal} = useActions();

  const [searchQuery, setSearchQuery] = useState('');
  const defferedQuery = useDeferredValue(searchQuery);

  if (isSelectLangModalOpened) {
    return createPortal(
        <>
          <div
            className={styles.overlay}
            onClick={() => closeSelectLangModal()}
            data-testid="overlay"
          ></div>
          <div className={styles.modal} data-testid="select-lang-modal">
            <div className={styles.searchBar}>
              <SearhIcon className={styles.searchIcon} />
              <input
                className={styles.searchInput}
                type="text"
                placeholder="Type to search"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
            <div className={styles.separator}></div>
            <Suggestions searchQuery={defferedQuery} />
          </div>
        </>,
      document.getElementById('popups')!,
    );
  }
  return <></>;
}
