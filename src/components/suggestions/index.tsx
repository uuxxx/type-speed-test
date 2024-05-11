import {useActions, useAppSelector} from '@/redux/hooks';
import {
  selectAvailableLangs,
  selectErrorLoadingListOfLangs,
  selectIsListOfLangsLoading,
} from '@/redux/selectors/modals/selectLangModals';
import styles from '@/styles/suggestions.module.scss';
import {memo, useEffect} from 'react';
import {Spinner} from '../spinner';

interface SuggestionsProps {
  searchQuery: string;
}

export const Suggestions = memo(({searchQuery}: SuggestionsProps) => {
  const availableLangs = useAppSelector(selectAvailableLangs);

  const isLoadind = useAppSelector(selectIsListOfLangsLoading);
  const error = useAppSelector(selectErrorLoadingListOfLangs);

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
