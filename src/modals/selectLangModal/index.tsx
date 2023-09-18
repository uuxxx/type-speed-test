import {useState, useDeferredValue} from 'react';
import {createPortal} from 'react-dom';
import {useAppSelector, useActions} from '@/redux/hooks';
import {Suggestions} from '@/components/suggestions';
import {selectIsSelectLangModalOpened} from '@/redux/selectors/modals/selectLangModals';
import styles from '@styles/selectLangModal.module.scss';

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
