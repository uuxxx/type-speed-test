import {useEffect, memo} from 'react';
import {useAppSelector, useActions} from '@/redux/hooks';
import {Spinner} from '../spinner';
import styles from '@styles/suggestions.module.scss';

interface SuggestionsProps {
  searchQuery: string;
}

export const Suggestions = memo(({searchQuery}: SuggestionsProps) => {
  const availableLangs = useAppSelector(
      (state) => state.modals.selectLangModal.availableLangs,
  );

  const isLoadind = useAppSelector(
      (state) => state.modals.selectLangModal.isListLoading,
  );
  const error = useAppSelector(
      (state) => state.modals.selectLangModal.errorWhileLoading,
  );

  const {
    resetTypingProgress,
    fetchQuotes,
    closeSelectLangModal,
    fetchListOfQuotes,
  } = useActions();

  async function handleSelectLang(
      e: React.MouseEvent<HTMLDivElement, MouseEvent>,
  ) {
    const $el = e.target as Element;
    if ($el.getAttribute('data-type') === 'suggestedLang') {
      const lang = $el.getAttribute('data-value') as string;
      resetTypingProgress();
      fetchQuotes(lang);
      closeSelectLangModal();
    }
  }

  useEffect(() => {
    fetchListOfQuotes();
  }, []);

  if (isLoadind) {
    return <Spinner />;
  }

  if (error) {
    return <div className={styles.error}>{error}</div>;
  }

  return (
    <div className={styles.suggestions} onClick={handleSelectLang}>
      {availableLangs
          .filter((lang) =>
            lang.toLocaleLowerCase().includes(searchQuery.toLowerCase()),
          )
          .map((lang) => (
            <div
              key={lang}
              data-type="suggestedLang"
              data-value={lang}
              className={styles.suggestedLanguage}
            >
              {lang}
            </div>
          ))}
    </div>
  );
});
