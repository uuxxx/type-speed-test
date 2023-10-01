import {RootState} from '@/redux';

export const selectAvailableLangs = (state: RootState) =>
  state.modals.selectLangModal.availableLangs;
export const selectIsListOfLangsLoading = (state: RootState) =>
  state.modals.selectLangModal.isListLoading;
export const selectErrorLoadingListOfLangs = (state: RootState) =>
  state.modals.selectLangModal.errorWhileLoading;
export const selectIsSelectLangModalOpened = (state: RootState) =>
  state.modals.selectLangModal.isOpened;
