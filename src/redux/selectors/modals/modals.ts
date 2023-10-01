import {RootState} from '@/redux';

export const selectModalsIsAnyModalOpened = (state: RootState) =>
  state.modals.isAnyModalOpened;
